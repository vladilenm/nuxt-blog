export const actions = {
  async create({dispatch}, comment) {
    return await this.$axios.$post('/api/comment', comment)
  }
}
