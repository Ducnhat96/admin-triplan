import * as accounts from '@/api/accounts'
import {
  GET_ACCOUNT
} from '@/store/mutation-types'

const getPersonlInformation = ({commit, dispatch}, params = {}) => {
  dispatch('toggleLoadding', true, {root: true})
  accounts.getPersonlInformation(params).then(response => {
    if (response.code === 200) {
      dispatch('toggleLoadding', false, {root: true})
      commit(GET_ACCOUNT, response.data)
    } else if (response.code === 404) {
      dispatch('showNotify', {
        title: 'Không tìm thấy tài nguyên',
        type: 'warning'
      }, {root: true})
      dispatch('toggleLoadding', false, {root: true})
    } else {
      dispatch('toggleLoadding', false, {root: true})
    }
  })
}

export default{
  getPersonlInformation
}
