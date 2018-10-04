<template>
  <v-toolbar color="primary lighten-2" dark>
    <v-toolbar-title style="cursor: pointer">
      <router-link to="/" tag="span">
        TabTracker
      </router-link>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn flat to="/songs">
        Browser
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/login" v-if="!$store.state.isUserLoggedIn">
        Log In
      </v-btn>
      <v-btn flat to="/register" v-if="!$store.state.isUserLoggedIn">
        Sign Up
      </v-btn>
      <v-btn flat @click="logout" v-if="$store.state.isUserLoggedIn">
        Log Out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.replace({
        path: '/songs'
      })
    }
  }

}
</script>