<template>
  <div class="border shadow rounded m-5 pb-3">
    <div class="d-flex justify-content-between p-3 bg-gradient-info">
      <router-link :to="{name: 'Profile', params: {id: post.creator.id}}">
        <img class="profile-icon rounded-circle mr-3" v-if="post.creator" :src="post.creator.picture" alt="">
        <span class="text-dark">{{ post.creator.name }}</span>
      </router-link>
      <h2 class="dropdown click" v-if="state.account.id === post.creator.id" title="options">
        <h1 class="text-dark"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
        >
          ...
        </h1>
        <div class="dropdown-menu text-center" aria-labelledby="dropdownMenuButton">
          <i class="text-danger" @click="deletePost">
            delete
          </i>
        </div>
      </h2>
    </div>
    <div class="text-center">
      <span>{{ post.createdAt }}</span>
      <p class="p-3">
        {{ post.body }}
      </p>
      <img class="img-fluid" :src="post.imgUrl" alt="bad img" v-if="post.imgUrl">
    </div>
    <i class="justify-content-end click p-3 fa fa-heart-o text-pink" aria-hidden="true" :title="post.likes" @click="like">:{{ post.likes.length }}</i>
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

<style scoped lang="scss">
.profile-icon{
  height: 50px;
  width: 50px;
}
.click{
  cursor: pointer;
}
.text-pink{
  color: rgb(236, 56, 86);
}
</style>
