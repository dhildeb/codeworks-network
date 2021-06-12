<template>
  <div class="profile  flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <Profile />
    <div v-if="state.account.id">
      <CreatePost v-if="state.account.id === AppState.user.id" />
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { AppState } from '../AppState'
import { computed, watchEffect } from '@vue/runtime-core'
export default {
  name: 'ProfilePage',
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user)
    })
    watchEffect(() => {
      console.log(AppState.user)
    })
    return {
      state
    }
  }
}
</script>
