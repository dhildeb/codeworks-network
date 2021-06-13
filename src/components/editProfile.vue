<template>
  <h2>Update Your Profile</h2>
  <form class="col-12 p-3" @submit.prevent="editProfile">
    <div class="row">
      <div class="col-6">
        <h5>banner image</h5>
        <div class="form-group">
          <input type="text" v-model="state.profileData.coverImg">
        </div>
        <h5>profile picture</h5>
        <div class="form-group">
          <input type="text" v-model="state.profileData.picture">
        </div>
        <h5>class attended</h5>
        <div class="form-group">
          <input type="number" minlength="4" maxlength="4" v-model="state.profileData.class">
        </div>
        <div class="form-group">
          <input type="checkbox" v-model="state.profileData.graduated">
          <label class="p-3">
            graduated
          </label>
        </div>
      </div>
      <div class="col-6">
        <h5>github link</h5>
        <div class="form-group">
          <input type="text" v-model="state.profileData.github">
        </div>
        <h5>linkedin link</h5>
        <div class="form-group">
          <input type="text" v-model="state.profileData.linkedin">
        </div>
        <h5>resume link</h5>
        <div class="form-group">
          <input type="text" v-model="state.profileData.resume">
        </div>
      </div>
      <textarea class="form-group col-12" rows="5" type="text" placeholder="tell us about yourself" v-model="state.profileData.bio">
      </textarea>
    </div>
    <button class="btn btn-success" type="submit">
      submit changes
    </button>
  </form>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { AppState } from '../AppState'
import { computed } from '@vue/runtime-core'
import Notification from '../utils/Notification'
import { accountService } from '../services/AccountService'
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
        try {
          accountService.editProfile(state.profileData)
          AppState.profileFormToggle = false
        } catch (error) {
          Notification.toast(error)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
