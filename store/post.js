export const actions = {
  async create({commit}, {title, text, image}) {
    try {
      const fd = new FormData()

      fd.append('image', image, image.name)
      fd.append('title', title)
      fd.append('text', text)

      return await this.$axios.$post('/api/post/admin', fd)

    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async update({commit}, {text, id}) {
    try {
      return await this.$axios.$put('/api/post/admin/' + id, {text})
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async remove({commit}, id) {
    try {
      return await this.$axios.$delete('/api/post/admin/' + id)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async getAnalytics({commit}) {
    try {
      return await this.$axios.$get('/api/post/admin/get/analytics')
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async fetchAdmin({dispatch, commit}) {
    return await this.$axios.$get('/api/post/admin')
  },
  async fetchAdminById({dispatch, commit}, id) {
    return await this.$axios.$get('/api/post/admin/' + id)
  },
  async fetch({dispatch, commit}) {
    return await this.$axios.$get('/api/post')
  },
  async fetchById({dispatch, commit}, id) {
    return await this.$axios.$get('/api/post/' + id)
  },
  async addView({dispatch, commit}, {_id, views}) {
    return await this.$axios.$put('/api/post/add/view/' + _id, {views})
  }
}
