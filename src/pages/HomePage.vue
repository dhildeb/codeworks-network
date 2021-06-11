<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <CreatePost />
    <Thread />
  </div>
</template>

<script>
import CreatePost from '../components/CreatePost.vue'
export default {
  components: { CreatePost },
  name: 'Home'
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
