<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <h1>Network</h1>
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link :to="{ name: 'Home' }" class="nav-link">
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'Profile', params: {id: state.account.id} }" class="nav-link" v-if="state.account.id">
            Profile
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'Search' }" class="nav-link">
            Search Page
          </router-link>
        </li>
      </ul>
      <form @submit.prevent="search">
        <input type="text" id="query" placeholder="Enter Search Here" v-model="state.query">
        <button class="btn btn-outline-info" type="submit">
          Search
        </button>
      </form>
      <span class="navbar-text ml-5">
        <button
          class="btn btn-outline-primary text-uppercase"
          @click="login"
          v-if="!user.isAuthenticated"
        >
          Login
        </button>

        <div class="dropdown" v-else>
          <div
            class="dropdown-toggle"
            @click="state.dropOpen = !state.dropOpen"
          >
            <img
              :src="user.picture"
              alt="user photo"
              height="40"
              class="rounded-circle"
            />
            <span class="mx-3">{{ user.name }}</span>
          </div>
          <div
            class="dropdown-menu p-0 list-group w-100"
            :class="{ show: state.dropOpen }"
            @click="state.dropOpen = false"
          >
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item list-group-item-action hoverable">
                Account
              </div>
            </router-link>
            <div
              class="list-group-item list-group-item-action hoverable"
              @click="logout"
            >
              logout
            </div>
          </div>
        </div>
      </span>
    </div>
  </nav>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
import Notification from '../utils/Notification'
import { useRouter } from 'vue-router'
export default {
  name: 'Navbar',
  setup() {
    const state = reactive({
      query: '',
      dropOpen: false,
      account: computed(() => AppState.account),
      router: useRouter()
    })
    return {
      state,
      user: computed(() => AppState.user),
      async login() {
        try {
          AuthService.loginWithPopup()
        } catch (error) {
          Notification.toast(error)
        }
      },
      async logout() {
        try {
          AuthService.logout({ returnTo: window.location.origin })
        } catch (error) {
          Notification.toast(error)
        }
      },
      search() {
        AppState.search = state.query
        state.router.push({ name: 'Search' })
        state.query = ''
      }
    }
  }
}
</script>

<style scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--primary);
}
</style>
