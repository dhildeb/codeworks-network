<template>
  <div class="border text-end shadow rounded m-5 pb-3">
    <!-- {{ state.post }} -->
    <div class="d-flex justify-content-between p-3 bg-gradient-info">
      <router-link :to="{name: 'Profile', params: {id: state.post[0].creatorId}}">
        <img class="profile-icon rounded-circle mr-3" v-if="state.post[0].creator" :src="state.post[0].creator.picture" alt="">
        <span class="text-dark">{{ state.post[0].creator.name }}</span>
      </router-link>
      <h2 class="dropdown click" v-if="state.account.id === state.post[0].creatorId" title="options">
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
    <div class="text-center pt-1">
      <span>{{ state.date[0] }}</span>
      <p class="p-3">
        {{ state.post[0].body }}
      </p>
      <img class="img-fluid" :src="state.post[0].imgUrl" alt="bad img" v-if="state.post[0].imgUrl">
    </div>
    <i class="click p-3 fa fa-heart-o text-pink" aria-hidden="true" :title="state.post[0].likes[0] ? state.post[0].likes[0].name : 'no love'" @click="like">:{{ state.post[0].likes.length }}</i>
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
      account: computed(() => AppState.account),
      post: computed(() => AppState.posts.filter(p => p._id === props.post._id)),
      date: props.post.createdAt.split('T')
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
