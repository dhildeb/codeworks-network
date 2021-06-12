import { AppState } from '../AppState'
import { api } from './AxiosService'

class ProfileService {
  async getProfileById(id) {
    const res = await api.get('api/profiles/' + id)
    AppState.activeProfile = res.data
  }

  async getProfilesByQuery(query) {
    const res = await api.get('api/profiles?query=' + query)
    AppState.profiles = res.data
  }

  async getProfilePosts(id) {
    const res = await api.get('api/profiles/' + id + '/posts')
    AppState.posts = res.data.posts
  }

  async editProfile(id, profileData) {
    // const res = await api.put('api/profiles/' + id, profileData)
    // console.log(res.data)
    // AppState.account = res.data
    console.log(AppState.account)
    profileData.id = id
    AppState.account = profileData
    console.log(AppState.account)
  }
}

export const profileService = new ProfileService()
