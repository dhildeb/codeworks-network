<template>
  <div class="profile  flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <Profile />
  </div>
  <div v-if="state.account.id === state.activeProfile.id">
    <CreatePost />
  </div>
  <Post v-for="post in state.posts" :key="post.id" :post="post" />
</template>

<script>
import { reactive } from '@vue/reactivity'
import { AppState } from '../AppState'
import { computed, watchEffect } from '@vue/runtime-core'
import { profileService } from '../services/ProfileService'
import { useRoute } from 'vue-router'

export default {
  name: 'ProfilePage',
  setup() {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      posts: computed(() => AppState.posts),
      activeProfile: computed(() => AppState.activeProfile)
    })
    watchEffect(() => {
      profileService.getProfileById(route.params.id)
      profileService.getProfilePosts(route.params.id)
    })
    return {
      state
    }
  }
}
</script>
