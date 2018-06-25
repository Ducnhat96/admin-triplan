<template>
  <v-breadcrumbs divider="/">
    <v-breadcrumbs-item
      v-for="item in currentPath"
      :key="item.name"
      :disabled="item.path ? false : true"
      :to="item.path"
    >
      <span class="white--text" :class="item.disabled ? 'item-disabled' : ''">{{ itemTitle(item) }}</span>
    </v-breadcrumbs-item>
  </v-breadcrumbs>
</template>

<script>
export default {

  name: 'BreadcrumbNav',
  props: {
    currentPath: Array
  },
  data () {
    return {

    }
  },
  methods: {
    itemTitle (item) {
      if (typeof item.title === 'object') {
        return this.$t(item.title.i18n)
      } else {
        return item.title
      }
    }
  }
}
</script>

<style lang="css" scoped>
.item-disabled {
  opacity: 0.7
}
</style>
