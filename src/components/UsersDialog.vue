<template>
    <q-dialog v-model="open">
      <q-layout view="Lhh lpR fff" container class="bg-white" style="height: 550px">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title>Add new user</q-toolbar-title>
            <q-btn flat round dense/>
          </q-toolbar>
        </q-header>
        <q-footer class="bg-black text-white ">
          <q-toolbar inset class="justify-end q-gutter-md">
              <q-btn  flat v-close-popup round dense icon="close" label="Cancel" @click="cancelAll()" />
              <q-btn color="red" text-color="black" label="Submit" @click="createOrEditUser()" />
          </q-toolbar>
        </q-footer>

        <q-page-container>
          <q-page padding class="q-gutter-md">
            <q-input filled v-model="userName" label="Full Name"
             style="width: 250px"
             :rules="[val => !!val || 'Field is required']"  />
            <q-input v-model="datebirth" filled type="date" hint="Date of Birth" :rules="[val => !!val || 'Enter valid birthdate']"/>
            <q-input v-model="dateRegi" filled type="date" hint="Date of Registration" :rules="[val => !!val || 'Enter valid date']"/>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
</template>

<script>
export default {
  name: 'UserDialog',
  data () {
    return {
      open: false,
      isEdited: false,
      userId: '',
      userName: '',
      datebirth: '',
      dateRegi: ''
    }
  },
  methods: {
    openDialog (payload = false) {
      console.log(payload)
      if (payload !== false) {
        this.userId = payload.id
        this.userName = payload.title
        this.datebirth = payload.DateOfBirth
        this.dateRegi = payload.Registration
        this.isEdited = true
      }
      this.open = true
    },
    createOrEditUser () {
      if (this.isEdited) {
        console.log('update')
        const data = { id: this.userId, title: this.userName, DateOfBirth: this.datebirth, Registration: this.dateRegi }
        const payload = { id: data.id, data: data }
        this.$store.dispatch('users/update_item', payload)
        this.cancelAll()
      } else {
        console.log('create')
        // const uID = Math.ceil(Math.random() * 100000000).toString()
        this.$store.dispatch('users/create_item', { title: this.userName, DateOfBirth: this.datebirth, Registration: this.dateRegi })
        this.cancelAll()
      }
    },
    cancelAll () {
      this.open = false
      this.userName = ''
      this.datebirth = null
      this.dateRegi = null
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
