<template>
  <form @submit.prevent="editProfile">
    <div class="form-group bg-danger">
      <input type="text" placeholder="cover image url" v-model="state.profileData.coverImg">
    </div>
    <button class="btn btn-outline-info" type="submit">
      submit changes
    </button>
  </form>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    const state = reactive({
      profileData: {
        coverImg: computed(() => AppState.activeProfile.coverImg)
      }
    })
    return {
      state,
      editProfile() {
        console.log(state.profileData)
      }
    }
  }
}
</script>

<style scoped>

</style>
