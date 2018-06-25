<style lang="css">
  @import './403.css'
</style>

<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout justify-center align-center>
        <v-flex xs12 sm6 md4 class="error403">
          <v-card class="error403-body-con">
            <div class="error403-body-con-title">4<span class="error403-0-span"><v-icon class="error403-0-span">lock</v-icon></span><span class="error403-key-span"><i>3</i></span></div>
            <p class="error403-body-con-message">Bạn không được phép</p>
            <div class="error403-btn-con">
              <v-btn @click="goHome" style="width: 200px;" flat>Về trang chủ</v-btn>
              <v-btn @click="backPage" color="primary" style="width: 200px;margin-left: 40px;">Về trang trước</v-btn>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'Error403',
  methods: {
    backPage () {
      this.$router.go(-1)
    },
    goHome () {
      this.$router.push({
        name: 'home_index'
      })
    }
  }
}
</script>
