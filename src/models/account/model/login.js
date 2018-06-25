import Model from '@/models/commons/mc/model'
import {
  required,
  string,
  email,
  length
} from 'vue-mc/validation'

export default class Login extends Model {
  defaults () {
    return {
      username: '',
      password: ''
    }
  }

  // Attribute mutations.
  mutations () {
    return {
      username: String,
      password: String
    }
  }

  // Attribute validation
  validation () {
    return {
      username: required.and(email),
      password: string.and(length(6)).and(required)
    }
  }

  options () {
    return {
      validateOnChange: true,
      validateOnSave: true,
      validateRecursively: true
    }
  }

  // Route configuration
  routes () {
    return {
      save: '/login'
    }
  }
}
