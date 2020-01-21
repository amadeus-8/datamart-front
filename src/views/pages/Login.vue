<template>
  <v-container
    id="login"
    fill-height
    tag="section"
  >
    <v-row justify="center">
      <v-slide-y-transition appear>
        <base-material-card
          color="success"
          light
          max-width="100%"
          width="400"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="text-center">
              <h1 class="display-2 font-weight-bold mb-2">
                Вход в систему
              </h1>
            </div>
          </template>

          <v-card-text class="text-center">
            <div class="text-center grey--text body-1 font-weight-light">
              Войдите в систему
            </div>
            <ValidationProvider rules="required|email" v-slot="{ errors }">
              <v-text-field
                color="secondary"
                v-model="form.email"
                label="Email..."
                name="email"
                data-vv-as="Email"
                prepend-icon="mdi-email"
              />
              <p class="text--accent-3">{{ errors[0] }}</p>
            </ValidationProvider>

            <ValidationProvider rules="required" v-slot="{ errors }">
              <v-text-field
                class="mb-8"
                v-model="form.password"
                type="password"
                color="secondary"
                label="Пароль..."
                prepend-icon="mdi-lock-outline"
              />
              <p class="text--accent-3">{{ errors[0] }}</p>
            </ValidationProvider>
            <pages-btn
              large
              color=""
              depressed
              @click="submit"
              class="v-btn--text success--text"
            >
              Войти
            </pages-btn>
          </v-card-text>
        </base-material-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script>
  import { mapActions } from 'vuex'
  import { ValidationProvider } from 'vee-validate'

  export default {
    name: 'PagesLogin',

    beforeCreate () {
        if (this.$store.getters['auth/authorized']) {
            this.$router.push({ name: 'Dashboard' })
        }
    },
    components: {
      PagesBtn: () => import('./components/Btn'),
      ValidationProvider,
    },

    data: () => ({
      form: {
        email: '',
        password: ''
      }
    }),

    methods: {
      ...mapActions('auth', ['login', 'getUser']),
      submit () {
              this.login(this.form)
                .then((res) => {
                  this.$router.push({ name: 'Dashboard' })
                  this.getUser()
                  return res
                })
                .catch(error => {
                  alert(error);
                })
      }
    }
  }
</script>
