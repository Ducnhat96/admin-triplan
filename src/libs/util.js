let util = {}

util.getRouterObjByName = function (routers, name) {
  if (!name || !routers || !routers.length) {
    return null
  }
  let routerObj = null
  for (let item of routers) {
    if (item.name === name) {
      return item
    }
    routerObj = util.getRouterObjByName(item.children, name)
    if (routerObj) {
      return routerObj
    }
  }
  return null
}

util.handleTitle = function (vm, item) {
  if (typeof item.title === 'object') {
    return vm.$t(item.title.i18n)
  } else {
    return item.title
  }
}

util.setCurrentPath = function (vm, name) {
  let title = ''
  let isOtherRouter = false
  vm.$store.state.app.routers.forEach(item => {
    if (item.children.length === 1) {
      if (item.children[0].name === name) {
        title = util.handleTitle(vm, item)
        if (item.name === 'otherRouter') {
          isOtherRouter = true
        }
      }
    } else {
      item.children.forEach(child => {
        if (child.name === name) {
          title = util.handleTitle(vm, child)
          if (item.name === 'otherRouter') {
            isOtherRouter = true
          }
        }
      })
    }
  })
  let currentPathArr = []
  if (name === 'home_index') {
    currentPathArr = [
      {
        title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
        path: '',
        name: 'home_index'
      }
    ]
  } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
    currentPathArr = [
      {
        title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
        path: '/home',
        name: 'home_index'
      },
      {
        title: title,
        path: '',
        name: name,
        disabled: true
      }
    ]
  } else {
    let currentPathObj = vm.$store.state.app.routers.filter(item => {
      if (item.children.length <= 1) {
        return item.children[0].name === name
      } else {
        let i = 0
        let childArr = item.children
        let len = childArr.length
        while (i < len) {
          if (childArr[i].name === name) {
            return true
          }
          i++
        }
        return false
      }
    })[0]
    if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
      currentPathArr = [
        {
          title: 'Trang chủ',
          path: '',
          name: 'home_index'
        }
      ]
    } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
      currentPathArr = [
        {
          title: 'Trang chủ',
          path: '/home',
          name: 'home_index'
        },
        {
          title: currentPathObj.title,
          path: '',
          name: name,
          disabled: true
        }
      ]
    } else {
      let childObj = currentPathObj.children.filter((child) => {
        return child.name === name
      })[0]
      currentPathArr = [
        {
          title: 'Trang chủ',
          path: '/home',
          name: 'home_index'
        },
        {
          title: currentPathObj.title,
          path: currentPathObj.path + '/' + 'index',
          name: currentPathObj.name
        },
        {
          title: childObj.title,
          path: currentPathObj.path + '/' + childObj.path,
          name: name,
          disabled: true
        }
      ]
    }
  }
  vm.$store.dispatch('setCurrentPath', currentPathArr)
  return currentPathArr
}

util.openNewPage = function (vm, name, argu, query) {
  let pageOpenedList = vm.$store.state.app.pageOpenedList
  let openedPageLen = pageOpenedList.length
  let i = 0
  let tagHasOpened = false
  while (i < openedPageLen) {
    if (name === pageOpenedList[i].name) {
      vm.$store.dispatch('pageOpenedList', {
        index: i,
        argu: argu,
        query: query
      })
      tagHasOpened = true
      break
    }
    i++
  }
  if (!tagHasOpened) {
    console.log(vm.$store.state.app.tagsList)
    let tag = vm.$store.state.app.tagsList.filter((item) => {
      if (item.children) {
        return name === item.children[0].name
      } else {
        return name === item.name
      }
    })
    console.log(tag)
    tag = tag[0]
    if (tag) {
      tag = tag.children ? tag.children[0] : tag
      if (argu) {
        tag.argu = argu
      }
      if (query) {
        tag.query = query
      }
      vm.$store.dispatch('increateTag', tag)
    }
  }
  vm.$store.dispatch('setCurrentPageName', name)
}

util.oneOf = function (ele, targetArr) {
  if (targetArr.indexOf(ele) >= 0) {
    return true
  } else {
    return false
  }
}

export default util
