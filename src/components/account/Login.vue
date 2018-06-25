<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout justify-center align-center>
        <v-flex xs12 sm6 md4>
          <v-card>
            <v-card-title
              class="primary title white--text justify-center"
            >
              {{ $t('title') }}
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-form @submit.prevent="validateBeforeSubmit">
                    <v-text-field
                      :error-messages="errors.has('username') ? errors.collect('username') : []"
                      v-validate="'required|email'"
                      data-vv-as="Tài khoản"
                      prepend-icon="person"
                      name="username"
                      label="Tài khoản"
                      v-model="login.username">
                    </v-text-field>
                    <v-text-field
                      :error-messages="errors.has('password') ? errors.collect('password') : []"
                      prepend-icon="lock"
                      v-validate="'required|min:6'"
                      data-vv-as="Mật khẩu"
                      name="password"
                      label="Mật khẩu"
                      type="password"
                      v-model="login.password">
                    </v-text-field>
                    <v-flex xs12 text-xs-center>
                      <v-btn
                        :loading="submitting"
                        :disabled="submitting"
                        color="primary"
                        type="submit"
                        >
                        Đăng nhập
                      </v-btn>
                    </v-flex>
                  </v-form>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { login } from '@/api/accounts'
import { head } from 'lodash'
export default {

  name: 'Login',
  components: {
  },
  data () {
    return {
      login: {
        username: '',
        password: '',
        source: 1
      },
      submitting: false
    }
  },
  methods: {
    validateBeforeSubmit () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.submitting = true
          login(this.login).then((response) => {
            this.submitting = false
            switch (response.code) {
              case 200:
                this.$store.dispatch('showNotify', {
                  title: 'Thành công',
                  body: 'Đăng nhập thành công',
                  type: 'success'
                })

                this.$store.dispatch('logged', response)
                this.$router.push({path: '/'})
                break
              case 401:
                this.$store.dispatch('showNotify', {
                  title: 'Cảnh báo',
                  body: 'Tài khoản của bạn chưa được xác thực. Vui lòng liên hệ ban quản trị để được hỗ trợ',
                  type: 'warning'
                })
                break
              case 422:
                let er = response.data.errors
                let message = head(er) ? head(er) : head(er[Object.keys(er)[0]])
                this.$store.dispatch('showNotify', {
                  title: 'Cảnh báo',
                  body: message,
                  type: 'warning'
                })
                break
              default :
                this.$store.dispatch('showNotify', {
                  title: 'Lỗi',
                  body: 'Có lỗi xảy ra trong quá trình đăng nhập!',
                  type: 'error'
                })
            }
          })
        } else {
          this.$store.dispatch('showNotify', {
            title: 'Cảnh báo',
            body: 'Vui lòng kiểm tra các trường cần nhập!',
            type: 'warning'
          })
        }
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang="css" scoped>
</style>
