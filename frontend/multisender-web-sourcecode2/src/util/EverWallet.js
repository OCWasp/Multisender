import BigNumber from 'bignumber.js'
import ton, { hasTonProvider } from 'ton-inpage-provider'
import { TonClient } from '@tonclient/core'
import { libWeb, libWebSetup } from '@tonclient/lib-web'
const { Account } = require('@tonclient/appkit')
libWebSetup({ binaryURL: 'tonclient.wasm' })
TonClient.useBinaryLibrary(libWeb)
const deployContractAds = '0:51b26d47df7313ef1af06ed79525eef9b03455eb7f6e632fde3d5a630d15332b'
const deployTVC = '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'
let contractAddress = null
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
        { name: 'amounts', type: 'uint128[]' }
      ],
      outputs: [
      ]
    },
    {
      name: 'expectTotalAmount',
      inputs: [
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
      name: 'getDeposit',
      inputs: [
      ],
      outputs: [
        { name: 'value0', type: 'uint128' }
      ]
    },
    {
      name: 'deploy',
      inputs: [
        { name: 'senderAddr', type: 'address' },
        { name: 'tokenRootAddr', type: 'address' },
        { name: 'multiSenderCode', type: 'cell' }
      ],
      outputs: [
        { name: 'value0', type: 'address' }
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
        throw new Error('Insufficient permissions')
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
      const walletAcc = new Account('', { address: walletAddress, client })
      walletAcc.abi = { type: 'Contract', value: walletAbi }
      const response2 = await walletAcc.runLocal('balance', { answerId: 1 })
      const tp3Balance = response2.decoded.output.value0 / Math.pow(10, decimals)
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
      // 转账到合约
      const walletAddress = new Address(userWalletAddress)
      const walletContract = new ever.Contract(walletAbi, walletAddress)
      const transaction = await walletContract
        .methods
        .transfer({
          amount: '0x0' + new BigNumber(amount).times(Math.pow(10, decimals)).toString(16),
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
      if (transaction.exitCode === 0) {
        return true
      }
      return false
    } catch (e) {
      console.log('transferToContract:', e)
      return false
    }
  },
  async batchTransfer (userAddress, inputDatas, decimals, gas) {
    try {
      // 检查安装插件
      if (!(await ever.hasProvider())) {
        throw new Error('Extension is not installed')
      }
      // 等待插件可调用
      await ever.ensureInitialized()
      // 获取转发walletAddress 和 token数量
      const recipientlist = []
      const amountList = []
      for (let i = 0; i < inputDatas.length; i++) {
        recipientlist.push(inputDatas[i].address)
        amountList.push('0x0' + new BigNumber(inputDatas[i].amount).times(Math.pow(10, decimals)).toString(16))
      }
      // 转账
      const walletAddress = new Address(contractAddress)
      const walletContract = new ever.Contract(walletAbi, walletAddress)
      const transaction = await walletContract
        .methods
        .multiTransfer({
          recipients: recipientlist,
          amounts: amountList
        }).send({
          from: userAddress,
          amount: JSON.stringify(parseInt(gas)),
          bounce: true
        })
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
      response = await rootAcc.runLocal('decimals', { answerId: 1 })
      const decimals = response.decoded.output.value0
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
      // 获取转发token数量
      const amountList = []
      for (let i = 0; i < inputDatas.length; i++) {
        amountList.push('0x0' + new BigNumber(inputDatas[i].amount).times(Math.pow(10, decimals)).toString(16))
      }
      const response = await rootAcc.runLocal('expectTotalAmount', { amounts: amountList })
      const totalAmount = response.decoded.output.value0
      return totalAmount / Math.pow(10, decimals)
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
      return totalTransferGas
    } catch (e) {
      console.log('totalTransferGas:', e)
      return 0
    }
  },
  async getDeposit (decimals) {
    try {
      const rootAcc = new Account('', { address: contractAddress, client })
      rootAcc.abi = { type: 'Contract', value: walletAbi }
      const response = await rootAcc.runLocal('getDeposit', { })
      const deposit = response.decoded.output.value0 / Math.pow(10, decimals)
      return deposit
    } catch (e) {
      console.log('getDeposit:', e)
      return 0
    }
  },
  async deploy1 (senderAddr, tokenRootAddr) {
    try {
      // 获取部署后的合约地址
      const rootAcc = new Account('', { address: deployContractAds, client })
      rootAcc.abi = { type: 'Contract', value: walletAbi }
      const response = await rootAcc.runLocal('deploy', { senderAddr: senderAddr, tokenRootAddr: tokenRootAddr, multiSenderCode: deployTVC })
      const resDeployAds = response.decoded.output.value0
      // 获取要部署的合约地址状态
      const result = (await client.net.query_collection({
        type: 'QueryCollection',
        collection: 'accounts',
        filter: {
          id: {
            eq: resDeployAds
          }
        },
        result: 'acc_type'
      })).result
      // 如果未激活要部署 否则不部署
      if (!result) { // 获取状态失败重新获取
        this.deploy(senderAddr, tokenRootAddr)
      } else {
        if (result.length === 0 || result[0].acc_type !== 1) {
          // 检查安装插件
          if (!(await ever.hasProvider())) {
            throw new Error('Extension is not installed')
          }
          // 等待插件可调用
          await ever.ensureInitialized()
          const deployContract = new ever.Contract(walletAbi, new Address(deployContractAds))
          const transaction = await deployContract
            .methods
            .deploy({
              senderAddr: senderAddr,
              tokenRootAddr: tokenRootAddr,
              multiSenderCode: deployTVC
            }).send({
              from: senderAddr,
              amount: JSON.stringify(1 * Math.pow(10, 9)),
              bounce: true
            })
          if (transaction.exitCode === 0) {
            contractAddress = resDeployAds
            return true
          }
          return false
        } else {
          contractAddress = resDeployAds
          return true
        }
      }
    } catch (e) {
      console.log('deploy:', e)
      return false
    }
  },
  async deploy (senderAddr, tokenRootAddr) {
    try {
      // 检查安装插件
      if (!(await ever.hasProvider())) {
        throw new Error('Extension is not installed')
      }
      // 等待插件可调用
      await ever.ensureInitialized()
      const deployContract = new ever.Contract(walletAbi, new Address(deployContractAds))
      const transaction = await deployContract
        .methods
        .deploy({
          senderAddr: senderAddr,
          tokenRootAddr: tokenRootAddr,
          multiSenderCode: deployTVC
        }).send({
          from: senderAddr,
          amount: JSON.stringify(1 * Math.pow(10, 9)),
          bounce: true
        })
      if (transaction.exitCode === 0) {
        return true
      }
      return false
    } catch (e) {
      console.log('deploy:', e)
      return false
    }
  },
  async isDeploy (senderAddr, tokenRootAddr) {
    try {
      // 获取部署后的合约地址
      const rootAcc = new Account('', { address: deployContractAds, client })
      rootAcc.abi = { type: 'Contract', value: walletAbi }
      const response = await rootAcc.runLocal('deploy', { senderAddr: senderAddr, tokenRootAddr: tokenRootAddr, multiSenderCode: deployTVC })
      const resDeployAds = response.decoded.output.value0
      contractAddress = resDeployAds
      // 获取要部署的合约地址状态
      const result = (await client.net.query_collection({
        type: 'QueryCollection',
        collection: 'accounts',
        filter: {
          id: {
            eq: resDeployAds
          }
        },
        result: 'acc_type'
      })).result
      if (result && result.length > 0 && result[0].acc_type === 1) {
        return true
      }
      return false
    } catch (e) {
      console.log('isDeploy:', e)
      return false
    }
  }
}
