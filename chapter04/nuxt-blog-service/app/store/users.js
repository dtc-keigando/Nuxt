export const state = () => ({
  users: [],
  userPosts: []
})

export const getters = {
  // users: (state) => state.users
  users: (state) => state.user ? Object.assign({ likes: [] }, state.user) : null
}

export const mutations = {
  addUser(state, { user }) {
    state.users.push(user)
  },
  addUserPost(state, { user, post }) {
    state.userPosts[user.id].push(post)
  },
  clearUserPosts(state, { user }) {
    state.userPosts[user.id] = []
  }
}

export const actions = {
  async fetchUser({ commit }, { id }) {
    const user = await this.$axios.$get(`/users/${id}.json`)
    commit('addUser',{user})
  },
  async addLikeLogToUser({ commit }, { user, post }) {
    console.log('a')
    user.likes.push({
      created_at: moment().format(),
      user_id: user.id,
      post_id: post.id
    })
    console.log('uuuuu',user)
    const newUser = await this.$axios.$put(`/users/${user.id}.json`, user)
    commit('setUser', { post: newPost })
  },
  async removeLikeLogToUser({ commit }, { user, post }) {
    post.likes = post.likes.filter(like => like.user_id !== user.id) || []
    const newPost = await this.$axios.$put(`/posts/${post.id}.json`, post)
    commit('clearUserPosts', { post: newPost })
  }
}
