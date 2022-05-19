pragma ton-solidity >= 0.57.0;

pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./MultiSender.sol";

contract DeployMultiSender {
    uint private counter;

    constructor() public {
        require(tvm.pubkey() != 0 && tvm.pubkey() == msg.pubkey(), 1001);
        tvm.accept();
    }

    function deploy(address senderAddr, address tokenRootAddr, TvmCell multiSenderCode) external returns(address) {
        tvm.accept();
        address multiSender = new MultiSender {
            value: 1 ever,
            pubkey: 0,
            code: multiSenderCode,
            varInit: {
                _senderAddr: senderAddr,
                _tokenRootAddr: tokenRootAddr,
                _creator: address(this)
            }
        }();
        return multiSender;
    }

    function deploy2(address senderAddr, address tokenRootAddr, TvmCell multiSenderCode) external returns(address) {
        tvm.accept();

        TvmCell initData = tvm.buildStateInit({
            code: multiSenderCode,
            contr: MultiSender,
            varInit: {
                _senderAddr: senderAddr,
                _tokenRootAddr: tokenRootAddr,
                _creator: address(this)
            },
            pubkey: 0
        });

        address multiSender = new MultiSender {
            stateInit: initData,
            value: 1 ever,
            flag: 1
        }();
        return multiSender;
    }

    function withdrawGas(address gasTo) external pure onlyOwner {
        tvm.accept();
        gasTo.transfer({value: 0, flag: 128});
    }

    modifier onlyOwner {
        require(tvm.pubkey() != 0 && tvm.pubkey() == msg.pubkey(), 1001, "Only the owner can operate!");
        tvm.accept();
        _;
    }
}