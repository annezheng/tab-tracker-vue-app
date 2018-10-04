<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm4 v-if="isUserLoggedIn">
        <SongsBookmarks />
        <RecentlyViewedSongs />
      </v-flex>
      <v-flex :class="{'xs12 sm8': isUserLoggedIn, 'xs12 sm10 offset-sm1': !isUserLoggedIn}">
        <SearchSongs />
        <Songs />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Songs from '@/views/Songs'
import SearchSongs from '@/components/SearchSongs'
import SongsBookmarks from '@/components/SongsBookmarks'
import RecentlyViewedSongs from '@/components/RecentlyViewedSongs'
import { mapState } from 'vuex'

export default {
  name: "SongsPanel",
  components: {
    Songs,
    SearchSongs,
    SongsBookmarks,
    RecentlyViewedSongs
  },
  computed: {
    ...mapState(['isUserLoggedIn'])
  }
}
</script>

