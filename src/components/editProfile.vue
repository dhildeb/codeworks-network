<template>
  <form class="col-12" @submit.prevent="editProfile">
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <input type="text" placeholder="cover image url" v-model="state.profileData.coverImg">
        </div>
        <div class="form-group">
          <input type="text" placeholder="profile image url" v-model="state.profileData.picture">
        </div>
        <div class="form-group">
          <input type="number" minlength="4" maxlength="4" placeholder="attended class" v-model="state.profileData.class">
        </div>
        <div class="form-group">
          <input type="checkbox" v-model="state.profileData.graduated">
          <label class="p-3">graduated</label>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <input type="text" placeholder="github url" v-model="state.profileData.github">
        </div>
        <div class="form-group">
          <input type="text" placeholder="linkedin url" v-model="state.profileData.linkedin">
        </div>
        <div class="form-group">
          <input type="text" placeholder="resume url" v-model="state.profileData.resume">
        </div>
      </div>
      <textarea class="form-group col-12" rows="5" type="text" placeholder="tell us about yourself" v-model="state.profileData.bio">
      </textarea>
    </div>
    <button class="btn btn-outline-success" type="submit">
      submit changes
    </button>
  </form>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { AppState } from '../AppState'
import { profileService } from '../services/ProfileService'
import { computed } from '@vue/runtime-core'
export default {
  setup() {
    const state = reactive({
      profileData: {
        coverImg: AppState.activeProfile.coverImg,
        picture: AppState.activePost.picture,
        class: AppState.activePost.class,
        graduated: AppState.activeProfile.graduated,
        github: AppState.activeProfile.github,
        linkedin: AppState.activeProfile.linkedin,
        resume: AppState.activeProfile.resume,
        bio: AppState.activeProfile.bio
      },
      account: computed(() => AppState.account)
    })
    return {
      state,
      editProfile() {
        profileService.editProfile(state.account.id, state.profileData)
        AppState.profileFormToggle = false
      }
    }
  }
}
</script>

<style scoped>

</style>
