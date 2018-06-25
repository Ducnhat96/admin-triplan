import Model from '@/components/commons/mc/model'
import {
  boolean,
  equal,
  integer,
  min,
  required,
  string
} from 'vue-mc/validation'

export default class User extends Model {
  defaults () {
    return {
      id:   null,
      name: '',
      done: false
    }
  }

  // Attribute mutations.
  mutations () {
    return {
      id:   (id) => Number(id) || null,
      name: String,
      done: Boolean
    }
  }

  // Attribute validation
  validation () {
    return {
      id:   integer.and(min(1)).or(equal(null)),
      name: string.and(required),
      done: boolean
    }
  }

  // Route configuration
  routes () {
    return {
      fetch: '/task/{id}',
      save:  '/task'
    }
  }
}
