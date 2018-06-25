<template>
  <v-container fluid>
    <v-layout column>
      <v-flex xs12 class="custom-filters">
        <v-layout row wrap>
          <v-flex xs3>
            <v-select
              class="pt-0"
              :items="merchants"
              v-model="filters.merchant_id"
              label="Nhà xe"
              single-line
              item-text="name"
              item-value="id"
              @change="filter"
            ></v-select>
          </v-flex>
        </v-layout>
      </v-flex>
      <gs-table
        :ref="nodeTable"
        :table-name="nodeTable"
        data-source="nodes"
        :data-params="filters"
        :data-sorted="sorted"
        :data-sorts="sorts"
        @remove-filter="removeFilter"
        :headers="headers"
        >

        <template slot-scope="{ item, index }">
          <tr>
            <td><small v-if="dataPaginations[nodeTable]">{{(index + 1) + ((dataPaginations[nodeTable].current_page -1) * dataPaginations[nodeTable].per_page)}}</small></td>
            <td>{{ item.id }}</td>
            <td>{{ item.start_time }}</td>
            <td>{{ item.start_time }}</td>
            <td>{{ item.start_time }}</td>
            <td>{{ item.start_time }}</td>
            <td>{{ item.start_time }}</td>
            <td class="justify-center layout px-0">
              <v-btn icon class="mx-0" @click="">
                <v-icon color="teal">edit</v-icon>
              </v-btn>
              <v-btn icon class="mx-0" @click="">
                <v-icon color="pink">delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </gs-table>
    </v-layout>
  </v-container>
</template>

<script>
import ls from 'local-storage'
import { forEach, keys, debounce } from 'lodash'
export default {

  name: 'Contact',

  data () {
    return {
      nodeTable: 'nodes',
      headers: [
        {
          text: '#',
          value: '#'
        },
        {
          text: 'Dessert (100g serving)',
          value: 'name'
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
        { text: 'Actions', value: 'action' }
      ],
      sorted: {
        created_at: -1,
        status: ''
      },
      sorts: [
        {key: 'created_at', name: 'Ngày tạo'},
        {key: 'status', name: 'Trạng thái'}
      ],
      filters: {
        include: 'merchant,wayroad,drivers,ticket_collectors,car_detail',
        sort: 'created_at:-1',
        merchant_id: '',
        wayroad_id: '',
        start_time: ''
      },
      merchants: [
        {
          id: 'g7vrqyjd',
          name: 'Hải Vân'
        }
      ]
    }
  },
  methods: {
    removeFilter () {
      if (this.checkDefaultFilter({
        q: null,
        include: 'merchant,wayroad,drivers,ticket_collectors,car_detail',
        sort: 'created_at:-1',
        merchant_id: '',
        wayroad_id: '',
        start_time: ''
      })) {
        this.filters = {
          include: 'merchant,wayroad,drivers,ticket_collectors,car_detail',
          sort: 'created_at:-1',
          merchant_id: '',
          wayroad_id: '',
          start_time: ''
        }
        this.$nextTick(() => {
          this.reloadGsTable(this.nodeTable)
        })
      }
    },
    filter: debounce(function () {
      let lsFilter = ls.get('filters', {})
      if (!lsFilter) {
        lsFilter = {}
      }
      lsFilter[this.nodeTable] = this.filters
      ls.set('filters', lsFilter)
      if (ls.get('doFilter')) {
        this.reloadGsTable(this.nodeTable)
      }
    }, 300),
    checkDefaultFilter (filters) {
      let diff = false
      let lkeys = keys(filters)
      forEach(lkeys, key => {
        if (filters[key] !== this.filters[key]) {
          diff = true
        }
      })
      return diff
    }
  },
  mounted () {
    if (ls.get('filters') && ls.get('filters')[this.nodeTable]) {
      this.filters = ls.get('filters')[this.nodeTable]
      setTimeout(() => {
        ls.set('doFilter', true)
      }, 100)
    }
    this.listenReloadGsTable()
    this.sorted = this.getSorted(this.nodeTable)
  },
  beforeRouteEnter (to, from, next) {
    if (from.fullPath === '/') {
      ls.remove('filters')
      ls.set('doFilter', true)
    } else {
      if (ls.get('filters') && ls.get('filters')['nodes']) {
        ls.set('doFilter', false)
      } else {
        ls.set('doFilter', true)
      }
    }
    next()
  }
}
</script>

<style lang="css">
.custom-filters .input-group__details {
  min-height: 0
}
.custom-filters .input-group--text-field label {
  top: 0
}
</style>
