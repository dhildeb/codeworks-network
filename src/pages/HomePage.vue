<template>
  <div>
    <CreatePost v-if="state.account.id" />
    <Thread />
  </div>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import CreatePost from '../components/CreatePost.vue'
import { AppState } from '../AppState'
export default {
  components: { CreatePost },
  name: 'Home',
  setup() {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state
    }
  }
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
