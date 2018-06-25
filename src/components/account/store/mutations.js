import {
  GET_ACCOUNT
} from '@/store/mutation-types'

export default {
  [GET_ACCOUNT] (state, accountInfo) {
    state.accountInfo = accountInfo
  }
}
