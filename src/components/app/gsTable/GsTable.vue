<template>
  <v-flex xs12>
    <v-card-title class="align-end pt-0 pb-2">
      <div class="text-xs-center" v-if="typeof dataPaginations[tableName] !== 'undefined'">
        <v-pagination class="custom-pagination" @input="pageChange" v-model="dataPaginations[tableName].current_page" :length="pages" :total-visible="7" :value="dataPaginations[tableName].current_page">></v-pagination>
      </div>
      <v-spacer></v-spacer>
      <div>
        <v-menu offset-y :close-on-content-click="false" :nudge-width="400">
          <v-tooltip slot="activator" top>
            <v-btn slot="activator" flat icon color="indigo" class="ma-0 mr-2">
              <v-icon>unfold_more</v-icon>
            </v-btn>
            <span>Xắp xếp: {{sortStatus}}</span>
          </v-tooltip>
          <v-card>
            <v-container>
              <v-layout v-for="(item, index) in dataSorts" :key="index" row>
                <v-flex xs3 class="d-flex align-center">
                  <span class="mr-3">{{item.name}}: </span>
                </v-flex>
                <v-flex xs9>
                  <v-radio-group v-model="dataSorted[item.key]" row class="pa-0 align-center custom-radio-group" style="height: 40px" @change="fetchData">
                    <v-radio label="Không" value="" ></v-radio>
                    <v-radio label="Tăng" :value="1" ></v-radio>
                    <v-radio label="Giảm" :value="-1"></v-radio>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-menu>
        <v-tooltip top>
          <v-btn slot="activator" flat icon color="brown" class="ma-0 mr-3" @click.prevent="removeFilter">
            <v-icon>not_interested</v-icon>
          </v-btn>
          <span>Xóa bộ lọc</span>
        </v-tooltip>
      </div>
      <v-text-field
        v-model="q"
        append-icon="search"
        :label="searchText"
        single-line
        hide-details
        @input="filter"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="dataTable"
      :pagination.sync="pagination"
      :loading="loading"
      :total-items="typeof dataPaginations[tableName] !== 'undefined' ? dataPaginations[tableName].total : 0"
      :select-all="selectAll"
      :rows-per-page-items="[25]"
      :search="q"
      item-key="name"
      no-data-text="Xin lỗi, không có gì để hiển thị ở đây :("
      no-results-text="Không tìm thấy kết quả"
      hide-actions
      class="elevation-1"
      >
      <template slot="headers" slot-scope="props">
        <tr>
          <th v-if="dataTable.length && selectAll">
            <v-checkbox
              :input-value="props.all"
              :indeterminate="props.indeterminate"
              primary
              hide-details
              @click.native="toggleAll"
            ></v-checkbox>
          </th>
          <th
            v-for="header in props.headers"
            :key="header.text"
            class="black--text"
            :class="header.align ? header.align : 'text-xs-left'"
          >
            {{ header.text }}
          </th>
        </tr>
      </template>

      <template slot="items" slot-scope="props">
        <slot :item="props.item" :index="props.index"></slot>
      </template>

    </v-data-table>
    <v-card-title class="align-center" v-if="typeof dataPaginations[tableName] !== 'undefined'">
      <v-pagination class="custom-pagination" @input="pageChange" v-model="dataPaginations[tableName].current_page" :length="pages" :total-visible="7" :value="dataPaginations[tableName].current_page">></v-pagination>
      <v-spacer></v-spacer>
    </v-card-title>
  </v-flex>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { debounce, forEach, findIndex } from 'lodash'
import ls from 'local-storage'

export default {
  name: 'gs-table',
  props: {
    tableName: {
      type: String,
      default: 'anonymous'
    },
    dataSource: {
      type: String,
      default: null
    },
    dataParams: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dataSorted: {
      type: Object,
      default: () => {
        return {
          created_at: -1
        }
      }
    },
    dataSorts: {
      type: Array,
      default: () => {
        return [
          {key: 'created_at', name: 'Ngày tạo'}
        ]
      }
    },
    searchText: {
      type: String,
      default: 'Tìm kiếm'
    },
    cacheData: {
      type: Boolean,
      default: true
    },
    selectAll: {
      type: Boolean,
      default: false
    },
    headers: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      q: null,
      sortStatus: '',
      desserts: [],
      pagination: {
        sortBy: 'name'
      },
      selected: []
    }
  },
  computed: {
    ...mapGetters('gsTable', ['dataTable', 'dataTables', 'dataPaginations', 'tableQueries']),
    ...mapGetters(['loading']),
    pages () {
      return this.dataPaginations[this.tableName].total_pages
    }
  },
  methods: {
    ...mapActions('gsTable', ['fetchTableData', 'setTableData', 'setPaginator', 'setTableQuery']),
    fetchData () {
      this.sort()
      this.dataParams.q = this.tableQueries[this.tableName] ? this.tableQueries[this.tableName] : null
      if (typeof this.dataPaginations[this.tableName] !== 'undefined') {
        this.dataParams.page = this.dataPaginations[this.tableName].current_page
      }

      this.fetchTableData({
        url: this.dataSource,
        params: this.dataParams,
        table_name: this.tableName
      })
    },
    filter: debounce(function () {
      if (this.q !== this.tableQueries[this.tableName]) {
        this.setTableQuery({table_name: this.tableName, value: this.q})
        this.fetchData()
      }
    }, 500),
    sort () {
      let sort = ''
      forEach(this.dataSorted, (value, key) => {
        if (value) {
          sort += `${key}:${value},`
        }
      })
      if (sort.slice(0, sort.length - 1)) {
        this.dataParams.sort = sort.slice(0, sort.length - 1)
      }
      let lsSorteds = ls.get('sorteds', {})
      if (!lsSorteds) {
        lsSorteds = {}
      }
      lsSorteds[this.tableName] = this.dataSorted
      ls.set('sorteds', lsSorteds)
    },
    removeFilter () {
      this.setTableQuery({table_name: this.tableName, value: null})
      this.q = null
      this.$emit('remove-filter')
    },
    pageChange (page) {
      this.setPaginator({table_name: this.tableName, key: 'current_page', value: page})
      if (this.dataParams.page !== page) {
        this.fetchData()
      }
    },
    toggleAll () {
      if (this.selected.length) this.selected = []
      else this.selected = this.desserts.slice()
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    }
  },
  mounted () {
    if (this.cacheData) {
      if (typeof this.dataTables[this.tableName] === 'undefined') {
        this.fetchData()
      } else {
        this.setTableData(this.tableName)
        this.q = this.tableQueries[this.tableName] ? this.tableQueries[this.tableName] : null
      }
    } else {
      this.fetchData()
    }
  },
  created () {
    this.$on('reload-table', () => {
      if (typeof this.dataPaginations[this.tableName] !== 'undefined') {
        this.setPaginator({table_name: this.tableName, key: 'current_page', value: 1})
      }
      if (typeof this.dataTables[this.tableName] !== 'undefined') {
        this.fetchData()
      }
    })
  },
  watch: {
    dataSorted: {
      handler: function (value) {
        let sortTxt = ''
        forEach(this.dataSorted, (value, key) => {
          if (value) {
            if (findIndex(this.dataSorts, {key: key}) > -1) {
              sortTxt += this.dataSorts[findIndex(this.dataSorts, {key: key})]['name'] + `: ${value === 1 ? 'tăng' : 'giảm'}, `
            } else {
              sortTxt += `${key}: ${value === 1 ? 'tăng' : 'giảm'}, `
            }
          }
        })
        this.sortStatus = sortTxt.slice(0, sortTxt.length - 2)
      },
      deep: true
    },
    pagination: {
      handler () {

      },
      deep: true
    }
  }
}
</script>
<style>
  .custom-radio-group .input-group__details {
    display: none;
  }
  .custom-pagination .pagination__item {
    width: 2em;
    height: 2em;
  }
</style>
