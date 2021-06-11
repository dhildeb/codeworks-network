<template>
  <div class="p-5 m-3 border shadow" v-if="state.post">
    Thread component
    <Post v-for="post in state.posts" :key="post.id" :post="post" />
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
      posts: computed(() => AppState.posts)
    })
    watchEffect(async() => {
      await postService.getPosts()
    })
    return {
      state
    }
  }
}
</script>

<style>

</style>
