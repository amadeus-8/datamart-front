<template>
  <v-footer
    id="dashboard-core-footer"
  >
    <v-container>
      <v-row
        align="center"
        no-gutters
      >
        <v-col
          v-for="(link, i) in links"
          :key="i"
          class="text-center mb-sm-0 mb-5"
          cols="auto"
        >
          <a
            :href="link.href"
            class="mr-0"
            rel="noopener"
            target="_blank"
            v-text="link.text"
          />
        </v-col>

        <v-spacer class="hidden-sm-and-down" />

        <v-col
          cols="12"
          md="auto"
        >
          <div class="body-1 font-weight-light pt-6 pt-md-0 text-center">
            &copy; 2019
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
  export default {
    name: 'DashboardCoreFooter',

    data: () => ({
      links: [
        {
          href: 'https://github.com/IlyasAkbergen',
          text: 'Author'
        },
        {
          href: 'https://kupipolis.kz',
          text: 'Centras Insurance'
        },
        {
            href: '#',
            text: 'Kommesk'
        }
      ]
    })
  }
</script>

<style lang="sass">
  #dashboard-core-footer
    a
      color: #3c4858
      font-size: .825rem
      font-weight: 500
      text-decoration: none
      text-transform: uppercase
</style>
