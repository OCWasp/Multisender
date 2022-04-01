import ton, { hasTonProvider } from 'ton-inpage-provider'
import { TonClient } from '@tonclient/core'
import { libWeb, libWebSetup } from '@tonclient/lib-web'
const { Account } = require('@tonclient/appkit')
libWebSetup({ binaryURL: 'tonclient.wasm' })
TonClient.useBinaryLibrary(libWeb)
const contractAddress = '0:6256399ee46e7bbfac7ec445299ead641ac1fbca8ac5199881c842f4e42e82eb'
import { Address, ProviderRpcClient } from 'everscale-inpage-provider'
const ever = new ProviderRpcClient()

const client = new TonClient({
  network: { endpoints: ['https://main.ton.dev'] }
})
const rootAbi = {
  'ABI version': 2,
  version: '2.2',
  header: ['pubkey', 'time', 'expire'],
  functions: [
    {
      name: 'walletOf',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: 'walletOwner', type: 'address' }
      ],
      outputs: [
        { name: 'value0', type: 'address' }
      ]
    },
    {
      name: 'symbol',
      inputs: [
        { name: 'answerId', type: 'uint32' }
      ],
      outputs: [
        { name: 'value0', type: 'string' }
      ]
    },
    {
      name: 'decimals',
      inputs: [
        { name: 'answerId', type: 'uint32' }
      ],
      outputs: [
        { name: 'value0', type: 'uint8' }
      ]
    }
  ]
}
const walletAbi = {
  'ABI version': 2,
  version: '2.2',
  header: ['pubkey', 'time', 'expire'],
  functions: [
    {
      name: 'balance',
      inputs: [
        { name: 'answerId', type: 'uint32' }
      ],
      outputs: [
        { name: 'value0', type: 'uint128' }
      ]
    },
    {
      name: 'transferToWallet',
      inputs: [
        { name: 'amount', type: 'uint128' },
        { name: 'recipientTokenWallet', type: 'address' },
        { name: 'remainingGasTo', type: 'address' },
        { name: 'notify', type: 'bool' },
        { name: 'payload', type: 'cell' }
      ],
      outputs: [
      ]
    },
    {
      name: 'transfer',
      inputs: [
        { name: 'amount', type: 'uint128' },
        { name: 'recipient', type: 'address' },
        { name: 'deployWalletValue', type: 'uint128' },
        { name: 'remainingGasTo', type: 'address' },
        { name: 'notify', type: 'bool' },
        { name: 'payload', type: 'cell' }
      ],
      outputs: [
      ]
    },
    {
      name: 'multiTransfer',
      inputs: [
        { name: 'recipients', type: 'address[]' },
        { name: 'amounts', type: 'uint128[]' },
        { name: 'remainingGasTo', type: 'address' },
        { name: 'walletAddress', type: 'address' },
        { name: 'tokenRoot', type: 'address' }
      ],
      outputs: [
      ]
    },
    {
      name: 'expectTotalAmount',
      inputs: [
        { name: 'recipients', type: 'address[]' },
        { name: 'amounts', type: 'uint128[]' }
      ],
      outputs: [
        { name: 'value0', type: 'uint128' }
      ]
    },
    {
      name: 'totalTransferGas',
      inputs: [
        { name: 'number', type: 'uint128' }
      ],
      outputs: [
        { name: 'value0', type: 'uint128' }
      ]
    },
    {
      name: 'getDepositBySender',
      inputs: [
        { name: 'sender', type: 'address' },
        { name: 'tokenRoot', type: 'address' }
      ],
      outputs: [
        { name: 'value0', type: 'uint128' }
      ]
    },
    {
      name: 'getDeposits',
      inputs: [
      ],
      outputs: [
        { name: 'value0', type: 'map(address,map(address,uint128))' }
      ]
    }
  ],
  data: [],
  events: []
}
export default {
  async isInstalled () {
    if (!(await hasTonProvider())) {
      return false
    }
    return true
  },
  async login () {
    try {
      if (!(await hasTonProvider())) {
        throw new Error('Extension is not installed')
      }
      await ton.ensureInitialized()
      const { accountInteraction } = await ton.rawApi.requestPermissions({
        permissions: ['tonClient', 'accountInteraction']
      })
      if (accountInteraction == null) {
        console.log('Insufficient permissions')
        throw new Error('Insufficient permissions')
      } else {
        console.log('accountInteraction:', accountInteraction)
      }
      const selectedAddress = accountInteraction.address
      return selectedAddress
    } catch (e) {
    }
  },
  async logout () {
    if (!(await hasTonProvider())) {
      throw new Error('Extension is not installed')
    }
    await ton.ensureInitialized()
    const { accountInteraction } = await ton.rawApi.disconnect({
      permissions: ['tonClient', 'accountInteraction']
    })
    console.log('logout accountInteraction', accountInteraction)
    return accountInteraction
  },
  async getBalance (address) {
    const acc = new Account('', { address: address, client })
    const balance = await acc.getBalance()
    if (balance) {
      return parseInt(balance) / Math.pow(10, 9)
    }
    return 0
  },
  async getWalletBalance (rootAddress, userAddress, decimals) {
    try {
      const rootAcc = new Account('', { address: rootAddress, client })
      rootAcc.abi = { type: 'Contract', value: rootAbi }
      const response = await rootAcc.runLocal('walletOf', { answerId: 1, walletOwner: userAddress })
      const walletAddress = response.decoded.output.value0
      console.log('walletAddress:', response.decoded.output.value0)
      const walletAcc = new Account('', { address: walletAddress, client })
      walletAcc.abi = { type: 'Contract', value: walletAbi }
      const response2 = await walletAcc.runLocal('balance', { answerId: 1 })
      const tp3Balance = response2.decoded.output.value0 / Math.pow(10, decimals)
      console.log('tp3Balance:', tp3Balance)
      return tp3Balance
    } catch (e) {
      console.log('getWalletBalance', e)
      return 0
    }
  },
  async transferToContract (rootAddress, userAddress, amount, decimals) {
    try {
      // 检查安装插件
      if (!(await ever.hasProvider())) {
        throw new Error('Extension is not installed')
      }
      // 等待插件可调用
      await ever.ensureInitialized()
      // 获取登录walletAddress
      const rootAcc = new Account('', { address: rootAddress, client })
      rootAcc.abi = { type: 'Contract', value: rootAbi }
      const response = await rootAcc.runLocal('walletOf', { answerId: 1, walletOwner: userAddress })
      const userWalletAddress = response.decoded.output.value0
      console.log('userWalletAddress:', userWalletAddress)
      // 转账到合约
      const walletAddress = new Address(userWalletAddress)
      const walletContract = new ever.Contract(walletAbi, walletAddress)
      const transaction = await walletContract
        .methods
        .transfer({
          amount: '0x0' + (amount * Math.pow(10, decimals)).toString(16),
          recipient: contractAddress,
          deployWalletValue: 0.5 * Math.pow(10, 9),
          remainingGasTo: userAddress,
          notify: true,
          payload: ''
        }).send({
          from: userAddress,
          amount: JSON.stringify(0.8 * Math.pow(10, 9)),
          bounce: true
        })
      console.log('transferToContract', transaction)
      if (transaction.exitCode === 0) {
        return true
      }
      return false
    } catch (e) {
      console.log('transferToContract:', e)
      return false
    }
  },
  async batchTransfer (rootAddress, userAddress, inputDatas, decimals, gas) {
    console.log('gas:', gas)
    try {
      // 检查安装插件
      if (!(await ever.hasProvider())) {
        throw new Error('Extension is not installed')
      }
      // 等待插件可调用
      await ever.ensureInitialized()
      // 获取合约walletAddress
      const rootAcc = new Account('', { address: rootAddress, client })
      rootAcc.abi = { type: 'Contract', value: rootAbi }
      const response = await rootAcc.runLocal('walletOf', { answerId: 1, walletOwner: contractAddress })
      const contractWalletAddress = response.decoded.output.value0
      console.log('batchTransfer--contractWalletAddress:', contractWalletAddress)
      // 获取转发walletAddress 和 token数量
      const recipientlist = []
      const amountList = []
      for (let i = 0; i < inputDatas.length; i++) {
        recipientlist.push(inputDatas[i].address)
        amountList.push('0x0' + (inputDatas[i].amount * Math.pow(10, decimals)).toString(16))
      }
      console.log('recipientlist:', recipientlist)
      console.log('amountList:', amountList)
      // 转账
      const walletAddress = new Address(contractAddress)
      console.log('walletAddress:', walletAddress)
      const walletContract = new ever.Contract(walletAbi, walletAddress)
      console.log('walletContract:', walletContract)
      const transaction = await walletContract
        .methods
        .multiTransfer({
          recipients: recipientlist,
          amounts: amountList,
          remainingGasTo: userAddress,
          walletAddress: contractWalletAddress,
          tokenRoot: rootAddress
        }).send({
          from: userAddress,
          amount: JSON.stringify(parseInt(gas)),
          bounce: true
        })
      console.log('batchTransfer:', transaction)
      if (transaction.exitCode === 0) {
        return true
      }
      return false
    } catch (e) {
      console.log('batchTransfer:', e)
      return false
    }
  },
  async getTokenInfo (rootAddress) {
    try {
      // 检查安装插件
      if (!(await ever.hasProvider())) {
        throw new Error('Extension is not installed')
      }
      // 等待插件可调用
      await ever.ensureInitialized()
      // 获取 Token 名称
      const rootAcc = new Account('', { address: rootAddress, client })
      rootAcc.abi = { type: 'Contract', value: rootAbi }
      let response = await rootAcc.runLocal('symbol', { answerId: 1 })
      const symbol = response.decoded.output.value0
      console.log('symbol:', symbol)
      response = await rootAcc.runLocal('decimals', { answerId: 1 })
      const decimals = response.decoded.output.value0
      console.log('decimals:', decimals)
      return { label: symbol, decimals: decimals, address: rootAddress }
    } catch (e) {
      console.log('gwtTokenInfo:', e)
      return null
    }
  },
  async getTotalAmount (inputDatas, decimals) {
    try {
      const rootAcc = new Account('', { address: contractAddress, client })
      rootAcc.abi = { type: 'Contract', value: walletAbi }
      // 获取转发walletAddress 和 token数量
      const recipientlist = []
      const amountList = []
      for (let i = 0; i < inputDatas.length; i++) {
        recipientlist.push(inputDatas[i].address)
        amountList.push('0x0' + (inputDatas[i].amount * Math.pow(10, decimals)).toString(16))
      }
      const response = await rootAcc.runLocal('expectTotalAmount', { recipients: recipientlist, amounts: amountList })
      const totalAmount = response.decoded.output.value0
      console.log('getTotalAmount ： totalAmount:', totalAmount)
      return totalAmount
    } catch (e) {
      console.log('getTotalAmount:', e)
      return 0
    }
  },
  async totalTransferGas (number) {
    try {
      const rootAcc = new Account('', { address: contractAddress, client })
      rootAcc.abi = { type: 'Contract', value: walletAbi }
      const response = await rootAcc.runLocal('totalTransferGas', { number: number })
      const totalTransferGas = response.decoded.output.value0
      console.log('totalTransferGas ： totalTransferGas:', totalTransferGas)
      return totalTransferGas
    } catch (e) {
      console.log('totalTransferGas:', e)
      return 0
    }
  },
  async getDepositBySender (sender, tokenRoot, decimals) {
    console.log('getDepositBySender sender:', sender)
    console.log('getDepositBySender tokenRoot:', tokenRoot)
    try {
      const rootAcc = new Account('', { address: contractAddress, client })
      rootAcc.abi = { type: 'Contract', value: walletAbi }
      const response = await rootAcc.runLocal('getDepositBySender', { sender: sender, tokenRoot: tokenRoot })
      const deposit = response.decoded.output.value0
      console.log('getDepositBySender ： deposit:', deposit)
      return deposit / Math.pow(10, decimals)
    } catch (e) {
      console.log('getDepositBySender:', e)
      return 0
    }
  },
  async getDepositBySender1 (sender, tokenRoot) {
    return 1000
  },
  async getDeposits () {
    console.log('getDeposits')
    try {
      const rootAcc = new Account('', { address: contractAddress, client })
      rootAcc.abi = { type: 'Contract', value: walletAbi }
      const response = await rootAcc.runLocal('getDeposits', { })
      const deposit = response.decoded.output.value0
      console.log('getDeposits ： deposit:', deposit)
      return deposit
    } catch (e) {
      console.log('getDeposits:', e)
      return 0
    }
  }
}
