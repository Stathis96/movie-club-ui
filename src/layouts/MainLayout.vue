<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Movie Club
        </q-toolbar-title>

        <q-btn
          v-if="getUser === null"
          flat
          icon="login"
          label="login"
          @click="login"
        />

        <q-btn
          v-if="getUser !== null"
          flat
          icon="logout"
          label="logout"
          @click="logout"
        />

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1"
    >
      <q-list>

        <!-- <q-card-section horizontal >
        <q-card-section class="q-pt-xs" v-if="getUser">
          <div class="text-overline">User</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ getUser.name }}</div>
          <div class="text-caption text-grey">
            {{ getUser.email}}
          </div>
        </q-card-section>
      </q-card-section> -->

        <q-card-section horizontal >
        <q-card-section class="q-pt-xs" v-if="this.user">
          <div class="text-overline">User</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ user.name }}</div>
          <div class="text-caption text-grey">
            {{ user.email}}
          </div>
        </q-card-section>
      </q-card-section>

      <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { authService } from 'src/boot/auth'

const linksList = [
  {
    title: 'Movies',
    caption: 'All Movies',
    icon: 'movie',
    link: 'movies'
  },
  {
    title: 'Users',
    caption: 'All Users',
    icon: 'people',
    link: 'users'
  },
  {
    title: 'Rental',
    caption: 'Your Movies',
    icon: 'save_alt',
    link: 'rentals'
  }
]

import { defineComponent, ref, onMounted } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser'
    })
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const user = ref({ name: '', email: '' })
    // const isUserLogged = ref(false)
    // todo user from store
    // const user = computed(() => localStorage.getItem('user'))

    onMounted(() => {
      authService.getProfile()
        .then((response) => {
          if (response === null) authService.login()
          user.value.name = response.name
          user.value.email = response.email
        })
        .catch(error => {
          console.log(error)
        })
    })

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      user,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  data () {
    return {
      homePage: '/'
    }
  },
  methods: {
    login () {
      authService.login()
    },
    logout () {
      authService.logout()
      // this.isUserLogged.value = !this.isUserLogged.value
    }
  }
})
</script>
