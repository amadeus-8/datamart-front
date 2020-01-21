<template>
  <v-navigation-drawer id="core-navigation-drawer"
                       v-model="drawer"
                       :dark="barColor !== 'rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7)'"
                       :expand-on-hover="expandOnHover"
                       mobile-break-point="960"
                       app
                       width="260"
                       v-bind="$attrs">

    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-uppercase font-weight-regular display-2">
          <span class="logo-normal">Datamart</span>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider class="mb-1" />

    <v-list dense nav>
      <base-item-group :item="profile" />
    </v-list>

    <v-divider class="mb-2" />

    <v-list expand nav>
      <template v-for="(item, i) in computedItems">
        <base-item-group v-if="item.children"
                         :key="`group-${i}`"
                         :item="item">
        </base-item-group>
        <base-item v-else
                   :key="`item-${i}`"
                   :item="item"/>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'

  export default {
    name: 'DashboardCoreDrawer',

    props: {
      expandOnHover: {
        type: Boolean,
        default: false
      }
    },

    data: () => ({
      drawer: true,
      barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',

      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'dashboard',
          to: '/'
        },
        // {
        //     group: '/charts',
        //     icon: 'mdi-chart-timeline-variant',
        //     title: 'charts',
        //     children: [
        //         {
        //             title: '',
        //             to: '#'
        //         },
        //         {
        //             title: '',
        //             to: '#'
        //         }
        //     ]
        // },
        {
            group: '/tables',
            icon: 'mdi-grid',
            title: 'tables',
            children: [
                {
                    title: 'summary',
                    to: 'summary-tables'
                },
                {
                    title: 'comparative',
                    to: 'comparative-tables'
                },
            ]
        },
      ]
    }),

    computed: {
      ...mapState('auth', ['user']),

      computedItems() {
        return this.items.map(this.mapItem)
      },
      profile() {
        return {
          avatar: false,
          group: '',
          title: this.user,
          children: [
            {
              click: this._logout,
              title: 'Выход'
            }
          ]
        }
      }
    },

    watch: {
      '$vuetify.breakpoint.smAndDown' (val) {
        this.$emit('update:expandOnHover', !val)
      }
    },

    methods: {
      ...mapActions('auth', ['logout']),
      mapItem(item) {
        return {
          ...item,
          children: item.children ? item.children.map(this.mapItem) : undefined,
          title: this.$t(item.title)
        }
      },
      _logout() {
        this.logout().then((response) => {
          if(response) this.$router.push({ name: 'Login' });
        });
      },
    }
  }
</script>

<style lang="sass">
  @import '~vuetify/src/styles/tools/_rtl.sass'

  #core-navigation-drawer
    &.v-navigation-drawer--mini-variant
      .v-list-item
        justify-content: flex-start !important

      .v-list-group--sub-group
        display: block !important

    .v-list-group__header.v-list-item--active:before
      opacity: .24

    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px

        +ltr()
          margin-right: 24px
          margin-left: 12px !important

        +rtl()
          margin-left: 24px
          margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px

        +rtl()
          padding-right: 8px

      .v-list-group__header
        +ltr()
          padding-right: 0

        +rtl()
          padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
            margin-right: 8px

          +rtl()
            margin-left: 8px
</style>
