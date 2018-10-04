<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs10 offset-xs1 sm8 offset-sm2>
        <Panel title="Edit Song" toolbarColor="deep-purple lighten-2">
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
              clearable
              auto-grow
            ></v-textarea>
            <v-textarea
              label="Guitar Tab"
              v-model="song.tab"
              clearable
              auto-grow
            ></v-textarea>
            <v-btn
              class="deep-purple lighten-1 white--text"
              :disabled="!valid"
              @click="save"
              >
              Save
            </v-btn>
            <v-btn :to="{name: 'song', params: {songId: song.id}}" flat>Cancel</v-btn>
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
    async save () {
      this.error = null
      if (this.$refs.form.validate()) {
        try {
          await SongsService.put(this.song)
          this.$router.push({
            name: 'song',
            params: {
              songId: this.$store.state.route.params.songId
            }
          })
        } catch (error) {
          this.error = error.response.data.error
        }
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  },
  async mounted () {
      const songId = this.$store.state.route.params.songId
      this.song = (await SongsService.show(songId)).data
  }
}
</script>

