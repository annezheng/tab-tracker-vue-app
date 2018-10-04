<template>
  <v-container fluid>
  <v-layout row>
    <v-flex xs10 offset-xs1 sm8 offset-sm2>
      <Panel title="Login" toolbarColor="deep-purple lighten-3">
        <v-flex xs12>
          <v-alert
            :value="error ? true:false"
            type="warning"
          >{{error}}</v-alert>
        </v-flex>
        <v-form ref="form">
          <v-text-field
              name="email"
              v-model="email"
              label="E-mail"
              clearable
              :rules="emailRules"
              required
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
          <v-btn color="deep-purple lighten-3" @click="login" dark>Login</v-btn>
        </v-form>
      </Panel>
    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import Panel from '@/components/Panel'

export default {
  components: {
    Panel
  },
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
    async login () {
      if (this.$refs.form.validate()) {
        try {
          const response = await AuthenticationService.login({
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
}
</script>
