<template>
  <div class="profile  flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <Profile />
  </div>
  <div v-if="state.account.id === state.activeProfile.id">
    <CreatePost />
  </div>
  <Post v-for="post in state.posts" :key="post.id" :post="post" />
  <div class="p-3" v-if="state.postPage">
    <span>
      {{ state.postPage.page }}
    </span>
    <div>
      <button class="btn btn-outline-secondary mx-5" @click="loadPage(-1)" v-if="state.postPage.newer">
        previous posts
      </button>
      <button class="btn btn-outline-secondary mx-5" @click="loadPage(1)" v-if="state.postPage.older">
        more posts
      </button>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { AppState } from '../AppState'
import { computed, watchEffect } from '@vue/runtime-core'
import { profileService } from '../services/ProfileService'
import { useRoute } from 'vue-router'
import Notification from '../utils/Notification'
import { postService } from '../services/PostService'

export default {
  name: 'ProfilePage',
  setup() {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      posts: computed(() => AppState.posts),
      activeProfile: computed(() => AppState.activeProfile),
      postPage: computed(() => AppState.postPage)
    })
    watchEffect(async() => {
      try {
        if (route.params.id) {
          await profileService.getProfileById(route.params.id)
        }
      } catch (error) {
        Notification.toast(error)
      }
      try {
        if (route.params.id) {
          await profileService.getProfilePosts(route.params.id)
        }
      } catch (error) {
        Notification.toast(error)
      }
    })
    return {
      state,
      async loadPage(n) {
        // try {
        //   AppState.pageNum += n
        //   await profileService.queryProfilePosts(route.params.id, AppState.pageNum)
        //   console.log(AppState.pageNum)
        //   window.scrollTo({ top: 0, behavior: 'smooth' })
        // } catch (error) {
        //   Notification.toast(error)
        // }
        try {
          AppState.pageNum += n
          await postService.searchPosts(route.params.id, AppState.pageNum)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } catch (error) {
          Notification.toast(error)
        }
      }
    }
  }
}
</script>
