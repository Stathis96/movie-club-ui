<template>
    <q-dialog v-model="open" @hide="onCancel()">
      <q-layout view="Lhh lpR fff" container class="bg-white" style="height: 500px">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title>{{type}} Rental</q-toolbar-title>
          </q-toolbar>
        </q-header>
        <q-footer class="bg-white text-white">
          <q-toolbar inset>
            <q-toolbar-title></q-toolbar-title>
            <div>
              <q-form @submit="onSubmit" @reset="onCancel" class="q-gutter-md">
                <q-btn
                  v-close-popup
                  color="primary"
                  text-color="black"
                  flat
                  class="bg-white"
                  label="Cancel"
                  type="reset"
                />
                <q-btn
                  color="primary"
                  text-color="black"
                  label="Submit"
                  type="submit"
                />
              </q-form>
            </div>
          </q-toolbar>
        </q-footer>
        <q-page-container>
          <q-page padding class="q-gutter-md q-pa-md">
             <q-select
              filled
              v-model="memberId"
              :options="getUsers"
              option-label="title"
              option-value="id"
              emit-value
              map-options
              label="Member"
              :rules="[val => !!val || 'Field is required']"
            />
            <q-select
              filled
              v-model="movieId"
              :options="getMovies"
              option-label="title"
              option-value="id"
              emit-value
              map-options
              label="Movies"
              :rules="[val => !!val || 'Field is required']"
            />
            <q-input
              filled
              label="Date of rental"
              v-model="date"
              mask="date"
              :rules="[val => !!val || 'Enter valid rental date']"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="date" minimal>
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'rentalsDialog',
  data () {
    return {
      open: false,
      isEdit: false,
      type: 'Add',
      memberId: '',
      movieId: '',
      date: '',
      id: ''
    }
  },
  methods: {
    openDialog (payload = false) {
      console.log('asdsa')
      console.log(payload)
      if (payload) {
        console.log('payload', payload)
        this.id = payload.id
        this.movieId = payload.movieId
        this.memberId = payload.memberId
        this.date = payload.date
        this.isEdit = true
        this.type = 'Edit'
      }
      this.open = true
    },
    onSubmit () {
      if (this.isEdit) {
        this.editRental()
      } else {
        this.addRental()
      }
    },
    addRental () {
      // this.id = Math.floor(Math.random() * 100000)
      const data = {
        // id: this.id,
        movieId: this.movieId,
        memberId: this.memberId,
        date: this.date
      }
      this.$store.dispatch('rentals/create_item', data)
      this.onCancel()
    },
    editRental () {
      const data = {
        id: this.id,
        movieId: this.movieId,
        memberId: this.memberId,
        date: this.date
      }
      const payload = {
        id: this.id,
        data: data
      }
      this.$store.dispatch('rentals/update_item', payload)
      this.onCancel()
    },
    onCancel () {
      this.open = false
      this.id = ''
      this.movieId = ''
      this.memberId = ''
      this.date = ''
      this.isEdit = false
      this.type = 'Add'
    }
  },
  computed: {
    ...mapGetters({
      getUsers: 'users/getAllItems',
      getMovies: 'movies/getAllItems'
    })
  }
}
</script>

<style>

</style>
