<template>
  <div class="tags-con">
    <div ref="scrollCon" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll" class="tags-outer-scroll-con">
        <div class="close-all-tag-con">
          <v-menu offset-y>
            <v-btn depressed small slot="activator" color="primary" dark>Tùy chọn</v-btn>
            <v-list>
              <v-list-tile @click="closeAllTab">
                <v-list-tile-title>Đóng tất cả</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="closeOtherTab">
                <v-list-tile-title>Đóng các tab khác</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </div>
        <div ref="scrollBody" class="tags-inner-scroll-body" :style="{left: tagBodyLeft + 'px'}" @mousedown.prevent="startDrag" @mousemove.prevent="doDrag">
          <transition-group name="taglist-moving-animation">
            <div
              class="d-inline-block"
              v-for="(item, index) in pageTagsList"
              :key="item.name"
              ref="tagsPageOpened"
              >
              <v-chip
                :close="item.name==='home_index' ? false : true"
                @input="closePage(index, item.name)"
                label
                color="tag-item"
                @click.native="linkTo(item)"
                >
                <v-icon class="tag-dot-inner mr-2" :class="item.children?(item.children[0].name===currentPageName?'blue--text':''):(item.name===currentPageName?'blue--text':'')">lens</v-icon>
                <span class="tag-text">{{itemTitle(item)}}</span>
              </v-chip>
            </div>
          </transition-group>
        </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'TagsPageOpened',
  props: {
    pageTagsList: Array,
    beforePush: {
      type: Function,
      default: (item) => {
        return true
      }
    }
  },
  data () {
    return {
      tagBodyLeft: 0,
      dragging: false,
      scrollOld: 0,
      currentPageName: this.$route.name,
      refsTag: [],
      tagsCount: 1
    }
  },
  computed: {
    tagsList () {
      return this.$store.state.app.pageOpenedList
    }
  },
  methods: {
    handlescroll (e) {
      // cuộn chuột giữa
      let type = e.type
      let delta = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
      }
      let left = 0
      if (delta > 0) {
        left = Math.min(0, this.tagBodyLeft + delta)
      } else {
        if (this.$refs.scrollCon.offsetWidth - 100 < this.$refs.scrollBody.offsetWidth) {
          if (this.tagBodyLeft < -(this.$refs.scrollBody.offsetWidth - this.$refs.scrollCon.offsetWidth + 100)) {
            left = this.tagBodyLeft
          } else {
            left = Math.max(this.tagBodyLeft + delta, this.$refs.scrollCon.offsetWidth - this.$refs.scrollBody.offsetWidth - 100)
          }
        } else {
          this.tagBodyLeft = 0
        }
      }
      this.tagBodyLeft = left
    },
    scollLeft (e) {
      // Click cuộn về bên trái
      let delta = 120
      let left = Math.min(0, this.tagBodyLeft + delta)
      this.tagBodyLeft = left
    },
    scollRight (e) {
      // Click cuộn về bên phải
      let delta = -120
      let left = Math.max(this.tagBodyLeft + delta, this.$refs.scrollCon.offsetWidth - this.$refs.scrollBody.offsetWidth - 100)
      this.tagBodyLeft = left
    },
    startDrag () {
      this.dragging = true
    },
    stopDrag () {
      this.dragging = false
    },
    doDrag (e) {
      if (this.dragging) {
        let left = 0
        if (e.pageX < this.scrollOld) {
          let delta = 120
          left = Math.min(0, this.tagBodyLeft + delta)
        } else {
          let delta = -120
          left = Math.max(this.tagBodyLeft + delta, this.$refs.scrollCon.offsetWidth - this.$refs.scrollBody.offsetWidth - 100)
        }
        this.scrollOld = e.pageX
        setTimeout(() => {
          if (this.$refs.scrollBody.offsetWidth + 110 > this.$refs.scrollCon.offsetWidth) {
            this.tagBodyLeft = left
          }
        }, 100)
      }
    },
    itemTitle (item) {
      if (typeof item.title === 'object') {
        return this.$t(item.title.i18n)
      } else {
        return item.title
      }
    },
    moveToView (tag) {
      if (tag.offsetLeft < -this.tagBodyLeft) {
        this.tagBodyLeft = -tag.offsetLeft + 10
      } else if (tag.offsetLeft + 10 > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + this.$refs.scrollCon.offsetWidth - 100) {
        this.tagBodyLeft = Math.min(0, this.$refs.scrollCon.offsetWidth - 100 - tag.offsetWidth - tag.offsetLeft - 20)
      } else {
        this.tagBodyLeft = -(tag.offsetLeft - (this.$refs.scrollCon.offsetWidth - 100 - tag.offsetWidth) + 20)
      }
    },
    closePage (index, name) {
      let pageOpenedList = this.$store.state.app.pageOpenedList
      let lastPageObj = pageOpenedList[0]
      if (this.currentPageName === name) {
        let len = pageOpenedList.length
        for (let i = 1; i < len; i++) {
          if (pageOpenedList[i].name === name) {
            if (i < (len - 1)) {
              lastPageObj = pageOpenedList[i + 1]
            } else {
              lastPageObj = pageOpenedList[i - 1]
            }
            break
          }
        }
      } else {
        let tagWidth = this.$refs.tagsPageOpened[index].clientWidth
        this.tagBodyLeft = Math.min(this.tagBodyLeft + tagWidth, 0)
      }
      this.$store.dispatch('removeTag', name)
      this.$store.dispatch('closePage', name)
      pageOpenedList = this.$store.state.app.pageOpenedList
      localStorage.pageOpenedList = JSON.stringify(pageOpenedList)
      if (this.currentPageName === name) {
        this.linkTo(lastPageObj)
      }
    },
    linkTo (item) {
      let routerObj = {}
      routerObj.name = item.name
      if (item.argu) {
        routerObj.params = item.argu
      }
      if (item.query) {
        routerObj.query = item.query
      }
      if (this.beforePush(item)) {
        this.$router.push(routerObj)
      }
    },
    closeAllTab () {
      this.$store.dispatch('clearAllTags')
      this.$router.push({
        name: 'home_index'
      })
      this.tagBodyLeft = 0
    },
    closeOtherTab () {
      this.$store.dispatch('clearOtherTags', this)
      this.tagBodyLeft = 0
    }
  },
  mounted () {
    window.addEventListener('mouseup', this.stopDrag)
    this.refsTag = this.$refs.tagsPageOpened
    setTimeout(() => {
      this.refsTag.forEach((item, index) => {
        if (this.$route.name === item.name) {
          let tag = this.refsTag[index].$el
          this.moveToView(tag)
        }
      })
    }, 1)
    this.tagsCount = this.tagsList.length
  },
  watch: {
    '$route' (to) {
      this.currentPageName = to.name
      this.$nextTick(() => {
        this.refsTag.forEach((item, index) => {
          if (to.name === item.name) {
            let tag = this.refsTag[index].$el
            this.moveToView(tag)
          }
        })
      })
      this.tagsCount = this.tagsList.length
    }
  }
}
</script>

<style lang="css" scoped>
  .tags-con{
    height: 40px;
    z-index: -1;
    overflow: hidden;
    background: #f0f0f0;
    box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);
  }
  .tags-con .tags-outer-scroll-con{
    position: relative;
    box-sizing: border-box;
    padding-right: 120px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tags-con .tags-outer-scroll-con .tags-inner-scroll-body{
    position: absolute;
    padding: 2px 10px;
    overflow: visible;
    white-space: nowrap;
    transition: left .3s ease;
  }
  .tags-con .tags-outer-scroll-con .close-all-tag-con{
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    text-align: center;
    width: 110px;
    height: 100%;
    background: white;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
    z-index: 3;
  }
  .taglist-moving-animation-move{
    transition: transform .3s;
  }
  .tag-item {
    height: 32px;
    border: 1px solid #e9eaec!important;
    color: #495060!important;
    background: #fff!important;
    display: inline-block;
    margin: 2px 4px 2px 0;
    border-radius: 3px;
    background: #f7f7f7;
    font-size: 12px;
    vertical-align: middle;
    opacity: 1;
    overflow: hidden;
  }
  .tag-dot-inner {
    color: #e9eaec;
    font-size: 16px;
  }
  .tag-text {
    color: #495060;
  }
</style>
<style>
  .tag-item .chip__close>.icon {
    font-size: 16px;
  }
</style>
