<template>
  <router-view />
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'App',
    created () {
      this.$router.beforeEach((to, from, next) => {
        if (to.matched.some(m => m.meta.requiresAuth)) {
          if (!this.$store.getters['auth/authorized']) {
              next({ name: 'Login' })
          } else {
              next()
          }
        } else {
          next()
        }
      })

      this.$axios.interceptors.request.use(
        config => {
            config.headers.Authorization = this.getToken
            return config
        },
        error => Promise.reject(error)
      )
      this.$axios.interceptors.response.use(response => {
        if (typeof response.headers.newauthorization !== 'undefined') {
            this.$store.commit('auth/setToken', response.headers.newauthorization)
        }
        return response
      }, err => {
        if (err.response.status === 401) {
            this.$store.commit('auth/delToken')
            this.$router.push({ name: 'Login' })
        }
        // return new Promise((resolve, reject) => {
        //     throw err
        // })
      })
    },
    computed: {
      ...mapGetters('auth', ['getToken'])
    }
  }
</script>

<style lang="scss">
@import "./assets/css/app";
</style>
