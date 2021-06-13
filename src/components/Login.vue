<template>
  <div class="bg-dark text-light p-5 h-100">
    <div class="stick">
      <div v-if="state.account.id">
        <img class="rounded-circle img-fluid profile-icon" :src="state.account.picture" alt="">
      </div>
      <div class="d-flex flex-column text-light">
        <div v-if="state.account.graduated">
          <span>grad!</span>
          <span>{{ state.account.class }}</span>
        </div>
        <b class="p-1 text-info pt-3">{{ state.account.name }}</b>
        <a class="p-1 text-info" :href="state.account.github" v-if="state.account.github">github</a>
        <a class="p-1 text-info" :href="state.account.linkedin" v-if="state.account.linkedin">linkedin</a>
        <a class="p-1 text-info" :href="state.account.resume" v-if="state.account.resume">resume</a>
      </div>
      <button
        class="btn btn-outline-danger my-5"
        @click="logout"
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
      account: computed(() => AppState.account)
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
  height: 50px;
  width: 50px;
  top: 240px;
}
.stick{
  position: fixed;
  left: 50px;
}

</style>
