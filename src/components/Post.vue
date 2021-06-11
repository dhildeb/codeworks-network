<template>
  <div class="border shadow">
    <div>
      <img class="img-fluid" :src="post.imgUrl" alt="no img">
      <p>
        {{ post.body }}
      </p>
    </div>
    <div class="d-flex justify-content-between">
      <div>
        <img class="profile-icon rounded-circle" v-if="post.creator" :src="post.creator.picture" alt="">
        <span>{{ post.creator.name }}</span>
      </div>
      <i>likes: {{ post.likes.length }}</i>
    </div>
  </div>
</template>

<script>

export default {
  props: { post: { type: Object, required: true } },
  setup() {
    return {

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
