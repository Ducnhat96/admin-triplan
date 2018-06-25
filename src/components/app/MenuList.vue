<template>
  <v-list dense>
    <template v-for="item in menuList">
      <v-layout
        v-if="item.heading"
        :key="item.heading"
        row
        align-center
      >
        <v-flex xs6>
          <v-subheader v-if="item.heading">
            {{ item.heading }}
          </v-subheader>
        </v-flex>
        <v-flex xs6 class="text-xs-center">
          <a href="#!" class="body-2 black--text">EDIT</a>
        </v-flex>
      </v-layout>
      <v-list-group
        v-else-if="item.children"
        v-model="item.model"
        value="true"
        :key="item.title"
        :prepend-icon="item.icon ? item.icon : 'sentiment_satisfied_alt'"
        append-icon=""
      >
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>
              {{ itemTitle(item) }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-for="(child, i) in item.children"
          :key="i"
          @click="clickItem(item)"
        >
          <v-list-tile-action v-if="child.icon">
            <v-icon>{{ child.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ citemTitle(item) }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
      <v-list-tile v-else :key="item.name" @click="clickItem(item)">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ itemTitle(item) }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
export default {

  name: 'MenuList',
  props: {
    menuList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {

    }
  },
  methods: {
    clickItem (item) {
      this.$router.push({name: item.name})
    },
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
</style>
