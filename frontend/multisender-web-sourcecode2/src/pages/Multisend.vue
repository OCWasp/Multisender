<template>
  <q-page class="q-mb-xl">
    <div class="full-width text-center section-title q-mt-xl">
        Welcome to TIP-3.1 Token MultiSender
    </div>
    <div class="row justify-center q-mt-lg" style="min-width:450px;">
      <q-stepper
        v-model="step"
        ref="stepper"
        animated
        active-color="secondary"
        done-color="secondary"
        class="multisendCard col-12 col-md-8 col-sm-10"
      >
        <!-- 步骤 1 -->
        <q-step :name="1" title="Prepare" prefix="1" :done="step > 1">
          <div class="row justify-center">
            <div class="col-11 row inTitle q-my-sm" style="display: flex;align-items:center">
              Token
              <q-space/>
              <span v-if="selToken && isLogin" style="display: flex;align-items:center">
                balance:
                <span class="q-ml-sm" v-if="!loading.deploy">{{ withdrawalBalance }} {{ selToken.label }}</span>
                <q-skeleton v-if="loading.deploy" class="text-h5 q-ml-sm" width="50px" type="text" />
                <q-btn v-if="!loading.deploy && withdrawalBalance > 0" class="but-bg1 fontStyle1 text-capitalize q-ml-sm" dense label="withdraw" :disable="loading.withdraw" :loading="loading.withdraw" v-check-auth-on:click="() => withdraw()"/>
              </span>
            </div>
            <q-select :loading="loading.searchToken" color="secondary" v-model="selToken" dense outlined use-input @filter="filterFn"
              input-style="font-size: 16px;font-weight: 300;line-height: 20px;color: #fff;"
              :options="filterTokens" options-selected-class="actionOption" class="col-11"
              :placeholder="!selToken || selToken === '' ? 'Select your Token' : ''">
              <template v-slot:prepend>
                <q-icon size="sm" class="text-white" name="search" />
              </template>
              <template v-slot:selected-item="scope">
                <div v-if="scope.opt">
                  <q-avatar size="md" v-if="scope.opt.icon">
                    <img :src="scope.opt.icon">
                  </q-avatar>
                  <q-icon v-if="!scope.opt.icon" size="md" :name="`img:/avatar/${scope.opt.address.substr(scope.opt.address.length - 1, 1)}.svg`"/>
                  <span class="contentFont q-ml-sm">
                    {{ scope.opt.label }}
                  </span>
                  <span class="fontStyle3 q-ml-sm">
                    {{ scope.opt.address | addressFmt(15, 6)}}
                  </span>
                </div>
              </template>
              <template v-slot:option="scope">
                <q-item
                  class="optionFont"
                  v-bind="scope.itemProps"
                  v-on="scope.itemEvents">
                  <q-avatar size="md" v-if="scope.opt.icon">
                    <img :src="scope.opt.icon">
                  </q-avatar>
                  <q-icon v-if="!scope.opt.icon" size="md" :name="`img:/avatar/${scope.opt.address.substr(scope.opt.address.length - 1, 1)}.svg`"/>
                  <q-item-section class="q-ml-sm">
                    {{ scope.opt.label }}
                    <span class="fontStyle3">
                      {{ scope.opt.address | addressFmt(15, 6) }}
                    </span>
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:no-option>
                <q-item class="optionFont">
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <div class="col-11 inTitle q-my-sm row">
              Addresses with Amounts
              <q-space/>
              <span @click="showUpLoadFile = !showUpLoadFile" class="cursor-pointer">{{showUpLoadFile ? 'Insert manually' : 'Upload file' }}</span>
            </div>
            <div v-if="!showUpLoadFile" class="col-11">
              <q-input
                v-model="InputText"
                filled
                type="textarea"
                color="secondary"
                input-style="font-size: 14px;font-weight: 300;line-height: 20px;color: #fff;height:300px;"
                placeholder="The address and amount are separated by commas"
              />
            </div>
            <div v-if="!showUpLoadFile" class="col-11 inTitle q-my-sm row">
              <span class="fontStyle3 q-mr-md">Top 255</span>
              <span class="fontStyle3">The address and amount are separated by commas</span>
            </div>
            <div v-if="loading.withdraw" class="col-11 alertFont q-my-sm text-info">Please wait a while after clicking the withdraw button, Wait for the withdraw succceeded</div>
            <div  v-if="showUpLoadFile"  class="col-11 multisendCard" style="height:200px">
              <div  class="full-width row justify-center q-mt-xl" style="height:100px">
                <input class="input-file" type="file" @change="importData" style="display: none;" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                <q-icon class="pointer" size="xl" name="img:/icons/upload.png" @click="importFile"/>
                <div class="full-width contentFont text-center">Drop your files here or click to upload</div>
              </div>
            </div>
            <div @click="exportExample" v-if="showUpLoadFile" class="col-11 inTitle q-my-sm row">
              <q-space/>
              <span class="fontStyle3 q-mr-sm">Top 255</span>
              <span class="fontStyle3 cursor-pointer" style="text-decoration: underline">Download examples</span>
            </div>
          </div>
        </q-step>
        <!-- 步骤 2 -->
        <q-step :name="2" title="Confirm" prefix="2" :done="step > 2">
          <div class="row col justify-center">
            <div class="col-11 inTitle q-my-sm">List of recipients</div>
            <q-table :data="confirmData" :columns="columns" row-key="number" class="multisendCard contentFont col-11" binary-state-sort>
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="number" :props="props">
                    {{ props.row.number }}
                  </q-td>
                  <q-td key="address" :props="props">
                    {{ props.row.address }}
                  </q-td>
                  <q-td key="amount" :props="props">
                    {{ props.row.amount }}
                  </q-td>
                  <q-td key="operate" :props="props">
                    <q-btn flat class="fontStyle1 text-capitalize" label="Remove" @click="removeData(props.row.number)"></q-btn>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
            <div class="col-11 inTitle q-my-sm">Summary</div>
            <div v-if="!loading.summaryloading" class="multisendCard contentFont row col col-11 justify-center">
              <q-item class="col-12 col-sm-6 borderStyle1">
                <q-item-section>
                  <q-item-label>{{summaryData.ReqApproveAmount}} {{summaryData.selToken.label}}</q-item-label>
                  <q-item-label class="fontStyle3">Request approve amount</q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="col-12 col-sm-6 borderStyle1">
                <q-item-section>
                  <q-item-label>{{summaryData.currentAllowance}} {{summaryData.selToken.label}}</q-item-label>
                  <q-item-label class="fontStyle3">Your current allowance</q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="col-12 col-sm-6 borderStyle1">
                <q-item-section>
                  <q-item-label>{{summaryData.totalAds}}</q-item-label>
                  <q-item-label class="fontStyle3">Total number of addresses</q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="col-12 col-sm-6 borderStyle1">
                <q-item-section>
                  <q-item-label>{{summaryData.totalTokens}} {{summaryData.selToken.label}}</q-item-label>
                  <q-item-label class="fontStyle3">Total number of tokens to be sent</q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="col-12 col-sm-6 borderStyle1">
                <q-item-section>
                  <q-item-label>{{summaryData.totalTran}}</q-item-label>
                  <q-item-label class="fontStyle3">Total number of transactions needes</q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="col-12 col-sm-6 borderStyle1">
                <q-item-section>
                  <q-item-label>{{summaryData.Balance}} {{summaryData.selToken.label}}</q-item-label>
                  <q-item-label class="fontStyle3">Your token balance</q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="col-12 col-sm-6 borderStyle1">
                <q-item-section>
                  <q-item-label>{{summaryData.gas * Math.pow(10, -9) | decimalFmt(9)}} EVER</q-item-label>
                  <q-item-label class="fontStyle3">Approximate cost of operation</q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="col-12 col-sm-6 borderStyle1">
                <q-item-section>
                  <q-item-label>{{summaryData.everBalance| decimalFmt(9)}} EVER</q-item-label>
                  <q-item-label class="fontStyle3">Your EVER balance</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div v-if="loading.summaryloading" class="multisendCard contentFont row col-11 justify-center">
              <q-item v-for="(i, index) in 6" :key="index" class="col-12 col-sm-6 borderStyle1">
                <q-item-section>
                  <q-item-label><q-skeleton  type="text" /></q-item-label>
                  <q-item-label class="fontStyle3"><q-skeleton type="text" /></q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div v-if="hasToContract" class="col-11 alertFont q-my-sm text-secondary">Request approve succceeded! Please click next</div>
            <div v-if="loading.toContractloading" class="col-11 alertFont q-my-sm text-info">Please wait a while after clicking the send button, Wait for the {{hasToContract ? 'transfer ' : 'Request approve '}} succceeded</div>
            <div v-if="!loading.summaryloading && step === 2 && summaryData.Balance < summaryData.ReqApproveAmount" class="col-11 alertFont q-my-sm text-warning">Insufficient {{summaryData.selToken.label}} balance,Please hava at least {{summaryData.ReqApproveAmount}} {{summaryData.selToken.label}}</div>
          </div>
        </q-step>
        <!-- 步骤 3 -->
        <q-step :name="3" title="Send" prefix="3" icon="add_comment">
          <div class="row col justify-center">
            <div class="col-11 sendTitle text-center" v-if="batchSuccess">total of {{summaryData.totalTran}} needs to be sent, {{summaryData.totalTran}} have been sent successfully</div>
            <div class="col-11 sendTitle text-center" v-if="!batchSuccess">Timeout for getting transfer result</div>
            <div class="col-11 q-pa-md">
              <q-input
                v-model="confirmText"
                filled
                type="textarea"
                readonly
                input-style="font-size: 14px;font-weight: 300;line-height: 20px;color: #fff;height:300px;max-height:300px"
              />
            </div>
          </div>
        </q-step>
        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn :disable="loading.toContractloading || loading.summaryloading" v-if="step > 1" flat  v-check-auth-on:click="() => previous()" icon="keyboard_arrow_left" class="but-bg1 fontStyle1 text-capitalize" />
            <q-btn v-if="step !== 3"
              :disable="loading.deploy || loading.toContractloading || loading.withdraw || loading.summaryloading || (step === 2 && summaryData.totalTokens === 0) || (step === 2 && summaryData.Balance < summaryData.ReqApproveAmount)"
              :loading="loading.deploy || loading.toContractloading"
              v-check-auth-on:click="() => !isDeploy ? deploy() : next()" :label="!isDeploy ? 'Deploy' : 'Next'"
              class="but-bg1 fontStyle1 text-capitalize q-ml-sm" />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </q-page>
</template>
<script>
import { exportFile } from 'quasar'
import { mapMutations, mapState, mapGetters } from 'vuex'
import EverWallet from '../util/EverWallet'
import BigNumber from 'bignumber.js'
const addressRegex = '^(0|-1):[0-9a-fA-F]{64}$'
const amountRegex = '^\\d+(\\.\\d+)?$'
const addressReg = new RegExp(addressRegex)
const amountReg = new RegExp(amountRegex)
export default ({
  name: 'PageIndex',
  data () {
    return {
      loading: {
        summaryloading: false,
        toContractloading: false,
        searchToken: false,
        withdraw: false,
        deploy: false
      },
      exampleCol: [
        { name: 'address', align: 'center', label: 'Address', field: 'address' },
        { name: 'amount', align: 'center', label: 'Amount', field: 'amount' }
      ],
      step: 1,
      sumTokens: [
        { label: 'WEVER', decimals: 9, address: '0:a49cd4e158a9a15555e624759e2e4e766d22600b7800d891e46f9291f044a93d', icon: 'https://raw.githubusercontent.com/broxus/ton-assets/master/icons/WEVER/logo.svg' },
        { label: 'DAI', decimals: 18, address: '0:eb2ccad2020d9af9cec137d3146dde067039965c13a27d97293c931dae22b2b9', icon: 'https://raw.githubusercontent.com/broxus/ton-assets/master/icons/DAIv3/logo.svg' },
        { label: 'USDT', decimals: 6, address: '0:a519f99bb5d6d51ef958ed24d337ad75a1c770885dcd42d51d6663f9fcdacfb2', icon: 'https://raw.githubusercontent.com/broxus/ton-assets/master/icons/USDTv3/logo.svg' },
        { label: 'USDC', decimals: 6, address: '0:c37b3fafca5bf7d3704b081fde7df54f298736ee059bf6d32fac25f5e6085bf6', icon: 'https://raw.githubusercontent.com/broxus/ton-assets/master/icons/USDCv3/logo.svg' },
        { label: 'WBTC', decimals: 8, address: '0:2ba32b75870d572e255809b7b423f30f36dd5dea075bd5f026863fceb81f2bcf', icon: 'https://raw.githubusercontent.com/broxus/ton-assets/master/icons/WBTCv3/logo.svg' },
        { label: 'WETH', decimals: 18, address: '0:59b6b64ac6798aacf385ae9910008a525a84fc6dcf9f942ae81f8e8485fe160d', icon: 'https://raw.githubusercontent.com/broxus/ton-assets/master/icons/WETHv3/logo.svg' },
        { label: 'BRIDGE', decimals: 9, address: '0:f2679d80b682974e065e03bf42bbee285ce7c587eb153b41d761ebfd954c45e1', icon: 'https://raw.githubusercontent.com/broxus/ton-assets/master/icons/BRIDGE/logo.svg' },
        { label: 'QUBE', decimals: 9, address: '0:9f20666ce123602fd7a995508aeaa0ece4f92133503c0dfbd609b3239f3901e2', icon: 'https://raw.githubusercontent.com/broxus/ton-assets/master/icons/QUBE/logo.svg' },
        { label: 'FRAX', decimals: 18, address: '0:efed9f9a7e6c455ee60829fd003b2f42edda513c6f19a484f916b055e9aa58d2', icon: 'https://raw.githubusercontent.com/broxus/ton-assets/master/icons/FRAX/logo.svg' },
        { label: 'FXS', decimals: 18, address: '0:c14e2f026feaae0f99b92c04ee421051a782fff60156ac8a586a12f63d7facef', icon: 'https://raw.githubusercontent.com/broxus/ton-assets/master/icons/FXS/logo.svg' },
        { label: 'DAF', decimals: 18, address: '0:f48054939064d686a9ad68d96d9ab79e409b095557c06ab7f073097dade7057f', icon: 'https://raw.githubusercontent.com/broxus/ton-assets/master/icons/DAF/logo.svg' },
        { label: 'EURS', decimals: 2, address: '0:00ca16398f314a9b3bed582dc69582515d866ededb6c4e18190f63b305cedf91', icon: 'https://raw.githubusercontent.com/broxus/ton-assets/master/icons/EURS/logo.svg' },
        { label: 'EUPi', decimals: 8, address: '0:0cfa60f9454b1b619938c4da6a138b1cc62da937b3f6c0506405daf2a88e0115', icon: 'https://raw.githubusercontent.com/broxus/ton-assets/master/icons/EUPi/logo.svg' },
        { label: 'EVS', decimals: 9, address: '0:e5d964bf76b90a29ca11ff03a0402eeca6a1c79a0fb4d8a2f06a67be0537a6bf', icon: 'https://raw.githubusercontent.com/broxus/ton-assets/master/icons/EVS/logo.svg' },
        { label: 'SOON', decimals: 18, address: '0:a15e6a7a91c331ddcd85675ca64d5a7db8c7e94b35806b2e05bf4bce29d21023', icon: 'https://raw.githubusercontent.com/broxus/ton-assets/master/icons/SOON/logo.svg' },
        { label: 'GRE', decimals: 5, address: '0:fde4c629d6447fecd86d2cffe363d5f334030351022bad019e0f472212e9dc99', icon: 'https://raw.githubusercontent.com/broxus/ton-assets/master/icons/GRE/logo.svg' },
        { label: 'BAPBAPA', decimals: 9, address: '0:9e0350c13cafe2bb55d906553fde5f357612e6dcb46c0c3440c7bfdda273ffdd', icon: 'https://raw.githubusercontent.com/broxus/ton-assets/master/icons/BAPBAPA/logo.svg' },
        { label: 'RUM', decimals: 9, address: '0:38a4c196c7fe22cbf0cda034ddda284aa208e2dba7707b96f65914420ba3f580', icon: 'https://raw.githubusercontent.com/broxus/ton-assets/master/icons/RUM/logo.svg' },
        { label: 'DUSA', decimals: 2, address: '0:b3ed4b9402881c7638566b410dda055344679b065dce19807497c62202ba9ce3', icon: 'https://raw.githubusercontent.com/broxus/ton-assets/master/icons/DUSA/logo.svg' },
        { label: 'COLA', decimals: 9, address: '0:9dd2cd82cbfd74a963be1ef1fd1a1f3e25f60e0b8c742f8b862df378b9a5e265', icon: 'https://raw.githubusercontent.com/broxus/ton-assets/master/icons/COLA/logo.svg' },
        { label: 'LEND', decimals: 9, address: '0:679a05316a324d0daa2724ab7d8e9768a2d1042863299323e969a174a8412a58', icon: 'https://raw.githubusercontent.com/broxus/ton-assets/master/icons/LEND/logo.svg' }
      ],
      filterTokens: [
      ],
      selToken: '',
      columns: [
        { name: 'number', align: 'center', label: '#', field: 'number', style: 'width: 10px' },
        { name: 'address', align: 'center', label: 'Address', field: 'address' },
        { name: 'amount', align: 'center', label: 'Amount', field: 'amount', sortable: true },
        { name: 'operate', align: 'center', label: '   ', field: 'number' }
      ],
      withdrawalBalance: 0,
      showUpLoadFile: false,
      InputText: '', // 输入数据
      confirmData: [], // 确认转账数据
      summaryData: {
        selToken: '',
        ReqApproveAmount: 0, // Request approve amount
        currentAllowance: 0, // Your current allowance
        totalAds: 0, // Total number of addresses
        totalTokens: 0, // Total number of tokens to be sent
        totalTran: 0, // Total number of transactions needes
        Balance: 0, // Your token balance
        gas: 0, // Approximate cost of operation
        everBalance: 0 // Your EVER balance
      }, // 统计数据
      hasToContract: false,
      confirmText: '',
      checkCount: 0,
      batchSuccess: false,
      isDeploy: true // 是否已部署合约
    }
  },
  computed: {
    ...mapState('user', { user: 'profile' }),
    ...mapGetters('user', { isLogin: 'hasLogin' })
  },
  methods: {
    ...mapMutations('user', ['renewBalance']),
    filterFn (val, update) {
      if (this.selToken) {
        val = this.selToken.label
      }
      if (val === '') {
        update(() => {
          this.filterTokens = this.sumTokens
        })
        return
      }
      update(async () => {
        this.loading.searchToken = true
        const needle = val.toLowerCase()
        const temp = this.sumTokens.filter(v => (v.label.toLowerCase().indexOf(needle) > -1 || v.address === needle))
        if (temp.length > 0) {
          this.filterTokens = temp
        } else {
          const tokenInfo = await EverWallet.getTokenInfo(needle)
          if (tokenInfo) {
            this.sumTokens.push(tokenInfo)
            this.filterTokens = [tokenInfo]
          } else {
            this.filterTokens = []
          }
        }
        this.loading.searchToken = false
      })
    },
    removeData (number) {
      this.confirmData = this.confirmData.filter(v => v.number !== number)
      this.renewSummaryData()
    },
    previous () {
      if (this.step === 2) {
        this.step = 1
        this.loading.toContractloading = false
        this.hasToContract = false
      } else if (this.step === 3) {
        this.step = 2
        this.loadSummaryData()
      }
    },
    next () {
      if (this.step === 1) {
        this.secondStep()
      } else if (this.step === 2) {
        this.transfer()
      }
    },
    // 转账
    async transfer () {
      this.loading.toContractloading = true
      if (!this.hasToContract) {
        const tempFlag = await EverWallet.transferToContract(this.selToken.address, this.user.address, this.summaryData.ReqApproveAmount, this.selToken.decimals)
        if (tempFlag) {
          this.hasToContract = tempFlag
          this.summaryData.currentAllowance = this.summaryData.totalTokens
          this.renewBalance(await EverWallet.getBalance(this.user.address))
        } else {
          console.log('try transferToContract ...')
        }
        this.loading.toContractloading = false
      } else {
        const tempFlag = await EverWallet.batchTransfer(this.user.address, this.confirmData, this.selToken.decimals, this.summaryData.gas)
        if (tempFlag) {
          this.renewBalance(await EverWallet.getBalance(this.user.address))
          const tempBalance = parseFloat(new BigNumber(this.summaryData.currentAllowance).minus(this.summaryData.totalTokens).toString())
          this.batchSuccess = false
          this.timer = setInterval(() => {
            this.checkBatchTransfer(tempBalance)
          }, 10000)
        } else {
          this.loading.toContractloading = false
          console.log('try batchTransfer ...')
        }
      }
    },
    // 转账检查
    checkBatchTransfer (tempBalance) {
      this.checkCount++
      EverWallet.getDeposit(this.selToken.decimals).then(contractBalance => {
        this.withdrawalBalance = contractBalance
        if (tempBalance === contractBalance) {
          clearInterval(this.timer)
          this.checkCount = 0
          this.jsonToText()
          this.batchSuccess = true
          this.step = 3
          this.hasToContract = false
          this.loading.toContractloading = false
        } else {
          if (this.checkCount === 12) {
            clearInterval(this.timer)
            this.checkCount = 0
            this.jsonToText()
            this.batchSuccess = false
            this.step = 3
            this.hasToContract = false
            this.loading.toContractloading = false
          }
        }
      })
    },
    async secondStep () {
      if (!this.textToJson()) {
        return
      }
      if (this.selToken === '' || !this.selToken) {
        this.$q.notify({
          message: 'Please select Token',
          color: 'dark'
        })
        return
      }
      this.step = 2
      this.loadSummaryData()
    },
    async loadSummaryData () {
      this.loading.summaryloading = true
      this.summaryData.selToken = this.selToken
      this.summaryData.Balance = await EverWallet.getWalletBalance(this.selToken.address, this.user.address, this.selToken.decimals)
      this.summaryData.everBalance = await EverWallet.getBalance(this.user.address)
      this.renewBalance(this.summaryData.everBalance)
      EverWallet.getDeposit(this.selToken.decimals).then(balance => {
        this.summaryData.currentAllowance = !balance ? 0 : balance
      })
      await this.renewSummaryData()
      this.loading.summaryloading = false
    },
    async renewSummaryData () {
      this.loading.summaryloading = true
      let tempReqApproveAmount = new BigNumber(0)
      const tempTotalAdsList = []
      for (let i = 0; i < this.confirmData.length; i++) {
        tempReqApproveAmount = tempReqApproveAmount.plus(new BigNumber(this.confirmData[i].amount))
        if (tempTotalAdsList.indexOf(this.confirmData[i].address) === -1) {
          tempTotalAdsList.push(this.confirmData[i].address)
        }
      }
      this.summaryData.totalAds = tempTotalAdsList.length
      this.summaryData.totalTran = this.confirmData.length
      this.summaryData.gas = await EverWallet.totalTransferGas(this.summaryData.totalTran)
      this.summaryData.totalTokens = this.confirmData.length === 0 ? 0 : await EverWallet.getTotalAmount(this.confirmData, this.selToken.decimals)
      if (this.summaryData.currentAllowance >= this.summaryData.totalTokens) {
        this.summaryData.ReqApproveAmount = 0
        this.hasToContract = this.summaryData.totalTokens > 0
      } else {
        this.summaryData.ReqApproveAmount = parseFloat(new BigNumber(this.summaryData.totalTokens).minus(this.summaryData.currentAllowance).toString())
      }
      this.loading.summaryloading = false
    },
    // 提现
    withdraw () {
      this.loading.withdraw = true
      const tempData = [{ number: 1, address: this.user.address, amount: this.withdrawalBalance }]
      EverWallet.totalTransferGas(1).then(gas => {
        EverWallet.batchTransfer(this.user.address, tempData, this.selToken.decimals, gas).then(flag => {
          if (flag) {
            EverWallet.getBalance(this.user.address).then(balance => {
              this.renewBalance(balance)
            })
            this.timer = setInterval(() => {
              this.checkWithdraw()
            }, 10000)
          } else {
            this.loading.withdraw = false
          }
        })
      })
    },
    // 提现检查
    checkWithdraw () {
      console.log('checkWithdraw ...')
      this.checkCount++
      const this_ = this
      EverWallet.getDeposit(this.selToken.decimals).then(contractBalance => {
        if (contractBalance === 0) {
          clearInterval(this.timer)
          this.checkCount = 0
          this.loading.withdraw = false
          this_.$q.notify({
            message: 'Withdrawal success',
            color: 'dark'
          })
          this.withdrawalBalance = 0
        } else {
          if (this.checkCount === 12) {
            clearInterval(this.timer)
            this.checkCount = 0
            this.loading.withdraw = false
            this_.$q.notify({
              message: 'Timeout for getting withdrawal result',
              color: 'dark'
            })
          }
        }
      })
    },
    deploy () {
      this.loading.deploy = true
      EverWallet.deploy(this.user.address, this.selToken.address).then(res => {
        if (res) {
          this.isDeploy = true
          EverWallet.getDeposit(this.selToken.decimals).then(balance => {
            this.withdrawalBalance = !balance ? 0 : balance
            this.loading.deploy = false
          })
          EverWallet.getBalance(this.user.address).then(balance => {
            this.renewBalance(balance)
          })
        } else {
          this.isDeploy = false
          this.withdrawalBalance = 0
          this.loading.deploy = false
          this.$q.notify({
            message: 'Contract deployment failed.',
            color: 'dark'
          })
        }
      })
    },
    checkDeploy () {
      this.loading.deploy = true
      EverWallet.isDeploy(this.user.address, this.selToken.address).then(res => {
        this.isDeploy = res
        if (this.isDeploy) {
          EverWallet.getDeposit(this.selToken.decimals).then(balance => {
            this.withdrawalBalance = !balance ? 0 : balance
            this.loading.deploy = false
          })
          EverWallet.getBalance(this.user.address).then(balance => {
            this.renewBalance(balance)
          })
        } else {
          this.withdrawalBalance = 0
          this.loading.deploy = false
        }
      })
    },
    exportExample () {
      const content = '"0:7d46a1ff2ccf9a140bf21d1baa4a857fc02564e1cdd0095b3cfa51bd624e9d9a","100"\r\n"0:6057102d77ebafed4e0b503b5ae6802c2151b40e58e4458924c724412905be2d","1"'
      const status = exportFile(
        'example.csv',
        content,
        'text/csv'
      )
      if (status !== true) {
        this.$q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        })
      }
    },
    importFile () {
      document.querySelector('.input-file').click()
    },
    importData (event) {
      if (!event.currentTarget.files.length) {
        return
      }
      const _this = this
      // 拿取文件对象
      const f = event.currentTarget.files[0]
      // 用FileReader来读取
      const reader = new FileReader()
      // 重写FileReader上的readAsBinaryString方法
      FileReader.prototype.readAsBinaryString = function (f) {
        let binary = ''
        const reader = new FileReader()
        reader.onload = function (e) {
          // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
          const bytes = new Uint8Array(reader.result)
          const length = bytes.byteLength
          for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i])
          }
          _this.parseImport(binary)
        }
        reader.readAsArrayBuffer(f)
      }
      reader.readAsBinaryString(f)
    },
    parseImport (binary) {
      let result = ''
      const importStr = JSON.stringify(binary.trim()).replaceAll('\\"', '').replaceAll('"', '')
      const importArr = importStr.split('\\r\\n')
      console.log('importArr.length:', importArr.length)
      if (importArr.length > 255) {
        this.$q.notify({
          message: 'More than 255 pieces of data',
          color: 'dark'
        })
        return
      }
      for (let i = 0; i < importArr.length; i++) {
        const rowStr = importArr[i]
        if (rowStr.trim() !== '') {
          if (i === importArr.length - 1) {
            result = result.concat(rowStr)
          } else {
            result = result.concat(rowStr, '\n')
          }
        }
      }
      this.InputText = result
      this.showUpLoadFile = !this.showUpLoadFile
    },
    textToJson () {
      const result = []
      if (this.InputText.trim() === '') {
        this.$q.notify({
          message: 'Please enter transfer data',
          color: 'dark'
        })
        return false
      }
      const importArr = this.InputText.trim().split('\n')
      let count = 0
      if (importArr.length > 0 && importArr.length <= 255) {
        for (let i = 0; i < importArr.length; i++) {
          const rowStr = importArr[i]
          const rowStrArr = rowStr.split(',')
          if (rowStrArr.length === 2) {
            count++
            if (rowStrArr[1].trim() === '') {
              this.$q.notify({
                message: 'Missing amount near : ' + rowStr,
                color: 'dark'
              })
              return false
            }
            if (!amountReg.test(rowStrArr[1].trim())) {
              this.$q.notify({
                message: 'Incorrect amount format near ' + rowStr,
                color: 'dark'
              })
              return false
            }
            if (rowStrArr[0].trim() === '') {
              this.$q.notify({
                message: 'Missing address near ：' + rowStr,
                color: 'dark'
              })
              return false
            }
            if (!addressReg.test(rowStrArr[0].trim())) {
              this.$q.notify({
                message: 'Incorrect address format near ' + rowStr,
                color: 'dark'
              })
              return false
            }
            result.push({ number: count, address: rowStrArr[0], amount: rowStrArr[1] })
          } else {
            this.$q.notify({
              message: 'There is an error near : ' + rowStr,
              color: 'dark'
            })
            return false
          }
        }
      } else {
        this.$q.notify({
          message: importArr.length === 0 ? 'Please enter transfer data' : 'More than 255 pieces of data',
          color: 'dark'
        })
        return false
      }
      this.confirmData = result
      return true
    },
    jsonToText () {
      let result = ''
      for (let i = 0; i < this.confirmData.length; i++) {
        const el = this.confirmData[i]
        result = result.concat(i + 1, ' - ', el.address, ',', el.amount, '\n')
      }
      this.confirmText = result
    }
  },
  watch: {
    selToken (n, o) {
      if (this.isLogin) {
        if (n === null) {
          this.withdrawalBalance = 0
        } else {
          this.checkDeploy()
        }
      }
    },
    isLogin () {
      if (this.isLogin) {
        if (!this.selToken) {
          this.withdrawalBalance = 0
        } else {
          this.checkDeploy()
        }
      }
    }
  }
})
</script>
<style scoped>
.multisendCard {
    background: rgba(255,255,255,.08);
}
.inTitle {
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(253, 249, 249);
}
.alertFont {
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  color: rgb(253, 249, 249);
}
.optionFont {
    background: linear-gradient(to right, rgba(247,97,42,0.16) , #050b2e),#050b2e;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #c5e4f3;
}
.actionOption {
    color: #54a9d3;
}
.optionFont2 {
    background: linear-gradient(to right, rgba(247,97,42,0.16) , #050b2e),#050b2e;
}
.sendTitle {
  font-size: 24px;
  font-weight: 300;
  line-height: 28px;
  color: #fff;
}
</style>
