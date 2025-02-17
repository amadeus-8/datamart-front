<template>
  <v-flex col-12 align-center>
    <v-card
      class="text-center mb-0"
      width="400"
    >
      <v-card-text>
        <strong class="mb-3 d-inline-block">SIDEBAR FILTERS</strong>

        <v-item-group v-model="color">
          <v-item
            v-for="color in colors"
            :key="color"
            :value="color"
          >
            <template v-slot="{ active, toggle }">
              <v-avatar
                :class="active && 'v-settings__item--active'"
                :color="color"
                class="v-settings__item"
                size="25"
                @click="toggle"
              />
            </template>
          </v-item>
        </v-item-group>

        <v-divider class="my-4 secondary" />

        <strong class="mb-3 d-inline-block">SIDEBAR BACKGROUND</strong>

        <v-item-group v-model="scrim">
          <v-item
            v-for="scrim in scrims"
            :key="scrim"
            :value="scrim"
            class="mx-1"
          >
            <template v-slot="{ active, toggle }">
              <v-avatar
                :class="active && 'v-settings__item--active'"
                :color="scrim"
                class="v-settings__item"
                size="24"
                @click="toggle"
              />
            </template>
          </v-item>
        </v-item-group>

        <v-divider class="my-4 secondary" />

        <v-row
          align="center"
          no-gutters
        >
          <v-col cols="auto">
            Dark Mode
          </v-col>

          <v-spacer />

          <v-col cols="auto">
            <v-switch
              v-model="$vuetify.theme.dark"
              class="ma-0 pa-0"
              color="secondary"
              hide-details
            />
          </v-col>
        </v-row>

        <v-divider class="my-4 secondary" />

        <v-row
          align="center"
          no-gutters
        >
          <v-col cols="auto">
            Sidebar Mini
          </v-col>

          <v-spacer />

          <v-col cols="auto">
            <v-switch
              v-model="internalValue"
              class="ma-0 pa-0"
              color="secondary"
              hide-details
            />
          </v-col>
        </v-row>

        <v-divider class="my-4 secondary" />

        <v-row
          align="center"
          no-gutters
        >
          <v-col cols="auto">
            Sidebar Image
          </v-col>

          <v-spacer />

          <v-col cols="auto">
            <v-switch
              v-model="showImg"
              class="ma-0 pa-0"
              color="secondary"
              hide-details
            />
          </v-col>
        </v-row>

        <v-divider class="my-4 secondary" />

        <strong class="mb-3 d-inline-block">IMAGES</strong>

        <v-item-group
          v-model="image"
          class="d-flex justify-space-between mb-3"
        >
          <v-item
            v-for="image in images"
            :key="image"
            :value="image"
            class="mx-1"
          >
            <template v-slot="{ active, toggle }">
              <v-sheet
                :class="active && 'v-settings__item--active'"
                class="d-inline-block v-settings__item"
                @click="toggle"
              >
                <v-img
                  :src="image"
                  height="100"
                  width="50"
                />
              </v-sheet>
            </template>
          </v-item>
        </v-item-group>

        <div class="my-12" />

      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
    import Proxyable from 'vuetify/lib/mixins/proxyable'
    import { mapMutations, mapState, mapActions } from 'vuex'

    export default {
        name: 'Settings',

        mixins: [Proxyable],

        data: () => ({
            color: '#E91E63',
            colors: [
                '#9C27b0',
                '#00CAE3',
                '#4CAF50',
                '#ff9800',
                '#E91E63',
                '#FF5252'
            ],
            image: 'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg',
            images: [
                'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg',
                'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-2.jpg',
                'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-3.jpg',
                'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-4.jpg'
            ],
            menu: false,
            saveImage: '',
            scrim: 'rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)',
            scrims: [
                'rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)',
                'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)',
                'rgba(244, 67, 54, .8), rgba(244, 67, 54, .8)'
            ],
            showImg: true
        }),

        computed: {
            ...mapState(['barImage']),
            ...mapState('filter', ['filter'])
        },

        watch: {
            color(val) {
                this.$vuetify.theme.themes[this.isDark ? 'dark' : 'light'].primary = val
            },
            showImg(val) {
                if (!val) {
                    this.saveImage = this.barImage
                    this.setBarImage('')
                } else if (this.saveImage) {
                    this.setBarImage(this.saveImage)
                    this.saveImage = ''
                } else {
                    this.setBarImage(val)
                }
            },
            image(val) {
                this.setBarImage(val)
            },
            scrim(val) {
                this.$store.commit('SET_SCRIM', val)
            }
        },

        mounted () {
            this.getFilterSets()
            this.getRegions()
        },

        methods: {
            ...mapActions('filter', ['getFilterSets', 'getRegions']),
            ...mapMutations({
                setBarImage: 'SET_BAR_IMAGE'
            })
        }
    }
</script>

<style lang="sass">
  .v-settings
    .v-item-group > *
      cursor: pointer

    &__item
      border-width: 3px
      border-style: solid
      border-color: transparent !important

      &--active
        border-color: #00cae3 !important
</style>

