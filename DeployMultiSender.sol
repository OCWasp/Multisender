pragma ton-solidity >= 0.57.0;

pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./MultiSender.sol";

contract DeployMultiSender {
    uint private counter;

    constructor() public {
        tvm.accept();
    }

    function deploy(address senderAddr, address tokenRootAddr, TvmCell multiSenderCode) external returns(address) {
        address multiSender = new MultiSender {
            value: 0.1 ever,
            pubkey: 0,
            code: multiSenderCode,
            varInit: {
                id: counter++,
                creator: address(this)
            }
        }(senderAddr, tokenRootAddr);
        return multiSender;
    }
}