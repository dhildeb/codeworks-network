import { api } from './AxiosService'

class ProfileService {
  async getProfileById(id) {
    const res = api.get('api/profiles/' + id)
    console.log(res)
  }

  async getProfilesByQuery(query) {
    const res = api.get('api/profiles?query=' + query)
    console.log(res)
  }

  async getProfilePosts(id) {
    const res = api.get('api/profiles/' + id + '/posts')
    console.log(res)
  }
}

export const profileService = new ProfileService()
