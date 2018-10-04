<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-alert
          :value="error ? true:false"
          type="warning"
        >{{error}}</v-alert>
      </v-flex>
      <v-flex xs12 md6>
      <Panel title="View Song" toolbarColor="deep-purple lighten-2" height="430">
        <v-layout align-center justify-center row fill-height>
        <v-flex xs12>
            <v-card width="420" height="320" flat style="margin: auto">
              <v-img
                :src="song.albumImageUrl"
                aspect-ratio="2"
                class="mb-0"
              ></v-img>
              <v-layout align-start justify-space-between row fill-height>
                <v-flex d-flex xs9>
                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0 deep-purple--text">
                        {{song.title}}
                        <v-chip
                          color="cyan lighten-2 white--text"
                          class="ml-0"
                          small
                          d-inline>
                          {{song.genre}}
                        </v-chip>
                      </h3>
                      <h3 class="subheading">{{song.artist}}</h3>
                      <div>{{song.album}}</div>
                    </div>
                  </v-card-title>
                </v-flex>
                <v-flex d-flex xs3>
                  <v-layout row wrap>
                    <v-spacer></v-spacer>
                    <v-layout column align-end>
                      <v-btn
                        v-if="isUserLoggedIn"
                        color="deep-purple lighten-2"
                        dark small flat
                        :to="{name: 'edit-song', params: {songId: song.id}}"
                        style="top: 20px; text-align: left">
                        Edit<v-icon small right>fas fa-edit</v-icon>
                      </v-btn>
                      <v-dialog v-model="dialog" persistent max-width="290">
                        <v-btn
                          v-if="isUserLoggedIn"
                          color="deep-orange lighten-2"
                          dark small flat
                          slot="activator"
                          style="top: 10px">
                          Remove<v-icon small right>fas fa-trash</v-icon>
                        </v-btn>
                        <v-card>
                          <v-card-title class="headline">Are you sure you want to delete this song?</v-card-title>
                          <v-card-text>This means it will be gone for good.</v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="cyan darken-1" flat @click.native="dialog = false">No</v-btn>
                            <v-btn color="orange darken-1" flat @click.native="deleteSong">Yes</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      <v-btn
                        v-if="isUserLoggedIn && !bookmark"
                        color="deep-purple lighten-2"
                        dark small flat
                        @click="setBookmark"
                      >Bookmark
                        <v-icon right small>fas fa-bookmark</v-icon>
                      </v-btn>
                      <v-btn
                        v-if="isUserLoggedIn && bookmark"
                        color="deep-orange lighten-2"
                        dark small flat
                        @click="unsetBookmark"
                        >Unbookmark
                        <v-icon small right>far fa-bookmark</v-icon>
                      </v-btn>
                    </v-layout>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </Panel>
      </v-flex>
      <v-flex xs12 md6>
        <Panel title="Video" toolbarColor="deep-purple lighten-2" height="430">
          <v-card width="420" height="320" flat style="margin: auto;">
              <iframe width="420" height="315"
                  :src="'https://www.youtube.com/embed/'+ song.youtubeId">
                </iframe>
              </v-card>
        </Panel>
      </v-flex>
      </v-layout>
      <v-layout row wrap align-center justify-space-between class="mt-2">
      <v-flex xs12 md6>
        <Panel v-if="song.lyrics" title="Lyrics" toolbarColor="deep-purple lighten-2">
          <textarea readonly v-model="song.lyrics" rows="12">
          </textarea>
        </Panel>
      </v-flex>
      <v-flex xs12 md6>
        <Panel v-if="song.tab" title="Guitar Tab" toolbarColor="deep-purple lighten-2">
          <textarea readonly solo full-width v-model="song.tab" rows="12">
          </textarea>
        </Panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SongsService from '@/services/SongsService'
import BookmarksService from '@/services/BookmarksService'
import SongHistoryService from '@/services/SongHistoryService'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      song: {},
      error: null,
      bookmark: null,
      dialog: false
    }
  },
  computed: {
    ...mapState(['isUserLoggedIn', 'user'])
  },
  methods: {
    async deleteSong () {
      this.error = null
      try {
        console.log('deleteSong...')
        await SongsService.delete(this.song.id)
        console.log('deleted Song')
        this.$router.replace('/songs')
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async unsetBookmark () {
      this.error = null
      try {
        await BookmarksService.delete(this.bookmark.bookmarkId)
        this.bookmark = null
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async setBookmark () {
      this.error = null
      try {
        this.bookmark = (await BookmarksService.post({
          songId: this.song.id
        })).data
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  async mounted () {
      const songId = this.$store.state.route.params.songId
      try {
        this.song = (await SongsService.show(songId)).data
        if (!this.isUserLoggedIn) {
          return
        }
        const bookmarks = (await BookmarksService.index({
          songId: songId
        })).data
        if (bookmarks.length) {
          this.bookmark = bookmarks[0]
        }
        SongHistoryService.post({
          songId: songId
        })
      } catch (error) {
        this.error = error.response.data.error
      }
  }
}
</script>

<style Scoped>
  textarea {
    width: 100%;
    margin: auto;
    padding-top: 1px;
    padding-left: 2px;
  }
</style>
