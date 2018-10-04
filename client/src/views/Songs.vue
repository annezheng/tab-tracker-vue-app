<template>
  <Panel title="Songs" toolbarColor="deep-purple lighten-3">
      <template slot="action">
        <v-btn v-if="$store.state.isUserLoggedIn" class="deep-purple darken" fab absolute right middle to="songs/create">
          <v-icon>add</v-icon>
        </v-btn>
      </template>
      <v-container grid-list-xs fluid>
        <v-layout row wrap>
          <v-flex
            v-for="song of songs"
            :key="song.id"
            sm12 md6 lg4
          >
            <v-card color="primary lighten-1" class="white--text elevation-2" height="100%">
              <v-layout style="height: 75%">
                <v-flex xs7>
                  <v-card-title >
                    <v-layout justify-start column fill-height>
                      <v-flex xs12 class="pt-0 yellow--text">
                        <div class="headline">{{song.title}}</div>
                        <div>{{song.artist}}</div>
                      </v-flex>
                      <v-flex xs12>
                        <div>{{song.album}}</div>
                        <div class="caption">{{song.genre}}</div>
                      </v-flex>
                    </v-layout>
                  </v-card-title>
                </v-flex>
                <v-flex xs5>
                  <v-img
                    :src="song.albumImageUrl"
                    class="mr-2"
                    height="150px"
                  ></v-img>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-card-actions class="pa-3">
                <v-btn flat color="white" :to="{name: 'song', params: {songId: song.id}}">
                <v-icon small left>fas fa-headphones</v-icon> View</v-btn>
                <v-spacer></v-spacer>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
  </Panel>
</template>

<script>
import SongsService from '@/services/SongsService'

export default {
  data () {
    return {
      songs: null
    }
  },
  methods: {
    viewSong(song) {
      this.$router.push({
        name: 'song',
        params: {
          songId: song.id
        }
      })
    }
  },
  watch: {
    '$route.query.search': {
        immediate: true,
        async handler (value) {
            this.songs = (await SongsService.index(value)).data
        }
    }
  }
}
</script>
