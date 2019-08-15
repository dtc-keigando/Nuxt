import moment from '~/plugins/moment'

export const state = () => ({
  isLoggedIn: false,
  user: null,

})

export const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
  user: (state) => state.user ? Object.assign({likes: []}, state.user) : null
}

export const mutations = {
  setUser(state, { user }) {
    state.user = user
    state.isLoggedIn = true
  },
  updateUser(state, { user }) {
    state.user = state.user.map(p => (p.id === user.id ? user : p))
  },
  addUserPost(state, { user, post }) {
    state.userPosts[user.id].push(post)
  }
}

export const actions = {
  async login({ commit }, { id }) {
    console.log('a')
    const user = await this.$axios.$get(`/users/${id}.json`)
    if (!user.id) throw new Error('Invalid user')
    commit('setUser', {user})
  },
  async register({ commit }, { id }) {
    console.log('b')
    const payload = {}
    payload[id] = { id }
    await this.$axios.$patch(`/users.json`, payload)
    const user = await this.$axios.$get(`/users/${id}.json`)
    if (!user.id) throw new Error('Invalid user')
    commit('setUser', {user})
  },
  async addLikeLogToUser({ commit }, { user, post }) {
    console.log('c')
    // console.log(user)
    // if (!user.likes)
    //   user.likes = []
    var z = user.likes
    console.log('before',z)
    z.push({
      created_at: moment().format(),
      user_id: post.user.id,
      post_id: post.id
    })
    user.likes = z
    console.log('after',z)
    const newUser = await this.$axios.$put(`/users/${user.id}.json`, user)
    commit('setUser',{user: newUser})
  },
  async removeLikeLogToUser({ commit }, { user, post }) {
    user.likes = post.likes.filter(like => like.user_id !== user.id) || []
    const newUser = await this.$axios.$put(`/users/${user.id}.json`, user)
    commit('updateUser', { user: newUser })
  }
}
