<template>
  <Panel title="Recently Viewed" toolbarColor="deep-purple lighten-3">
    <v-alert
      :value="error ? true:false"
      type="warning"
    >{{error}}</v-alert>
    <v-data-table
      :headers="headers"
      :items="songs"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-right">{{ props.item.title }}</td>
        <td class="text-xs-right">{{ props.item.artist }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            @click="deleteItem(props.item)">
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
  </Panel>
</template>

<script>
import SongHistoryService from '@/services/SongHistoryService'
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
        },
        {
          text: 'Action',
          value: '',
          align: 'right',
          sortable: false
        }
      ],
      pagination: {
        sortBy: "createdAt",
        descending: true
      },
      songs: []
    }
  },
  computed: {
    ...mapState(['isUserLoggedIn', 'user'])
  },
  methods: {
    async deleteItem (item) {
      console.log('deleteItem', item)
      try {
        await SongHistoryService.delete(item.viewHistoryId)
        const index = this.songs.indexOf(item)
        this.songs.splice(index, 1)
      } catch (error) {
        this.error = error.response.data.error
      }
    },
  },
  async mounted () {
      try {
        if (!this.isUserLoggedIn) {
          return
        }
        this.songs = (await SongHistoryService.index()).data
      } catch (error) {
        this.error = error.response.data.error
      }
  }
}
</script>

