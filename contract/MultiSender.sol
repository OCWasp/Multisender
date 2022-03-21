pragma ton-solidity >= 0.57.0;

pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./interfaces/TIP31TokenRoot.sol";
import "./interfaces/TIP31TokenWallet.sol";

contract MultiSender {
    uint128 private maxBatchSize = 100;

    constructor() public {
        tvm.accept();
    }

    /*
        @notice receive batch transfer information from the web frontend
        @param _receivers wallet address array
        @param _amounts token amount array
        @param _sender sender address
        @param _tokenRootAddr tip3.1 token root address
    */
    function transfer(address[] _receivers, uint128[] _amounts, address _sender, address _tokenRootAddress) external {
        require(_receivers.length > 0 && _receivers.length <= maxBatchSize, 101, "receivers array length error!");
        require(_receivers.length == _amounts.length, 102, "receivers array length must equal to amounts array length!");

        // load TokenRoot contract
        TIP31TokenRoot tokenRoot = TIP31TokenRoot(_tokenRootAddress);

        // synchronous get bridge TokenWallet address
        address bridgeWalletAddress = tokenRoot.deployWallet(address(this), 0.5 ever).await;
        startBatchTransfer(bridgeWalletAddress, _receivers, _amounts, _sender);
    }


    /*
        @notice start batch transfer
    */
    function startBatchTransfer(address bridgeWalletAddress, address[] _receivers, uint128[] _amounts, address _sender) public {
        // load bridge TokenWallet
        TIP31TokenWallet bridgeWallet = TIP31TokenWallet(bridgeWalletAddress);
        // do transfer
        for (uint128 i = 0; i < _receivers.length; i++) {
            address receiver = _receivers[i];
            uint128 amount = _amounts[i];
            bridgeWallet.transfer(amount, receiver, 0.5 ever, _sender, false, tvm.getData());
        }
    }

    /*
        @notice change MAX_BATCH_SIZE
    */
    function changeMaxSupport(uint128 _maxBatchSize) external onlyOwner {
        require(_maxBatchSize <= 500, 100, "max support must less than 500!");
        maxBatchSize = _maxBatchSize;
    }

    /*
        @notice calculate how much ever needs to be transferred to the current contract
    */
    function calculateEver(uint128 _batchSize) external returns(uint128) {
        return 0.5 ever * _batchSize;
    }

    modifier onlyOwner {
        require(tvm.pubkey() != 0 && tvm.pubkey() == msg.pubkey(), 104, "only the owner can operate!");
        tvm.accept();
        _;
    }
}