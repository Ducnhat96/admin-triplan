import { appRouter, otherRouter } from '@/router/router'
import Util from '@/libs/util'

const app = {
  state: {
    currentPath: [
      {
        title: 'Trang chủ',
        path: '',
        name: 'home_index'
      }
    ],
    routers: [],
    menuList: [],
    pageOpenedList: [{
      title: 'Trang chủ',
      path: '',
      name: 'home_index'
    }],
    cachePage: [],
    tagsList: [],
    currentPageName: '',
    dontCache: ['merchant_new']
  },
  mutations: {
    SET_ROUTERS_APP (state, routers) {
      state.routers = routers
    },
    SET_CURRENT_PATH (state, pathArr) {
      state.currentPath = pathArr
    },
    UPDATE_MENU_LIST (state) {
      let menuList = []
      appRouter.forEach((item, index) => {
        if (item.children.length === 1) {
          menuList.push(item)
        } else {
          if (item.submenu) {
            let len = menuList.push(item)
            let childrenArr = []
            childrenArr = item.children
            if (childrenArr === undefined || childrenArr.length === 0) {
              menuList.splice(len - 1, 1)
            } else {
              let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]))
              handledItem.children = childrenArr
              menuList.splice(len - 1, 1, handledItem)
            }
          } else {
            menuList.push(item.children[0])
          }
        }
      })
      state.menuList = menuList
    },
    PAGE_OPENED_LIST (state, get) {
      let openedPage = state.pageOpenedList[get.index]
      if (get.argu) {
        openedPage.argu = get.argu
      }
      if (get.query) {
        openedPage.query = get.query
      }
      state.pageOpenedList.splice(get.index, 1, openedPage)
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },
    INCREATE_TAG (state, tagObj) {
      if (!Util.oneOf(tagObj.name, state.dontCache)) {
        state.cachePage.push(tagObj.name)
        localStorage.cachePage = JSON.stringify(state.cachePage)
      }
      state.pageOpenedList.push(tagObj)
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },
    SET_TAGS_LIST (state, tagsList) {
      state.tagsList = tagsList
    },
    SET_CURRENT_PAGE_NAME (state, name) {
      state.currentPageName = name
    },
    SET_OPENED_LIST (state) {
      state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]]
    },
    REMOVE_TAG (state, name) {
      state.pageOpenedList.map((item, index) => {
        if (item.name === name) {
          state.pageOpenedList.splice(index, 1)
        }
      })
    },
    CLOSE_PAGE (state, name) {
      state.cachePage.forEach((item, index) => {
        if (item === name) {
          state.cachePage.splice(index, 1)
        }
      })
    },
    CLEAR_ALL_TAGS (state) {
      state.pageOpenedList.splice(1)
      state.cachePage.length = 0
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },
    CLEAR_OTHER_TAGS (state, vm) {
      let currentName = vm.$route.name
      let currentIndex = 0
      state.pageOpenedList.forEach((item, index) => {
        if (item.name === currentName) {
          currentIndex = index
        }
      })
      if (currentIndex === 0) {
        state.pageOpenedList.splice(1)
      } else {
        state.pageOpenedList.splice(currentIndex + 1)
        state.pageOpenedList.splice(1, currentIndex - 1)
      }
      let newCachepage = state.cachePage.filter(item => {
        return item === currentName
      })
      state.cachePage = newCachepage
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    }
  },
  actions: {
    setRoutersApp ({commit}, routers) {
      commit('SET_ROUTERS_APP', routers)
    },
    setCurrentPath ({commit}, pathArr) {
      commit('SET_CURRENT_PATH', pathArr)
    },
    updateMenuList ({commit}) {
      commit('UPDATE_MENU_LIST')
    },
    pageOpenedList ({commit}, get) {
      commit('PAGE_OPENED_LIST', get)
    },
    setTagsList ({commit}, tagsList) {
      commit('SET_TAGS_LIST', tagsList)
    },
    increateTag ({commit}, tag) {
      commit('INCREATE_TAG', tag)
    },
    setCurrentPageName ({commit}, name) {
      commit('SET_CURRENT_PAGE_NAME', name)
    },
    setOpenedList ({commit}) {
      commit('SET_OPENED_LIST')
    },
    removeTag ({commit}, name) {
      commit('REMOVE_TAG', name)
    },
    closePage ({commit}, name) {
      commit('CLOSE_PAGE', name)
    },
    clearAllTags ({commit}) {
      commit('CLEAR_ALL_TAGS')
    },
    clearOtherTags ({commit}, vm) {
      commit('CLEAR_OTHER_TAGS', vm)
    }
  }
}

export default app
