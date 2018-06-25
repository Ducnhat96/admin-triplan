import axios from 'axios'

export const login = (info) => {
  return axios.post('/login', info)
}

export const changePassword = (data) => {
  return axios.post('account/change-password', data)
}

export const getPersonlInformation = (params) => {
  return axios.get('account', {params: params})
}

export const updateProfile = (data) => {
  return axios.post('account/update-profile', data)
}
