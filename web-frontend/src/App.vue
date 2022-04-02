<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  methods: {
    ...mapMutations(['loadLocalData'])
  },
  created () {
    this.loadLocalData()
  },
  computed: {
    ...mapState('user', ['address'])
  }
}
</script>
