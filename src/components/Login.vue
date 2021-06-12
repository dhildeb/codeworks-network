<template>
  <div class="bg-dark text-light p-5 h-100">
    <img class="rounded-circle img-fluid" :src="state.account.picture" alt="">
    <div v-if="state.account.graduated">
      <span>grad!</span>
      <span>{{ state.account.class }}</span>
    </div>
    <b>{{ state.account.name }}</b>
    <a>{{ state.account.github }}</a>
    <a>{{ state.account.linkedin }}</a>
    <a>{{ state.account.resume }}</a>
    <button
      class="btn btn-outline-danger my-5 m-3"
      @click="logout"
    >
      logout
    </button>
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
      account: computed(() => AppState.account)
    })
    return {
      state,
      async logout() {
        if (await Notification.confirmAction('are you sure you want to logout?')) {
          AuthService.logout({ returnTo: window.location.origin })
          Notification.toast('you have logged out')
        }
      }
    }
  }
}
</script>

<style>

</style>
