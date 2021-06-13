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
    AppState.postPage = res.data
  }

  async queryProfilePosts(id, query) {
    const res = await api.get('api/profiles/' + id + '/posts?page=' + query)
    AppState.posts = res.data.posts
    AppState.postPage = res.data
  }

  async editProfile(id, profileData) {
    const res = await api.put('api/profiles/' + id, profileData)
    AppState.account = res.data
  }
}

export const profileService = new ProfileService()
