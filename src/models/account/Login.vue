<template>
  <v-card>
    <v-card-title
      class="primary title white--text justify-center"
    >
      Đăng nhập
    </v-card-title>
    <v-container grid-list-sm class="pa-4">
      <v-layout row wrap>
        <v-flex xs12>
          <v-form @submit="validateBeforeSubmit">
            <v-text-field
              :error-messages="login.errors.username && login.errors.username.length ? login.errors.username[0] : []"
              prepend-icon="person"
              name="username"
              label="Tài khoản"
              v-model="login.username">
            </v-text-field>
            <v-text-field
              :error-messages="login.errors.password && login.errors.password.length ? login.errors.password[0] : []"
              prepend-icon="lock"
              name="password"
              label="Mật khẩu"
              type="password"
              v-model="login.password">
            </v-text-field>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card-actions class="justify-center">
      <v-btn
        :loading="submitting"
        :disabled="submitting"
        color="primary" @click="validateBeforeSubmit"
        >
        Đăng nhập
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Login from './model/login'
export default {
  name: 'k-login',
  data: () => ({
    login: new Login(),
    submitting: false
  }),
  methods: {
    validateBeforeSubmit () {
      this.submitting = true
      this.login.save().then(response => {
        console.log(response)
        this.submitting = false
        this.$store.dispatch('logged', response.response.data)
        this.$router.push({path: '/'})
      }).catch(error => {
        let {response} = error.getResponse()
        console.log(response)
        this.submitting = false
        if (error.response) {
          // console.log(error)
        } else if (error.request) {
          // console.log(error.request)
        } else {
          // console.log('Error', error.message, this.login.errors)
        }
      })
    }
  }
}
</script>
