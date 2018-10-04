import Api from '@/services/Api'

export default {
  index (params) {
    return Api().get('history', {
      params: params
    })
  },
  post (history) {
    return Api().post('history', history)
  },
  delete (historyId) {
    return Api().delete(`history/${historyId}`)
  }
}