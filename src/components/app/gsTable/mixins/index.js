import { mapGetters } from 'vuex'
import { forEach } from 'lodash'
import ls from 'local-storage'
export default {
  computed: {
    ...mapGetters('gsTable', ['dataTables', 'dataPaginations'])
  },
  methods: {
    reloadGsTable (name) {
      if (typeof this.$refs[name] !== 'undefined') {
        this.$refs[name].$emit('reload-table')
      }
    },
    reloadGsTableAfterRedirect (route, tableName) {
      route.query = route.query ? route.query : {}
      route.query['reload-gs-table'] = tableName
      this.$router.push(route)
    },
    listenReloadGsTable () {
      if (this.$route.query['reload-gs-table']) {
        this.$nextTick(() => {
          this.reloadGsTable(this.$route.query['reload-gs-table'])
          let query = {}
          forEach(this.$route.query, (value, key) => {
            if (key !== 'reload-gs-table') {
              query[key] = value
            }
          })
          this.$router.push({name: this.$route.name, query: query})
        })
      }
    },
    getSorted (name) {
      if (ls.get('sorteds') && ls.get('sorteds')[name]) {
        return ls.get('sorteds')[name]
      }
      return {}
    }
  }
}
