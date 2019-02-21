export const actions = {
  nuxtServerInit({dispatch}) {
    dispatch('auth/autoAuth')
  }
}


export const mutations = {
  setError(state, error) {
    state.error = error
  },

  clearError(state) {
    state.error = null
  }
}

export const state = () => ({
  error: null
})

export const getters = {
  error: state => state.error
}
