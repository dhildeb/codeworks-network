import { AppState } from '../AppState'
import { api } from './AxiosService'

class SidePicsService {
  async getSidePics() {
    const res = await api.get('api/ads')
    AppState.sidePics = res.data
  }
}

export const sidePicsService = new SidePicsService()
