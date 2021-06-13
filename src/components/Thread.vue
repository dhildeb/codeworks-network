<template>
  <h2 class="pt-5 text-center">
    Posts
  </h2>
  <div class="m-3">
    <Post v-for="post in state.posts" :key="post.id" :post="post" />
  </div>
  <div class="p-3 text-center" v-if="state.postPage">
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
import { computed, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { postService } from '../services/PostService'
export default {
  setup() {
    const state = reactive({
      posts: computed(() => AppState.posts),
      postPage: computed(() => AppState.postPage)
    })
    watchEffect(async() => {
      try {
        await postService.getPosts()
      } catch (error) {
        Notification.toast(error)
      }
    })
    return {
      state,
      async loadPage(n) {
        try {
          AppState.pageNum += n
          await postService.getPostsByPage(AppState.pageNum)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } catch (error) {
          Notification.toast(error)
        }
      }
    }
  }
}
</script>

<style>

</style>
