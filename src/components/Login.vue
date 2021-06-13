<template>
  <div class="bg-dark text-light p-5 h-100">
    <div class="stick">
      <router-link :to="{name: 'Profile', params: { id: state.account.id}}"
                   v-if="state.account.id"
      >
        <div class="text-center text-light" v-if="state.account.graduated">
          <i class="fa fa-graduation-cap fa-2x position-absolute pr-3" aria-hidden="true"></i>
        </div>
        <img class="rounded-circle profile-icon img-fluid" :src="state.account.picture" alt="">
      </router-link>
      <div class="d-flex flex-column text-light">
        <span>{{ state.account.class }}</span>
        <b class="p-1 text-info pt-3">{{ state.name[0] }}</b>
        <a class="p-1 text-info" :href="state.account.github" v-if="state.account.github">github</a>
        <a class="p-1 text-info" :href="state.account.linkedin" v-if="state.account.linkedin">linkedin</a>
        <a class="p-1 text-info" :href="state.account.resume" v-if="state.account.resume">resume</a>
      </div>
      <button
        class="btn btn-outline-danger my-5"
        @click="logout"
        v-if="state.account.id"
      >
        logout
      </button>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import Notification from '../utils/Notification'
export default {
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      name: AppState.account.name.split('@')
    })
    return {
      state,
      async logout() {
        if (await Notification.confirmAction('are you sure you want to logout?')) {
          try {
            AuthService.logout({ returnTo: window.location.origin })
            Notification.toast('you have logged out')
          } catch (error) {
            Notification.toast(error)
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.profile-icon{
  height: 125px;
  width: 125px;
}
.stick{
  position: fixed;
  left: 50px;
}
.fa{
  left: 0;
}
</style>
