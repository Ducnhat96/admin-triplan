import {
  SET_TABLE_DATA,
  SET_TABLE_DATAS,
  SET_TABLE_PAGINATION,
  SET_TABLE_PAGINATIONS,
  SET_TABLE_QUERIES
} from '@/store/mutation-types'
export default {
  [SET_TABLE_DATA] (state, data) {
    state.dataTable = data
  },
  [SET_TABLE_DATAS] (state, data) {
    state.dataTables[data.table_name] = data.data
  },
  [SET_TABLE_PAGINATION] (state, data) {
    state.dataPaginations[data.table_name][data.key] = data.value
  },
  [SET_TABLE_PAGINATIONS] (state, data) {
    state.dataPaginations[data.table_name] = data.data
  },
  [SET_TABLE_QUERIES] (state, data) {
    state.tableQueries[data.table_name] = data.value
  }
}
