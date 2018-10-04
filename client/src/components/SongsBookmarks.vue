<template>
  <Panel title="Bookmarks" toolbarColor="deep-purple lighten-3">
    <v-alert
      :value="error ? true:false"
      type="warning"
    >{{error}}</v-alert>
    <v-data-table
      :headers="headers"
      :pagination.sync="pagination"
      :items="bookmarks"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-right">{{ props.item.title }}</td>
        <td class="text-xs-right">{{ props.item.artist }}</td>
      </template>
    </v-data-table>
  </Panel>
</template>

<script>
import BookmarksService from '@/services/BookmarksService'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      error: null,
      headers: [
        {
          text: 'Title',
          value: 'title',
          align: 'right'
        },
        {
          text: 'Artist',
          value: 'artist',
          align: 'right'
        }
      ],
      pagination: {
        sortBy: "createdAt",
        descending: true
      },
      bookmarks: []
    }
  },
  computed: {
    ...mapState(['isUserLoggedIn'])
  },
  async mounted () {
      try {
        if (!this.isUserLoggedIn) {
          return
        }
        this.bookmarks = (await BookmarksService.index()).data
      } catch (error) {
        this.error = error.response.data.error
      }
  }
}
</script>
