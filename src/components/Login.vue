<template>
  <div class="bg-dark text-light p-5 h-100">
    <img :src="state.account.picture" alt="">
    <div v-if="state.account.graduated">
      <span>grad!</span>
      <span>{{ state.account.class }}</span>
    </div>
    <b>{{ state.account.name }}</b>
    <a>{{ state.account.github }}</a>
    <a>{{ state.account.linkedin }}</a>
    <a>{{ state.account.resume }}</a>
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

</style>
