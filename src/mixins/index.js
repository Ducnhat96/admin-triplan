import store from '@/store'

export const loaddingHelper = {
  data () {
    return {
      changedData: false,
      watching: false
    }
  },
  methods: {
    toggleLoadding (loading = true) {
      store.dispatch('toggleLoadding', loading)
    },
    clickToCopy (selector = 'click-copy') {
      this.$nextTick(() => {
        document.addEventListener('click', e => {
          if (e.target.classList.contains(selector)) {
            e.preventDefault()
            this.$copyText(e.target.textContent).then(event => {
              e.target.classList.add('click-copied')
              setTimeout(() => {
                e.target.classList.remove('click-copied')
              }, 3000)
            })
          }
        })
      })
    }
  },
  watch: {
    changedData (value) {
      if (value) {
        window.onbeforeunload = (e) => {
          return false
        }
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.changedData) {
      this.$confirm('Dữ liệu bạn đã nhập chưa được lưu. Bạn chắc chắn muốn thoát trang?', 'Cảnh báo', {
        confirmButtonText: 'Thoát',
        cancelButtonText: 'Không',
        type: 'warning'
      }).then(() => {
        next()
      }).catch(() => {
        this.watching = true
      })
    } else {
      next()
    }
  }
}
