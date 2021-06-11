<template>
  <div class="p-5 m-3 border shadow">
    Profile Component
    <div>
      <img class="img-fluid banner" :src="state.account.coverImg" alt="">
      <div>
        <img :src="state.account.picture" alt="">
        <div class="d-flex" v-if="state.account.graduated">
          <span>grad!</span>
          <span>{{ state.account.class }}</span>
          <b>{{ state.account.name }}</b>
          <a>github{{ state.account.github }}</a>
          <a>linkedin{{ state.account.linkedin }}</a>
          <a>resume{{ state.account.resume }}</a>
        </div>
        <p>{{ state.account.bio }}</p>
      </div>
    </div>
    <button class="btn btn-transparent text-info">
      edit
    </button>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state
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
