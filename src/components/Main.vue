<template>
  <v-app id="inspire">
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
    >
      <MenuList :menuList="menuList"></MenuList>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="blue darken-3"
      dark
      app
      fixed
      dense
      >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Triplan</span>
      </v-toolbar-title>
      <!-- BreadcrumbNav -->
      <BreadcrumbNav :currentPath="currentPath"></BreadcrumbNav>
      <!-- End BreadcrumbNav -->
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <v-btn icon slot="activator">
          <v-icon>language</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile @click="changeLocale('vi')">
            <v-list-tile-title>
              Tiếng Việt
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="changeLocale('en')">
            <v-list-tile-title>
              Tiếng Anh
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-menu offset-y>
        <v-btn icon slot="activator">
          <v-avatar size="32px">
            <img
              :src="accountInfo.avatar_path"
              onerror="this.src='https://i.imgur.com/Zp8RQt8.jpg?txtsize=19&amp;txt=img&amp;w=150&amp;h=150'"
              :alt="accountInfo.name"
            >
          </v-avatar>
        </v-btn>
        <v-list>
          <v-list-tile @click="logout">
            <v-list-tile-title>
              <v-icon small>fa-sign-out</v-icon> Logout
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <!-- TagsPageOpened -->
      <TagsPageOpened :pageTagsList="pageTagsList"></TagsPageOpened>
      <!-- End TagsPageOpened -->
      <div class="scroll-container">
        <router-view></router-view>
      </div>
    </v-content>
  </v-app>
</template>

<script>
  import util from '@/libs/util'
  import { otherRouter, appRouter } from '@/router/router'
  import { mapGetters, mapActions } from 'vuex'

  // Import components
  import MenuList from '@/components/app/MenuList'
  import BreadcrumbNav from '@/components/app/BreadcrumbNav'
  import TagsPageOpened from '@/components/app/TagsPageOpened'

  // Locale
  import { Validator } from 'vee-validate'
  import ls from '@/libs/ls'

  export default {
    data: () => ({
      dialog: false,
      drawer: null,
      items: [
        { icon: 'contacts', title: 'Contacts', name: 'contact' },
        { icon: 'history', title: 'Frequently contacted', name: 'home_index' },
        { icon: 'content_copy', title: 'Merchant', name: 'merchant_index' }
      ]
    }),
    props: {
      source: String
    },
    computed: {
      menuList () {
        return this.$store.state.app.menuList
      },
      currentPath () {
        return this.$store.state.app.currentPath
      },
      pageTagsList () {
        return this.$store.state.app.pageOpenedList
      },
      ...mapGetters('account', ['accountInfo'])
    },
    components: {
      MenuList,
      BreadcrumbNav,
      TagsPageOpened
    },
    methods: {
      ...mapActions(['setRoutersApp', 'updateMenuList', 'setTagsList', 'setOpenedList']),
      ...mapActions('account', ['getPersonlInformation']),
      init () {
        // Lay ra danh sach route hien tai
        let pathArr = util.setCurrentPath(this, this.$route.name)
        this.updateMenuList()
        this.checkTag(this.$route.name)
        console.log(pathArr)
      },
      checkTag (name) {
        let openpageHasTag = this.pageTagsList.some(item => {
          if (item.name === name) {
            return true
          }
        })
        if (!openpageHasTag) {
          console.log(1234)
          // Giải quyết vấn đề khi bạn đóng tab hiện tại và sau đó nhấp vào nút quay lại, bạn sẽ thoát ra trang hiện tại không có nhãn
          util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {})
        }
      },
      changeLocale (locale) {
        this.$i18n.locale = locale
        Validator.localize(locale)
        console.log(locale)
        ls.set('lang', locale)
        util.setCurrentPath(this, this.$route.name)
      },
      logout () {
        this.$store.dispatch('logout')
        this.$router.push('/login')
      }
    },
    watch: {
      '$route' (to) {
        this.$store.dispatch('setCurrentPageName', to.name)
        let pathArr = util.setCurrentPath(this, to.name)
        this.checkTag(to.name)
        localStorage.currentPageName = to.name
        console.log(pathArr)
      }
    },
    mounted () {
      // Set router cho app
      this.setRoutersApp([otherRouter, ...appRouter])
      this.init()
      console.log(this.$store.state.app.currentPath)
      if (!Object.keys(this.accountInfo).length) {
        this.getPersonlInformation()
      }
    },
    created () {
      this.setOpenedList()
    }
  }
</script>
<style>
  .scroll-container {
    height: calc(100vh - 90px);
    overflow-y: scroll;
    backface-visibility: hidden;
    margin-top: 2px;
  }
</style>
