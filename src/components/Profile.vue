<template>
  <div v-if="state.toggle">
    <EditProfile />
  </div>
  <div class="p-5 m-3 border shadow">
    <div>
      <img class="img-fluid banner" :src="state.activeProfile.coverImg" alt="">
      <div class="d-flex">
        <img class="img-fluid profile-icon rounded-circle" :src="state.activeProfile.picture" alt="">
        <div class="d-flex" v-if="state.activeProfile.graduated">
          <span>grad!</span>
          <span>{{ state.activeProfile.class }}</span>
        </div>
        <div class="d-flex flex-column">
          <b>{{ state.activeProfile.name }}</b>
          <a>github{{ state.activeProfile.github }}</a>
          <a>linkedin{{ state.activeProfile.linkedin }}</a>
          <a>resume{{ state.activeProfile.resume }}</a>
          <p>{{ state.activeProfile.bio }}</p>
        </div>
      </div>
    </div>
    <div v-if="state.account.id">
      <button class="btn btn-outline-info" @click="toggleEdit" v-if="state.account.id === state.activeProfile.id">
        edit
      </button>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      activeProfile: computed(() => AppState.activeProfile),
      toggle: false
    })
    return {
      state,
      toggleEdit() {
        state.toggle = !state.toggle
        console.log(state.toggle)
      }
    }
  }
}
</script>

<style>
.profile-icon{
  height: 50px;
  width: 50px;
}
.banner{
  height: 40vh;
}
</style>
