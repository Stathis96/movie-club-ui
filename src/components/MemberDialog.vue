<template>
    <q-dialog v-model="open" >
      <q-layout view="Lhh lpR fff" container class="bg-white" style="height: 600px">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title>Add new Member</q-toolbar-title>
          </q-toolbar>
        </q-header>

        <q-footer class="bg-black text-white">
          <q-toolbar inset>
            <q-toolbar-title></q-toolbar-title>
            <div>
              <q-form @submit="addMovie" @reset="onCancel">
                <q-btn
                  v-close-popup
                  color="primary"
                  text-color="black"
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
          <q-page class="q-gutter-md">
            <q-input
              filled
              v-model="newMemberName"
              label="Name"
            />
            <q-input filled label="Member's Birth Date" v-model="newMemberDateOfBirth" mask="date" :rules="[val && val.length > 0 || 'Enter birth date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="newMemberDateOfBirth" minimal>
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input filled label="Member's Registration Date" v-model="newMemberDateOfRegistration" mask="date" :rules="[val && val.length > 0 || 'Enter birth date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="newMemberDateOfRegistration" minimal>
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
export default {
  name: 'moviesDialog',
  data () {
    return {
      open: false,
      newMemberID: '',
      newMemberName: '',
      newMemberDateOfBirth: '',
      newMemberDateOfRegistration: ''
    }
  },
  methods: {
    openDialog () {
      this.open = true
    },
    addMovie () {
      this.onCancel()
    },
    onCancel () {
      this.open = false
      this.newMemberID = ''
      this.newMemberName = ''
      this.newMemberDateOfBirth = ''
      this.newMemberDateOfRegistration = null
    }
  }
}
</script>

<style>

</style>
