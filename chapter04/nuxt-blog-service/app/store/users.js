import moment from '~/plugins/moment'
export const state = () => ({
  users: [],
  userPosts: []
})

export const getters = {
  // users: (state) => state.users
  users: (state) => state.user ? Object.assign({ likes: [] }, state.user) : null
}

export const mutations = {
  setUser(state, { user }) {
    state.user = user
  },
  addUser(state, { user }) {
    state.users.push(user)
    state.user = user
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
    console.log('user.likes=',user.likes)
    // if (!user.likes)
    //   user.likes = []
    user.likes.push({
      created_at: moment().format(),
      user_id: post.user.id,
      post_id: post.id
    })
    user.likes.push({
      a: " ",
      b: " "
    }

    )
    // console.log(user)
    const newUser = await this.$axios.$put(`/users/${user.id}.json`, user)
    // console.log(newUser)
    commit('setUser', { user: newUser })
  },
  async removeLikeLogToUser({ commit }, { user, post }) {
    post.likes = post.likes.filter(like => like.user_id !== user.id) || []
    const newPost = await this.$axios.$put(`/posts/${post.id}.json`, post)
    commit('clearUserPosts', { post: newPost })
  }
}
