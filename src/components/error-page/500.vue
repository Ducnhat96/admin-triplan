<style lang="css">
  @import './500.css'
</style>

<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout justify-center align-center>
        <v-flex xs12 sm6 md4 class="error500">
          <v-card class="error500-body-con">
            <div class="error500-body-con-title">
              5<span class="error500-0-span"><v-icon>sentiment_very_dissatisfied</v-icon></span><span class="error500-0-span"><v-icon>sentiment_very_dissatisfied</v-icon></span>
            </div>
            <p class="error500-body-con-message">Rất tiếc! máy chủ gặp sự cố</p>
            <div class="error500-btn-con">
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
  name: 'Error500',
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
