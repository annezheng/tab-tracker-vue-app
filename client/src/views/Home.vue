<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
        <!-- <blockquote>
          &#8220;First, solve the problem. Then, write the code.&#8221;
          <footer>
            <small>
              <em>&mdash;John Johnson</em>
            </small>
          </footer>
        </blockquote> -->
        <h3>Essential Links</h3>
        <ul>
          <li><a href="https://vuejs.org" target="_blank" rel="noopener">VueJS</a></li>
          <li><a href="https://vuetifyjs.com/en/" target="_blank" rel="noopener">Vuetify</a></li>
          <li><a href="https://vuex.vuejs.org/" target="_blank" rel="noopener">Vuex</a></li>
          <li><a href="https://www.npmjs.com/package/vuex-persistedstate" target="_blank" rel="noopener">Vuex persistedstate</a></li>
          <li><a href="https://github.com/vuejs/vuex-router-sync" target="_blank" rel="noopener">Vuex router sync</a></li>
        </ul>
        <ul>
          <li><a href="http://docs.sequelizejs.com/" target="_blank" rel="noopener">Sequelize</a></li>
          <li><a href="https://lodash.com/" target="_blank" rel="noopener">Lodash</a></li>
          <li><a href="https://jwt.io/" target="_blank" rel="noopener">JWT</a></li>
          <li><a href="http://www.passportjs.org/" target="_blank" rel="noopener">Passport</a></li>
          <li><a href="https://github.com/hapijs/joi" target="_blank" rel="noopener">Joi</a></li>
          <li><a href="https://www.npmjs.com/package/bcrypt-nodejs" target="_blank" rel="noopener">Bcrypt nodejs</a></li>
        </ul>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
