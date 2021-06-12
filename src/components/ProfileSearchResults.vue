<template>
  <router-link :to="{name: 'Profile', params: {id: profile._id}}">
    <div class="d-flex align-items-center">
      <img class="img-fluid profile-icon rounded-circle m-3" :src="profile.picture" alt="">
      <div class="d-flex" v-if="profile.graduated">
        <span>grad!</span>
        <span>{{ profile.class }}</span>
      </div>
      <div class="d-flex flex-column">
        <b>{{ profile.name }}</b>
      </div>
    </div>
  </router-link>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  props: { profile: { type: Object, required: true } },
  setup() {
    const state = reactive({

    })
    return {
      state
    }
  }
}
</script>

<style>

</style>
