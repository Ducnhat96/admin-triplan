<template>
  <div id="app" class="app-main">
    <vue-snotify></vue-snotify>
    <router-view></router-view>
    <vue-topprogress ref="topProgress" :height="3" color="#4bd612"></vue-topprogress>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['loading', 'show_notify', 'notify'])
  },
  mounted () {
  },
  watch: {
    loading (value) {
      // if (value) {
      //   this.$refs.topProgress.start()
      // } else {
      //   this.$refs.topProgress.done()
      // }
    },
    show_notify (value) {
      if (value) {
        this.$snotify[this.notify.type](this.notify.body, this.notify.title, {
          timeout: this.notify.timeout,
          showProgressBar: this.notify.showProgressBar,
          closeOnClick: this.notify.closeOnClick,
          pauseOnHover: this.notify.pauseOnHover
        })
        this.$store.dispatch('hideNotify')
      } else {
      }
    }
  }
}
</script>
<style>
html,body{
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
}
.app-main{
    width: 100%;
    height: 100%;
}
</style>
