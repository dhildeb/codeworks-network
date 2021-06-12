import { AppState } from '../AppState'
import { api } from './AxiosService'

class ProfileService {
  async getProfileById(id) {
    const res = await api.get('api/profiles/' + id)
    AppState.activeProfile = res.data
  }

  async getProfilesByQuery(query) {
    const res = await api.get('api/profiles?query=' + query)
    console.log(res.data)
    AppState.profiles = res.data
    console.log(AppState.profiles)
  }

  async getProfilePosts(id) {
    const res = await api.get('api/profiles/' + id + '/posts')
    AppState.posts = res.data.posts
  }
}

export const profileService = new ProfileService()
