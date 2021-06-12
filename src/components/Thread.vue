<template>
  <div class="p-5 m-3">
    <Post v-for="post in state.posts" :key="post.id" :post="post" />
  </div>
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
      await postService.getPosts()
    })
    return {
      state,
      async loadPage(n) {
        AppState.pageNum += n
        await postService.getPostsByPage(AppState.pageNum)
      }
    }
  }
}
</script>

<style>

</style>
