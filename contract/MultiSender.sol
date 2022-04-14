pragma ton-solidity >= 0.57.0;

pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./interfaces/TIP31TokenRoot.sol";
import "./interfaces/TIP31TokenWallet.sol";
import "./interfaces/IAcceptTokensTransferCallback.sol";


contract MultiSender is IAcceptTokensTransferCallback {
    uint128 constant private MAX_TRANSFER_NUMBER = 100000;
    uint128 private transferNumber = 255;
    uint128 private transferGas = 0.8 ever;
    uint128 private transactionFee = 0.015 ever;

    address private walletAddress;

    address private _senderAddr;
    address private _tokenRootAddr;

    mapping(address => uint128) private deposits;

    constructor(address senderAddr, address tokenRootAddr) public {
        require(tvm.pubkey() != 0 && tvm.pubkey() == msg.pubkey(), 1001);
        require(senderAddr.value != 0, 1001);
        require(tokenRootAddr.value != 0, 1001);
        tvm.accept();

        _senderAddr = senderAddr;
        _tokenRootAddr = tokenRootAddr;
    }

    function multiTransfer(address[] recipients, uint128[] amounts, address remainingGasTo) external onlyOwner {
        require(msg.sender == _senderAddr, 1001, "Sender address error!");
        require(walletAddress.value != 0, 1001, "Wallet address error!");
        require(recipients.length > 0 && recipients.length <= transferNumber, 1002, "The number of recipients error!");
        require(recipients.length == amounts.length, 1003, "The number of recipients must equal to the number of amounts!");
        tvm.accept();

        address sender = msg.sender;
        uint128 msgValue = uint128(msg.value);
        require(msgValue >= amounts.length * (transferGas + transactionFee), 1008, "not sufficient gas!");

        uint128 expectTotalAmount;
        for (uint128 i = 0; i < amounts.length; i ++) {
            expectTotalAmount += amounts[i];
        }
        require(deposits[sender] >= expectTotalAmount, 1007, "not sufficient funds!");

        startTransfer(recipients, amounts, remainingGasTo, sender);
    }

    function startTransfer(address[] recipients, uint128[] amounts, address remainingGasTo, address sender) private {
        TIP31TokenWallet bridgeWallet = TIP31TokenWallet(walletAddress);
        TvmCell _empty;
        for (uint128 i = 0; i < recipients.length; i++) {
            address recipient = recipients[i];
            uint128 amount = amounts[i];
            require(deposits[sender] >= amount, 1007, "not sufficient funds!");
            bridgeWallet.transfer{value: transferGas, flag: 0}(amount, recipient, 0.5 ever, remainingGasTo, false, _empty);
            deposits[sender] = deposits[sender] - amount;
        }
    }

    function expectTotalAmount(address[] recipients, uint128[] amounts) external returns (uint128) {
        require(recipients.length > 0 && recipients.length <= transferNumber, 1002, "The number of recipients error!");
        require(recipients.length == amounts.length, 1003, "The number of recipients must equal to the number of amounts!");
        uint128 totalAmount;
        for (uint128 i = 0; i < amounts.length; i ++) {
            totalAmount += amounts[i];
        }
        return totalAmount;
    }

    function onAcceptTokensTransfer(
        address tokenRoot,
        uint128 amount,
        address sender,
        address senderWallet,
        address remainingGasTo,
        TvmCell payload
    ) external override {
        require(sender == _senderAddr, 1001, "Sender address error!");
        require(tokenRoot == _tokenRootAddr, 1001, "Token root address error!");

        walletAddress = msg.sender;

        if (deposits.exists(sender)) {
            deposits[sender] = deposits[sender] + amount;
        } else {
            deposits[sender] = amount;
        }
    }

    function getDepositBySender(address sender) external view returns (uint128) {
        if (!deposits.exists(sender)) {
            return 0;
        } else {
            return deposits[sender];
        }
    }

    /*
        @notice set the number of batch transfers supported
    */
    function setTransferNumber(uint128 number) external onlyOwner {
        require(number <= MAX_TRANSFER_NUMBER, 1005, format("The number of support batch transfer must less than {}!", MAX_TRANSFER_NUMBER));
        transferNumber = number;
    }

    function getTransferNumber() external view onlyOwner returns (uint128) {
        return transferNumber;
    }

    function getDeposits() external view returns (mapping(address => uint128)) {
        return deposits;
    }

    /*
        @notice set gas required for each real transfer
    */
    function setTransferGas(uint128 value) external onlyOwner {
        transferGas = value;
    }

    function getTransferGas() external view onlyOwner returns (uint128) {
        return transferGas;
    }

    function totalTransferGas(uint128 number) external view returns (uint128) {
        return (transferGas + transactionFee) * number;
    }

    /*
        @notice withdraw remaining gas in current contract to dest address
    */
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