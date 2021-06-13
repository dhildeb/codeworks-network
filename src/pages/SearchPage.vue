<template>
  <div class="flex-grow-1 d-flex flex-column align-items-center justify-content-center full-view">
    <form @submit.prevent="search">
      <input type="text" id="query" placeholder="Enter Search Here" v-model="state.query">
      <button class="btn btn-info">
        Search
      </button>
    </form>
    <ProfileSearchResults class="border shadow box m-1" v-for="profile in state.profiles" :key="profile.id" :profile="profile" />
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
      query: AppState.search,
      profiles: computed(() => AppState.profiles),
      posts: computed(() => AppState.posts)
    })
    onMounted(() => {
      AppState.posts = []
      AppState.activeProfile = {}
      AppState.profiles = []
    })
    return {
      state,
      search() {
        let search = ''
        state.query ? search = state.query : search = AppState.search
        try {
          profileService.getProfilesByQuery(search)
        } catch (error) {
          Notification.toast(error)
        }
        try {
          postService.SearchPosts(search)
        } catch (error) {
          Notification.toast(error)
        }
      }
    }
  }
}
</script>

<style>
.full-view{
  min-height: 100vh;
}
.box{
  width: 75vh;
}
</style>
