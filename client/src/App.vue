<template>
  <v-app>
    <PageHeader />
    <v-content>
      <router-view/>
    </v-content>
    <v-footer app>
      <v-layout
      justify-center
      row
      wrap>
      <v-flex
        primary
        lighten-2
        py-3
        text-xs-center
        white--text
        xs12>
        &copy;2018 — <strong>Vuetify</strong>
      </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import PageHeader from '@/components/Header'
export default {
  name: 'App',
  components: {
    PageHeader
  }
}
</script>
