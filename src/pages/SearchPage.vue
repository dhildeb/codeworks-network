<template>
  <div class="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <form @submit.prevent="search">
      <input type="text" id="query" placeholder="Enter Search Here" v-model="state.query">
      <button class="btn btn-outline-info">
        Search
      </button>
    </form>
    <ProfileSearchResults v-for="profile in state.profiles" :key="profile.id" :profile="profile" />
    <div> </div>
    <Post v-for="post in state.posts" :key="post.id" :post="post" />
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { profileService } from '../services/ProfileService'
import { postService } from '../services/PostService'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    const state = reactive({
      query: null,
      profiles: computed(() => AppState.profiles),
      posts: computed(() => AppState.posts)
    })
    onMounted(() => {
      AppState.posts = []
    })
    return {
      state,
      search() {
        profileService.getProfilesByQuery(state.query)
        postService.SearchPosts(state.query)
      }
    }
  }
}
</script>

<style>

</style>
