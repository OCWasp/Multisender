<template>
  <q-dialog
    ref="dialog"
    persistent
  >
    <q-card :style="cardStyle" class="card-bg2">
      <q-toolbar>
        <q-toolbar-title class="popup-title q-pt-lg">Connect to a wallet</q-toolbar-title>
        <q-space/>
        <q-icon  class="pointer" color="white" size="sm" name="close" v-close-popup/>
      </q-toolbar>
      <div>
        <div class="row q-mx-md q-pa-md borderStyle1" style="align-items:center;">
          <div v-if="!isInstall" class="bg-grey q-mr-sm" style="height:30px;width:30px;border-radius: 30px;"></div>
          <q-spinner :showing="loading.login" class="q-mr-sm" color="white" size="2.5em"/>
          <div class="popup-main__name">{{isInstall ? 'EVER Wallet' : 'Initializing...'}}</div>
        </div>
      </div>
      <q-card-actions class="q-px-lg popup-txt" align="center">
        At the moment, only EVER Wallet supports FlatQube.
        If you haven’t installed the extension yet, you can do it at chrome.google.com
      </q-card-actions>
      <div v-if="!isInstall" class="q-mx-md q-mb-md">
        <q-btn style="background-color: rgba(197,228,243,.16);" class="full-width fontStyle1 text-capitalize" label="Install EVER Wallet" @click="insWallet()"/>
      </div>
    </q-card>
  </q-dialog>
</template>
<script>
import { mapMutations } from 'vuex'
import EverWallet from '../util/EverWallet'
export default {
  props: ['closeable'],
  data () {
    return {
      loading: {
        login: false
      },
      isInstall: false
    }
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.$refs.dialog.show()
    },
    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },
    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok', this.profile)
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },
    onCancelClick () {
      // we just need to hide dialog
      this.hide()
      this.onDialogHide()
    },
    ...mapMutations('user', ['saveToken', 'renewBalance']),
    async init () {
      this.isInstall = await EverWallet.isInstalled()
      if (this.isInstall) {
        this.loading.login = true
        EverWallet.login().then(addess => {
          if (addess) {
            EverWallet.getBalance(addess).then(balance => {
              this.saveToken(addess)
              this.renewBalance(balance)
              this.loading.login = false
              this.onOKClick()
            })
          }
        })
      }
    },
    insWallet () {
      window.open('https://chrome.google.com/webstore/detail/ever-wallet/cgeeodpfagjceefieflmdfphplkenlfk', '_blank')
    }
  },
  created () {
    this.init()
  },
  computed: {
    cardStyle () {
      return {
        width: this.$q.screen.lt.md ? '100vw' : '35vw'
      }
    }
  }
}
</script>
<style>
.popup-title {
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  margin-bottom: 20px;
  color: white;
}
.popup-txt {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  letter-spacing: 0.4px;
  line-height: 20px;
  margin: 20px 0px;
}
.popup-main__name {
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 0.5px;
    line-height: 24px;
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: white;
}
</style>
