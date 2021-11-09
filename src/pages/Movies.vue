<template>
 <q-page padding>
   <div class="row justify-between flex-center">
    <span>
      <h3>Movies</h3>
    </span>
    <div>
      <q-btn color="brown-5" icon="add" label="Add Movie" @click="$refs.movieDialogRef.openDialog()" />
    </div>
   </div>
   <div class="q-pa-md">
      <q-table
        :rows= "getMovies"
        :columns="columns"
        row-key="name"
        :loading="getStatus > 0"
      >
         <template v-slot:body-cell-genres="props">
          <q-td>
              <q-chip v-for="genre in props.value" :key="genre" dense color="red-5">{{genre}}</q-chip>
          </q-td>
         </template>

        <template v-slot:body-cell-selectActions="props">
          <q-td class="flex flex-center">
            <q-btn color="primary" icon="settings" >
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup @click="$refs.movieDialogRef.openDialog(props.row)" @submit="$refs.movieDialogRef.cancelAll()">
                    <q-item-section>Edit</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="$refs.deleteDialogRef.openDialog(props.row.id)">
                    <q-item-section>Delete</q-item-section>
                 </q-item>
                 </q-list>
              </q-menu>
            </q-btn>
          </q-td>
        </template>

      </q-table>
   </div>
   <MovieDialog ref="movieDialogRef"/>
   <DeleteDialog url="movies" ref="deleteDialogRef"/>
 </q-page>
</template>

<script>
import MovieDialog from '../components/MovieDialog.vue'
import DeleteDialog from '../components/DeleteDialog.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    MovieDialog,
    DeleteDialog
  },
  data () {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Id',
          align: 'left',
          field: row => row.id,
          sortable: true
        },
        { name: 'title', align: 'center', label: 'Title', field: 'title', sortable: true },
        { name: 'genres', align: 'center', label: 'Genres', field: 'genres', sortable: true },
        { name: 'selectActions', align: 'center', label: 'Actions', sortable: true }
      ]
    }
  },
  // methods: {
  //   delete (row) {
  //     this.$store.dispatch('movies/delete_item', row.id)
  //   }
  // },
  computed: {
    ...mapGetters({
      getMovies: 'movies/getAllItems',
      getStatus: 'movies/getCurrentStatus'
    })
  },
  mounted () {
    this.$store.dispatch('movies/fetch_data')
  }
}
</script>

<style lang="scss" scoped>

</style>
