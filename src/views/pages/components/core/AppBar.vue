<template>
  <v-app-bar
    absolute
    color="transparent"
    flat
    height="85"
  >
    <v-container>
      <v-row align="center">
        <v-toolbar-title
          class="font-weight-light"
          v-text="title"
        />

        <v-spacer />

        <v-btn
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          class="hidden-sm-and-down"
          min-height="48"
          text
        >
          <v-icon
            left
            size="20"
            v-text="item.icon"
          />

          <span v-text="item.text" />
        </v-btn>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
  export default {
    name: 'PagesCoreAppBar',

    data: () => ({
      items: [
        {
          icon: 'mdi-view-dashboard',
          text: 'Dashboard',
          to: '/'
        },
        {
          icon: 'mdi-fingerprint',
          text: 'Login',
          to: '/pages/login'
        }
      ],
      titles: {
        '/pages/login': 'Datamart',
      }
    }),

    computed: {
      title() {
        return this.titles[this.$route.path]
      }
    }
  }
</script>
