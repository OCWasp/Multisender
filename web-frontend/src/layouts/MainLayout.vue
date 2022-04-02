<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container class="bodyColor" style="min-width:450px">
      <div class="full-width">
        <q-toolbar style="height:64px;">
          <img style="height:24px" src="favicon.svg"/>
          <span class="q-ml-sm" style="font-size: 24px;line-height: 30px;color: #C5E4F3;font-weight:500;">MultiSender</span>
          <q-space/>
          <q-btn v-if="!isLogin" class="btn-secondary text-capitalize" label="Connect to a wallet" @click="login()"/>
          <q-item v-if="isLogin" class="row">
            <q-item-section avatar>
              <q-avatar>
                <q-icon size="md" :name="`img:/avatar/${user.address.substr(user.address.length - 1, 1)}.svg`"/>
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="contentFont">{{ user.address | addressFmt()}}</q-item-label>
              <q-item-label class="fontStyle3">{{ user.balance | decimalFmt(9)}} EVER</q-item-label>
            </q-item-section>
          </q-item>
          <q-btn v-if="isLogin" dense round style="color: #c5e4f3;" icon="exit_to_app" @click="logout()"/>
        </q-toolbar>
      </div>
      <router-view />
      <div style="background-color:#050b2e;padding-top:60px;">
        <div class="row full-width justify-center" >
          <div class="row col col-11" style="max-width: 1280px;">
            <div class="row col col-xs-12 col-sm-12 col-md-3">
              <div class="q-mb-lg" style="display: flex;align-items: flex-start">
                <img style="height:24px" src="favicon.svg"/>
                <span class="q-ml-sm" style="font-size: 24px;line-height: 30px;color: #C5E4F3;font-weight:500;">MultiSender</span>
              </div>
              <q-space/>
              <div v-if="$q.screen.lt.md && !$q.screen.lt.sm" class="row q-mb-lg">
                <q-btn style="background-color: rgba(197,228,243,.16);min-width:221px" class="fontStyle1 text-capitalize q-mr-md" label="Install EVER Wallet"  @click="insWallet()"/>
                <q-btn outline style="min-width:221px" class="fontStyle1 text-capitalize" label="Source code on GitHub" @click="sourceCode()"/>
              </div>
              <div v-if="$q.screen.lt.sm" class="col-xs-12 q-mb-lg">
                <div><q-btn  style="background-color: rgba(197,228,243,.16);min-width:221px" class="fontStyle1 text-capitalize q-mb-lg" label="Install EVER Wallet"  @click="insWallet()"/></div>
                <div><q-btn outline style=";min-width:221px" class="fontStyle1 text-capitalize" label="Source code on GitHub" @click="sourceCode()"/></div>
              </div>
            </div>
            <div class="row col col-xs-12 col-sm-10 col-md-5">
              <div class="col-xs-12 col-sm-5">
                <div class="footerTitle" >Product</div>
                <ul class="menu2" style="padding-left:0px">
                  <li style="margin-bottom: 12px;" v-for="(item, index) in menu1List" :key="index"><a class="cursor-pointer menuHover" :style="`${menu1 === item.label ? 'color:#fff' : ''}`"  @click="menu1Click(item)">{{item.label}}</a></li>
                </ul>
              </div>
              <div class="col-xs-12 col-sm-7">
                <div class="footerTitle" >DeFi Products</div>
                <ul class="menu2" style="padding-left:0px">
                  <li style="margin-bottom: 12px;" v-for="(item, index) in menu2List" :key="index"><a :href="item.path" target="_blank">{{item.label}}</a></li>
                </ul>
              </div>
            </div>
            <div class="col-xs-12 col-sm-10 col-md-4" v-if="!$q.screen.lt.md">
              <div>
                <div class="full-width q-mb-lg"><q-btn  style="background-color: rgba(197,228,243,.16);min-width:221px" class="fontStyle1 text-capitalize" label="Install EVER Wallet" @click="insWallet()"/></div>
                <div class="full-width"><q-btn outline style=";min-width:221px" class="fontStyle1 text-capitalize" label="Source code on GitHub" @click="sourceCode()"/></div>
              </div>
            </div>
            <div class="col-12" style="height:1px;background-color:rgba(255,255,255,.56)"></div>
            <div class="col-12 row col" style="padding-bottom:20px;">
              <div v-if="$q.screen.lt.sm" class="col-xs-12 col-sm-5 row" style="height:40px;padding-top:20px">
                <a href="https://t.me/tonbridge_official"><q-icon style="padding:10px" size="20px" name="img:/icons/Telegram.svg"/></a>
                <a href="https://twitter.com/Broxus"><q-icon style="padding:10px" size="20px" name="img:/icons/Twitter.svg"/></a>
                <a href="https://github.com/broxus"><q-icon style="padding:10px" size="20px" name="img:/icons/GitHub.svg"/></a>
                <a href="https://broxus.medium.com/"><q-icon style="padding:10px" size="20px" name="img:/icons/Medium.svg"/></a>
              </div>
              <div class="col-xs-12 col-sm-7 row" style="padding-top:20px">
                <div style="padding:10px;color:#FFF">© <a class="fontStyle2" style="color:#FFF" href="https://broxus.com/">Broxus</a>, 2022</div>
                <div style="padding:10px"><a class="fontStyle2" style="text-decoration:none;" href="https://broxus.com/wp-content/uploads/2021/08/terms_of_use.pdf">Terms of use</a></div>
                <div style="padding:10px"><a class="fontStyle2" style="text-decoration:none;" href="https://broxus.com/wp-content/uploads/2021/08/privacy_policy.pdf">Privacy policy</a></div>
                <div style="padding:10px"><a class="fontStyle2" style="text-decoration:none;" href="https://broxus.com/wp-content/uploads/2021/08/cookie_policy.pdf">Cookies</a></div>
              </div>
              <div v-if="!$q.screen.lt.sm" class="col-xs-12 col-sm-5 row" style="height:40px;padding-top:20px">
                <q-space/>
                <a href="https://t.me/tonbridge_official"><q-icon style="padding:10px" size="20px" name="img:/icons/Telegram.svg"/></a>
                <a href="https://twitter.com/Broxus"><q-icon style="padding:10px" size="20px" name="img:/icons/Twitter.svg"/></a>
                <a href="https://github.com/broxus"><q-icon style="padding:10px" size="20px" name="img:/icons/GitHub.svg"/></a>
                <a href="https://broxus.medium.com/"><q-icon style="padding:10px" size="20px" name="img:/icons/Medium.svg"/></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>
<script>
import { mapMutations, mapGetters, mapState } from 'vuex'
import EverWallet from '../util/EverWallet'
export default {
  data () {
    return {
      menu1: 'MultiSender',
      menu1List: [
        // { label: 'MultiSender', path: '/multisend' }
      ],
      menu2: '',
      menu2List: [
        { label: 'Octus Bridge', path: 'https://octusbridge.io/' },
        { label: 'TON Scan', path: 'https://tonscan.io/' },
        { label: 'Wrapper EVER', path: 'https://wrappedever.io/' },
        { label: 'EVER Wallet', path: 'https://chrome.google.com/webstore/detail/ever-wallet/cgeeodpfagjceefieflmdfphplkenlfk' }
      ],
      right: false
    }
  },
  computed: {
    ...mapState('user', { user: 'profile' }),
    ...mapGetters('user', { isLogin: 'hasLogin' })
  },
  methods: {
    ...mapMutations('user', ['saveToken', 'renewBalance']),
    ...mapMutations('user', { userLogout: 'logout' }),
    menu1Click (item) {
      console.log('item', item)
      console.log('item.label', item.label)
      console.log('this.menu1', this.menu1)
      if (this.menu1 === item.label) {
        return
      }
      this.menu1 = item.label
      this.$router.push(item.path)
    },
    insWallet () {
      window.open('https://chrome.google.com/webstore/detail/ever-wallet/cgeeodpfagjceefieflmdfphplkenlfk', '_blank')
    },
    sourceCode () {
      window.open('https://github.com/broxus/ton-dex', '_blank')
    },
    login () {
      this.$openLogin().then(res => {})
    },
    logout () {
      EverWallet.logout().then(res => {
        if (!res) {
          this.userLogout()
        }
      })
    }
  }
}
</script>
<style scoped>
.menu1 {
    height:64px;
    list-style: none;
}
.menu1 li {
    float: left;
}
.menu1 li a {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    font-family: inherit;
    font-size: 16px;
    justify-content: center;
    min-height: 64px;
    padding: 0 16px;
    text-decoration: none;
    color: rgba(255,255,255,.48);
}
.menuHover:hover{
    color: #fff;
}
.active {
    color: #fff;
}
.menu2 {
    list-style: none;
}
.menu2 li a {
    color: rgba(255,255,255,.56);
    font-size: 14px;
    font-weight: 400;
    letter-spacing: .5px;
    line-height: 20px;
    text-decoration: none;
    transition-property: color;
}
.umenu2 li a:hover {
    color: #fff;
}
.footerTitle {
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: .75px;
    line-height: 20px;
    margin-bottom: 16px;
    text-decoration: none;
    color: #fff;
}
</style>
