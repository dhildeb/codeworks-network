<template>
  <div class="border shadow my-5 rounded p-3">
    <button class="btn btn-outline-danger" @click="deletePost" v-if="state.account.id">
      delete
    </button>
    <div class="d-flex justify-content-between p-3 bg-gradient-info">
      <router-link :to="{name: 'Profile', params: {id: post.creator.id}}">
        <img class="profile-icon rounded-circle mr-3" v-if="post.creator" :src="post.creator.picture" alt="">
        <span class="text-dark">{{ post.creator.name }}</span>
      </router-link>
    </div>
    <div>
      <p class="p-3">
        {{ post.body }}
      </p>
      <img class="img-fluid" :src="post.imgUrl" alt="no img">
    </div>
    <i class="align-item-end" @click="like">likes: {{ post.likes.length }}</i>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { postService } from '../services/PostService'
import Notification from '../utils/Notification'
import { AppState } from '../AppState'
import { computed } from '@vue/runtime-core'

export default {
  props: { post: { type: Object, required: true } },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state,
      async deletePost() {
        if (await Notification.confirmAction('are you sure you want to delete this post?')) {
          const res = await postService.deletePost(props.post.id)
          Notification.toast(res)
        } else {
          Notification.toast('successful avoided delete', 'success')
        }
      },
      async like() {
        try {
          const res = await postService.likePost(props.post.id, state.account.id)
          Notification.toast('you successfully ' + res + ' this post', 'success')
        } catch (error) {
          Notification.toast('log in to like')
        }
      }
    }
  }
}
</script>

<style scoped>
.profile-icon{
  height: 50px;
  width: 50px;
}
</style>
