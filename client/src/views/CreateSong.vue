<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs10 offset-xs1 sm8 offset-sm2>
        <Panel title="Create Song" toolbarColor="deep-purple lighten-2">
          <v-flex xs12>
            <v-alert
              :value="error ? true:false"
              type="error"
              v-html="error"
            ></v-alert>
          </v-flex>
          <v-form ref="form" v-model="valid">
            <v-layout row>
              <v-flex xs12 sm6>
                <v-text-field
                    v-model="song.title"
                    label="Title"
                    :rules="requiredRule"
                    required
                    clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="song.artist"
                  prepend-icon="person"
                  label="Artist"
                  :rules="requiredRule"
                  required
                  clearable
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="song.album"
                  label="Album"
                  :rules="requiredRule"
                  required
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="song.genre"
                  prepend-icon="dialpad"
                  label="Genre"
                  clearable
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-text-field
              v-model="song.albumImageUrl"
              :rules="requiredRule"
              required
              label="Album ImageUrl"
              clearable
            ></v-text-field>
            <v-text-field
              v-model="song.youtubeId"
              label="Youtube Id"
              clearable
            ></v-text-field>
            <v-textarea
              label="Lyrics"
              v-model="song.lyrics"
              auto-grow
              clearable
            ></v-textarea>
            <v-textarea
              label="Guitar Tab"
              v-model="song.tab"
              auto-grow
              clearable
            ></v-textarea>
            <v-btn
              class="deep-purple lighten-1 white--text"
              :disabled="!valid"
              @click="create"
              >
              Create
            </v-btn>
            <v-btn @click="clear">clear</v-btn>
          </v-form>
        </Panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SongsService from '@/services/SongsService'
export default {
  data () {
      return {
        song: {
          title: null,
          artist: null,
          genre: null,
          album: null,
          albumImageUrl: null,
          youtubeId: null,
          lyrics: null,
          tab: null
        },
        error: null,
        valid: false,
        requiredRule: [value => !!value || 'This field is required']
      }
  },
  methods: {
    async create () {
      this.error = null
      if (this.$refs.form.validate()) {
        try {
          await SongsService.post(this.song)
          this.$router.replace('/songs')
        } catch (error) {
          this.error = error.response.data.error
        }
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  },
}
</script>
