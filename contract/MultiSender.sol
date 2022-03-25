pragma ton-solidity >= 0.57.0;

pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./interfaces/TIP31TokenRoot.sol";
import "./interfaces/TIP31TokenWallet.sol";

contract MultiSender {
    uint128 constant private MAX_TRANSFER_NUMBER = 100000;
    uint128 private transferNumber = 100;
    uint128 private payGas = 0.3 ever;
    uint128 private transferGas = 0.29 ever;

    constructor() public {
        require(tvm.pubkey() != 0 && tvm.pubkey() == msg.pubkey(), 1001);
        tvm.accept();
    }

    /*
        @notice receive batch transfer information from the web frontend
        @param recipients tip3.1 token wallet address array
        @param amounts token amount array
        @param remainingGasTo  receive the remaining gas balance after transfer
        @param walletAddress bridge tip3.1 token wallet address
    */
    function multiTransfer(address[] recipients, uint128[] amounts, address remainingGasTo, address walletAddress) external {
        require(recipients.length > 0 && recipients.length <= transferNumber, 1002, "The number of recipients error!");
        require(recipients.length == amounts.length, 1003, "The number of recipients must equal to the number of amounts!");
        tvm.accept();

        startTransfer(recipients, amounts, remainingGasTo, walletAddress);
    }

    /*
        @notice start transfer
    */
    function startTransfer(address[] recipients, uint128[] amounts, address remainingGasTo, address walletAddress) private {
        // load bridge TokenWallet
        TIP31TokenWallet bridgeWallet = TIP31TokenWallet(walletAddress);
        for (uint128 i = 0; i < recipients.length; i++) {
            address recipient = recipients[i];
            uint128 amount = amounts[i];
            bridgeWallet.transferToWallet{value: 0.3 ever, flag: 0}(amount, recipient, remainingGasTo, false, tvm.getData());
        }
    }

    function multiTransfer2(address[] recipients, uint128[] amounts, address remainingGasTo, address walletAddress) external {
        require(recipients.length > 0 && recipients.length <= transferNumber, 1002, "The number of recipients error!");
        require(recipients.length == amounts.length, 1003, "The number of recipients must equal to the number of amounts!");
        tvm.accept();

        startTransfer2(recipients, amounts, remainingGasTo, walletAddress);
    }

    function startTransfer2(address[] recipients, uint128[] amounts, address remainingGasTo, address walletAddress) private {
        TIP31TokenWallet bridgeWallet = TIP31TokenWallet(walletAddress);
        for (uint128 i = 0; i < recipients.length; i++) {
            address recipient = recipients[i];
            uint128 amount = amounts[i];
            bridgeWallet.transfer(amount, recipient, 0.5 ever, remainingGasTo, false, tvm.getData());
        }
    }

    function multiTransfer3(address[] recipients, uint128[] amounts, address remainingGasTo, address walletAddress) external {
        require(recipients.length > 0 && recipients.length <= transferNumber, 1002, "The number of recipients error!");
        require(recipients.length == amounts.length, 1003, "The number of recipients must equal to the number of amounts!");
        tvm.accept();

        startTransfer3(recipients, amounts, remainingGasTo, walletAddress);
    }

    function startTransfer3(address[] recipients, uint128[] amounts, address remainingGasTo, address walletAddress) private {
        TIP31TokenWallet bridgeWallet = TIP31TokenWallet(walletAddress);
        for (uint128 i = 0; i < recipients.length; i++) {
            address recipient = recipients[i];
            uint128 amount = amounts[i];
            bridgeWallet.transfer{value: 0.8 ever, flag: 0}(amount, recipient, 0.5 ever, remainingGasTo, false, tvm.getData());
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

    /*
        @notice set gas to be paid to the current contract for each transfer
    */
    function setPayGas(uint128 value) external onlyOwner {
        require(value > payGas, 1007, "The new payGas must greater than old payGas!");
        payGas = value;
    }

    function getPayGas() external view onlyOwner returns (uint128) {
        return payGas;
    }

    /*
        @notice set gas required for each real transfer
    */
    function setTransferGas(uint128 value) external onlyOwner {
        require(value < payGas, 1006, "The transferGas must less than payGas!");
        transferGas = value;
    }

    function getTransferGas() external view onlyOwner returns (uint128) {
        return transferGas;
    }

    /*
        @notice calculate how much ever needs to be transferred to the current contract
    */
    function totalPayGas(uint128 number) external view returns (uint128) {
        return payGas * number;
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