<template>
    <div></div>
    <q-page padding>
      <div class="row justify-between flex flex-center">
        <span>
          <h3>Rental</h3>
        </span>
        <div>
          <q-btn
            color="primary"
            label="add"
            @click="$refs.rentalDialog.openDialog()"
          />
        </div>

      </div>
      <div class="q-pa-md">
        <q-table
          :rows="getRentals"
          :columns="columns"
          row-key="name"

        >

         <template v-slot:body-cell-selectActions="props">
          <q-td class="flex flex-center">
            <q-btn color="primary" icon="settings" >
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup @click="$refs.rentalDialog.openDialog(props.row)" @submit="$refs.rentalDialog.cancelAll()">
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
      <RentalDialog ref="rentalDialog" />
      <DeleteDialog url="rentals" ref="deleteDialogRef"/>
    </q-page>
</template>

<script>
import RentalDialog from '../components/RentalDialog.vue'
import DeleteDialog from '../components/DeleteDialog.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    RentalDialog,
    DeleteDialog
  },
  mounted () {
    this.$store.dispatch('movies/fetch_data')
    this.$store.dispatch('users/fetch_data')
    this.$store.dispatch('rentals/fetch_data')
  },
  data () {
    return {
      columns: [
        {
          name: 'id',
          required: true,
          align: 'left',
          label: 'ID',
          field: 'id'
        },
        {
          name: 'user',
          required: true,
          label: 'User',
          align: 'left',
          // field: 'memberId',
          // format: val => `${val}`,
          sortable: true,
          field: (row) => {
            const user = this.getUsers.find(u => u.id === row.memberId)
            console.log('re', this.getRentals)
            return user ? user.title : '...'
          }
        },
        {
          name: 'movie',
          required: true,
          sortable: true,
          align: 'left',
          label: 'Movie',
          // field: 'movieId'
          field: (row) => {
            // console.log('rw', row.movieId)
            const movie = this.getMovies.find(m => m.id === row.movieId)
            return movie ? movie.title : '...'
          }
        },
        { name: 'rentalDate', align: 'center', label: 'Date of Rental', sortable: true, field: 'date' },
        { name: 'selectActions', align: 'center', label: 'Actions', sortable: true }
      ]
      // columns: [
      //   {
      //     name: 'id',
      //     required: true,
      //     label: 'ID',
      //     align: 'left',
      //     field: 'id',
      //     format: val => `${val}`,
      //     sortable: true
      //   },
      //   {
      //     name: 'movie',
      //     label: 'Movie',
      //     sortable: true,
      //     align: 'left',
      //     // field: (row) => {
      //     //   const movie = this.getMovies.find(m => m.id === row.movieId)
      //     //   return movie.title
      //     // }
      //     field: 'movieId'
      //   },
      //   {
      //     name: 'genres',
      //     label: 'Members',
      //     sortable: true,
      //     align: 'left',
      //     field: (row) => {
      //       const member = this.getUsers.find(m => m.id === row.memberId)
      //       return member.name
      //     }
      //   },
      //   { name: 'date', label: 'Date', field: 'date', align: 'left' },
      //   { name: 'actions', label: 'Actions', field: '', align: 'left' }
      // ]
    }
  },
  computed: {
    ...mapGetters({
      getMovies: 'movies/getAllItems',
      getUsers: 'users/getAllItems',
      getRentals: 'rentals/getAllItems'
    })
  }
}
</script>

<style>

</style>
