import {
  SET_TABLE_DATA,
  SET_TABLE_DATAS,
  SET_TABLE_PAGINATION,
  SET_TABLE_PAGINATIONS,
  SET_TABLE_QUERIES
} from '@/store/mutation-types'
import { getFromUrl } from '@/api'
export default{
  fetchTableData: ({ commit, dispatch }, configs) => {
    dispatch('toggleLoadding', true, {root: true})
    getFromUrl(configs.url, configs.params).then(response => {
      if (response.code === 200) {
        dispatch('toggleLoadding', false, {root: true})
        commit(SET_TABLE_DATA, response.data)
        commit(SET_TABLE_DATAS, {table_name: configs.table_name, data: response.data})
        if (typeof response.meta !== 'undefined' && typeof response.meta.pagination !== 'undefined') {
          commit(SET_TABLE_PAGINATIONS, {table_name: configs.table_name, data: response.meta.pagination})
        }
      } else {
        dispatch('toggleLoadding', false, {root: true})
        commit(SET_TABLE_DATA, [])
        commit(SET_TABLE_DATAS, {table_name: configs.table_name, data: []})
      }
    })
  },
  setTableData: ({ commit, state }, name) => {
    commit(SET_TABLE_DATA, state.dataTables[name])
  },
  setPaginator: ({commit}, configs) => {
    commit(SET_TABLE_PAGINATION, configs)
  },
  setTableQuery: ({commit}, configs) => {
    commit(SET_TABLE_QUERIES, configs)
  }
}
