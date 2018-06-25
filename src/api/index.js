import axios from 'axios'
export const getFromUrl = (url, params) => {
  return axios.get(url, {
    params: params
  })
}
