<template>
  <div class="p-5 m-3 border shadow">
    <img class="img-fluid profile-icon mb-3 rounded-circle" :src="state.account.picture" alt="">
    <form class="" @submit.prevent="createPost" v-if="state.account">
      <div class="form-group" src="message">
        <textarea class="form-control border-0" rows="4" id="body" placeholder="Share your thoughts" v-model="state.body">
        </textarea>
      </div>
      <div class="form-group border-0" src="image url">
        <input type="text rounded" id="imgUrl" placeholder="image url" v-model="state.imgUrl">
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
import Notification from '../utils/Notification'
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
        try {
          const post = {
            body: state.body,
            imgUrl: state.imgUrl
          }
          postService.createPost(post)
          state.body = ''
          state.imgUrl = ''
        } catch (error) {
          Notification.toast(error)
        }
      }
    }
  }
}
</script>

<style scoped>
input{
    border: 0px;
    padding: .5rem;
}
</style>
