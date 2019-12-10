<template>
  <v-container
    id="extended-tables"
    fluid
    tag="section"
  >
    <base-material-card
      color="success"
      icon="mdi-clipboard-text"
      inline
      title="Отчет по регионам"
      class="px-5 py-3 mb-5"
    >
      <regions-report :view="'table'"></regions-report>
    </base-material-card>
    <div class="py-3" />

  </v-container>
</template>

<script>
    import RegionsReport from "../components/reports/RegionsReport";

    export default {
        name: "SummaryTables",
        components: {
            RegionsReport
        }
    }
</script>

<style scoped>

</style>
