<template>
  <v-container fluid>
  <v-layout row>
    <v-flex xs10 offset-xs1 sm8 offset-sm2>
      <Panel title="Register" toolbarColor="light-blue lighten-1">
        <v-flex xs12>
          <v-alert
            :value="error ? true:false"
            type="warning"
          >{{error}}</v-alert>
        </v-flex>
        <v-form name="register-form">
          <v-text-field
            name="email"
            v-model="email"
            label="E-mail"
            :rules="emailRules"
            required
            clearable
          ></v-text-field>
          <v-text-field
            name="password"
            v-model="password"
            label="Password"
            type="password"
            :rules="passwordRules"
            :counter="30"
            required
            clearable
          ></v-text-field>
          <v-btn color="light-blue lighten-1" @click="register" dark>Register</v-btn>
        </v-form>
      </Panel>
    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
        email: '',
        password: '',
        error: null,
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 3 && v.length <= 30) || 'Password length must be between 3 and 30 characters'
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ]
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email : this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push('songs')
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>
