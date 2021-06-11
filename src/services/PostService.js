import { AppState } from '../AppState'
import { api } from './AxiosService'

class PostService {
  async getPosts() {
    const res = await api.get('api/posts')
    AppState.posts = res.data.posts
    console.log(AppState.posts)
  }

  async SearchPosts(query = {}) {
    const res = await api.get('api/posts?query=' + query)
    console.log(res)
  }

  async getPostsByPage(pageNum) {
    const res = await api.get('api/posts?page=' + pageNum)
    console.log(res)
  }

  async getPostsById(id) {
    const res = await api.get('api/posts/' + id)
    console.log(res)
  }

  async createPost(postData) {
    const res = await api.post('api/posts', postData)
    console.log(res)
  }

  async likePost(id) {
    const res = await api.post(`api/posts/${id}/like`)
    console.log(res)
  }

  async editPost(id, postData) {
    const res = await api.put('api/posts/' + id, postData)
    console.log(res)
  }

  async deletePost(id) {
    const res = await api.delete('api/posts/' + id)
    console.log(res)
  }
}

export const postService = new PostService()
