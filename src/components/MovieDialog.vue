<template>
    <q-dialog v-model="open">
      <q-layout view="Lhh lpR fff" container class="bg-white" style="height: 550px">

        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title>{{ movieID.length > 0 ? 'Edit' : 'Add'}} movie</q-toolbar-title>
            <q-btn flat round dense/>
          </q-toolbar>
        </q-header>

        <q-footer class="bg-black text-white ">
          <q-toolbar inset class="justify-end q-gutter-md">
              <q-btn  flat v-close-popup round dense icon="close" label="Cancel" @click="cancelAll()" />
              <q-btn color="red" text-color="black" label="Submit" @click="createOrEditMovie()" />
          </q-toolbar>
        </q-footer>

        <q-page-container>
          <q-page padding class="q-gutter-md">
            <q-input filled v-model="movieName" label="Movie Title" style="width: 250px" :rules="[val => !!val || 'Field is required']"  />
            <q-select
              filled
              use-chips
              use-input
              v-model="selectedGenres"
              multiple
              :options="options"
              label="Select Genres"
              style="width: 250px"
            />
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
</template>

<script>
export default {
  name: 'MovieDialog',
  data () {
    return {
      open: false,
      selectedGenres: null,
      movieName: null,
      movieID: '',
      options: ['Action', 'Sci-fi', 'Romantic', 'Adventure', 'Comedy', 'Drama']
    }
  },
  methods: {
    openDialog (payload = false) {
      console.log(payload)
      if (payload !== false) {
        console.log('explain what is up')
        console.log('mpainei pote edw mesa?')
        this.movieName = payload.title
        this.selectedGenres = payload.genres
        this.movieID = payload.id
      }
      this.open = true
    },
    createOrEditMovie () {
      if (this.movieID.length > 0) {
        console.log('openeddialog')
        const data = { id: this.movieID, title: this.movieName, genres: this.selectedGenres }
        const payload = { id: data.id, data: data }
        this.$store.dispatch('movies/update_item', payload)
        this.cancelAll()
      } else {
        // const mID = Math.ceil(Math.random() * 1000).toString()
        this.$store.dispatch('movies/create_item', { title: this.movieName, genres: this.selectedGenres })
        this.cancelAll()
      }
    },
    cancelAll () {
      this.open = false
      this.movieName = ''
      this.selectedGenres = null
      this.movieID = ''
    }
    // deleteMovie (id) {
    //   this.$store.dispatch('movies/delete_item', id)
    // }
  }

}

</script>

<style lang="scss" scoped>

</style>
