import { AppState } from '../AppState'
import { api } from './AxiosService'

class PostService {
  async getPosts() {
    const res = await api.get('api/posts')
    AppState.posts = res.data.posts
    AppState.postPage = res.data
  }

  async SearchPosts(query = {}) {
    const res = await api.get('api/posts?query=' + query)
    AppState.posts = res.data.posts
    AppState.postPage = res.data
  }

  async getPostsByPage(pageNum) {
    const res = await api.get('api/posts?page=' + pageNum)
    AppState.posts = res.data.posts
    AppState.postPage = res.data
  }

  async getPostsById(id) {
    const res = await api.get('api/posts/' + id)
    console.log(res)
  }

  async createPost(postData) {
    const res = await api.post('api/posts', postData)
    AppState.posts = [res.data, ...AppState.posts]
  }

  async likePost(postId, id) {
    const res = await api.post(`api/posts/${postId}/like`)
    return res.data.likeIds.find(i => i === id) ? 'liked' : 'unliked'
  }

  async editPost(id, postData) {
    const res = await api.put('api/posts/' + id, postData)
    console.log(res)
  }

  async deletePost(id) {
    const res = await api.delete('api/posts/' + id)
    AppState.posts = AppState.posts.filter(p => p.id !== id)
    return res.data
  }
}

export const postService = new PostService()
