<template>
  <div class="row p-5 border shadow m-3" v-if="state.toggle">
    <EditProfile />
    <div class="col-9"></div>
    <button class="btn btn-outline-danger" @click="toggleEdit">
      cancel
    </button>
  </div>
  <div class="m-3 border shadow" v-else>
    <img class="img-fluid banner" :src="state.activeProfile.coverImg" alt="">
    <div class="d-flex px-3 py-5">
      <img class="img-fluid position-absolute profile-icon rounded-circle" :src="state.activeProfile.picture" alt="">
      <div class="d-flex position-absolute grad" v-if="state.activeProfile.graduated">
        <span>grad!</span>
        <span>{{ state.activeProfile.class }}</span>
      </div>
      <div class="d-flex flex-column">
        <b>{{ name }}</b>
        <a :href="state.activeProfile.github" v-if="state.activeProfile.github">github</a>
        <a :href="state.activeProfile.linkedin" v-if="state.activeProfile.linkedin">linkedin</a>
        <a :href="state.activeProfile.resume" v-if="state.activeProfile.resume">resume</a>
        <p>{{ state.activeProfile.bio }}</p>
      </div>
    </div>
    <div v-if="state.account.id">
      <button class="btn btn-outline-info m-3" @click="toggleEdit" v-if="state.account.id === state.activeProfile.id">
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
      toggle: computed(() => AppState.profileFormToggle)
    })
    return {
      state,
      toggleEdit() {
        AppState.profileFormToggle = !state.toggle
        console.log(state.account.id)
      },
      name: computed(() => {
        // return AppState.activeProfile.name.split('@')
        return AppState.activeProfile.name
      })
    }
  }
}
</script>

<style>
.profile-icon{
  height: 50px;
  width: 50px;
  top: 240px;
}
.banner{
  height: 40vh;
}
.grad{
  left: 300px;
  top: 275px;
}
</style>
