<template>
 <q-page padding>
   <div class="row justify-between flex-center">
    <span>
      <h3>Users</h3>
    </span>
    <div>
      <q-btn color="brown-5" icon="add" label="Add User" @click="$refs.userDialogRef.openDialog()" />
    </div>
   </div>
   <div class="q-pa-md">
      <q-table
        :rows="getUsers"
        :columns="columns"
        row-key="name"
      >
      <template v-slot:body-cell-selectActions="props">
          <q-td class="flex flex-center">
            <q-btn color="primary" icon="settings" >
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup @click="$refs.userDialogRef.openDialog(props.row)">
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
   <UsersDialog ref="userDialogRef"/>
   <DeleteDialog url="users" ref="deleteDialogRef"/>
 </q-page>
</template>

<script>
import UsersDialog from '../components/UsersDialog.vue'
import DeleteDialog from '../components/DeleteDialog.vue'

import { mapGetters } from 'vuex'

export default {
  components: {
    UsersDialog,
    DeleteDialog
  },
  data () {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Id',
          align: 'center',
          field: row => row.id,
          sortable: true
        },
        { name: 'name', align: 'center', label: 'FullName', field: 'title', sortable: true },
        { name: 'dob', align: 'center', label: 'DateOfBirth', field: 'DateOfBirth', sortable: true },
        { name: 'registration', align: 'center', label: 'Registration', field: 'Registration', sortable: true },
        { name: 'selectActions', align: 'center', label: 'Actions', sortable: true }

      ]
      // data: [
      //   { id: '101', title: 'Stathis Ioannidis', DateOfBirth: '14/02/1996', Registration: '07/07/2021' },
      //   { id: '201', title: 'Nikos Nikolaidis', DateOfBirth: '04/08/1994', Registration: '06/06/2021' },
      //   { id: '301', title: 'Giorgos Georgiou', DateOfBirth: '20/04/1992', Registration: '05/05/2021' },
      //   { id: '401', title: 'Tasos Papadopoulos', DateOfBirth: '14/06/1990', Registration: '04/04/2021' }
      // ]
    }
  },
  methods: {},
  computed: {
    ...mapGetters({
      getUsers: 'users/getAllItems'
    })
  },
  mounted () {
    this.$store.dispatch('users/fetch_data')
  }

}

</script>

<style lang="scss" scoped>

</style>
