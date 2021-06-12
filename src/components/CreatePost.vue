<template>
  <div class="p-5 m-3 border shadow">
    <form class="" @submit.prevent="createPost" v-if="state.account">
      <label>Create Posts</label>
      <div class="form-group" src="message">
        <input type="text" id="body" placeholder="message" v-model="state.body">
      </div>
      <div class="form-group" src="image url">
        <input type="text" id="imgUrl" placeholder="image url" v-model="state.imgUrl">
      </div>
      <button type="submit" class="btn btn-transparent border-info text-info">
        create post
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { postService } from '../services/PostService'
export default {
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      body: '',
      imgUrl: ''
    })
    return {
      state,
      createPost() {
        const post = {
          body: state.body,
          imgUrl: state.imgUrl
        }
        postService.createPost(post)
        state.body = ''
        state.imgUrl = ''
      }
    }
  }
}
</script>

<style>

</style>
