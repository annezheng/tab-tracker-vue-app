<template>
  <Panel title="Search" toolbarColor="deep-purple lighten-3">
      <v-text-field
          v-model="search"
          label="Search"
          clearable
      ></v-text-field>
  </Panel>
</template>

<script>
import _ from 'lodash'

export default {
  data() {
      return {
          search: ''
      }
  },
  watch: {
    search: _.debounce(async function (newValue, oldValue) {
      const route = {
          path: 'songs'
      }
      if (newValue !== '') {
          route.query = {
              search: newValue
          }
      }
      this.$router.push(route)
    }, 700),
    '$route.query.search': {
      immediate: true,
      handler (value) {
          this.search = value
      }
    }
  }
}
</script>
