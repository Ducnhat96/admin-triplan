import { Model } from 'vue-mc'
import ls from 'local-storage'

export default class extends Model {
  getRequest (config) {
    config.baseURL = process.env.API_URI
    return super.getRequest(config)
  }

  getDefaultHeaders () {
    let defaultHeader = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }

    let token = ls.get('authen', {})
    if (token) {
      defaultHeader.Authorization = `Bearer ${token.access_token}`
    }

    return defaultHeader
  }
}
