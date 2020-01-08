<template>
  <v-app-bar absolute
             app
             color="transparent"
             flat
             height="75"
             style="width: auto;">
    <v-btn fab
           small
           @click="$vuetify.breakpoint.smAndDown ? true : $emit('input', !value)">
      <v-icon v-if="value">mdi-view-quilt</v-icon>
      <v-icon v-else>mdi-dots-vertical</v-icon>
    </v-btn>

    <v-toolbar-title class="hidden-sm-and-down" v-text="'Витрина данных'" />

    <v-spacer />

    <v-radio-group v-model="value_view" row class="pt-4">
      <v-radio label="Сумма" value="sums"></v-radio>
      <v-radio label="Среднее" value="avgs"></v-radio>
      <v-radio label="Количество" value="counts"></v-radio>
    </v-radio-group>

    <v-menu bottom
            left
            min-width="200"
            offset-y
            origin="top right"
            transition="scale-transition">
      <template v-slot:activator="{ attrs, on }">
        <v-btn min-width="0"
               text
               v-bind="attrs" v-on="on">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list :tile="false"
              flat
              nav>
        <app-bar-item to="/">
          <v-list-item-title v-text="'Профиль'" />
        </app-bar-item>

        <app-bar-item to="/pages/settings">
          <v-list-item-title v-text="'Настройки'" />
        </app-bar-item>

        <v-divider class="mb-2 mt-2"/>

        <app-bar-item>
          <v-list-item-title v-text="'Выйти'" @click="logout" />
        </app-bar-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
  // Components
  import { VHover, VListItem } from 'vuetify/lib'

  export default {
    name: 'DashboardCoreAppBar',

    components: {
      AppBarItem: {
        render(h) {
          return h(VHover, {
            scopedSlots: {
              default: ({ hover }) => h(VListItem, {
                  attrs: this.$attrs,
                  class: {
                    'black--text': !hover,
                    'white--text secondary elevation-12': hover
                  },
                  props: {
                    activeClass: '',
                    dark: hover,
                    link: true,
                    ...this.$attrs
                  }
                }, this.$slots.default)
            }
          })
        }
      }
    },

    props: {
      value: {
        type: Boolean,
        default: false
      }
    },

    data: () => ({
      value_view: null,
    }),

    methods: {
      logout() {
          this.$store.dispatch('auth/logout')
              .then((res) => {
                  if (res) this.$router.push({ name: 'Login' })
              })
      }
    }
  }
</script>
