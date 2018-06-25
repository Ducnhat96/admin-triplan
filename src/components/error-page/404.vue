<style lang="css">
  @import './404.css'
</style>

<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout justify-center align-center>
        <v-flex xs12 sm6 md4 class="error404">
          <v-card class="error404-body-con">
            <div class="error404-body-con-title">4<span><v-icon class="error404-0-span" style="font-size: 240px">my_location</v-icon></span>4</div>
            <p class="error404-body-con-message">Không tìm thấy trang</p>
            <div class="error404-btn-con">
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
  name: 'Error404',
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
