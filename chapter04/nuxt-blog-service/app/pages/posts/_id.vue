<template>
  <section class="container posts-page">
    <div style="flex: 1">
      <el-card v-if="post">
        <div slot="header" class="clearfix">
          <h2>{{post.title}}</h2>
          <small>by {{post.user.id}}</small>
        </div>
        <p>{{post.body}}</p>
        <no-ssr>
          <p class="text-right">
            <el-button :disabled="!isLoggedIn" type="warning" v-if="isLiked" @click="like" round>
              <span class="el-icon-star-on" />
              <span>{{post.likes.length}}</span>
            </el-button>
            <el-button :disabled="!isLoggedIn" type="warning" v-else @click="like" round>
              <span class="el-icon-star-off" />
              <span>{{post.likes.length}}</span>
            </el-button>
          </p>
        </no-ssr>
        <p class="text-right">{{post.created_at | time}}</p>
      </el-card>
      <p>
        <nuxt-link to="/posts">&lt; 投稿一覧へ戻る</nuxt-link>
      </p>
    </div>
  </section>
</template>

<script>
import moment from '~/plugins/moment'
import {mapGetters, mapActions, mapMutations} from 'vuex'
import cloneDeep from 'lodash.clonedeep'

export default {
  async asyncData({store, route}) {
    // const {id} = route.params
    if (store.getters['posts/posts'].find( p => p.id === route.params.id)) {
      return
    }
    await store.dispatch('posts/fetchPosts')
    // try {
    //   await store.dispatch('posts/fetchPost', {id})
    //   if (!(store.getters['posts/posts'].find(p =>p.id === this.$route.params.id))) {
    //     throw new Error('post not find')
    //   }
    // } catch (e) {
    //   error({statusCode: 404})
    // }
  },
  computed: {
    post() {
      // console.log(this.posts)
      var y = this.posts.find(p => p.id === this.$route.params.id)
      // console.log(this.posts)
      return y
    },
    isLiked() {
      if (!this.user) {
        return false
      }
      // console.log('before',this.post)
      var x = this.post.likes.find(l => l.user_id === this.user.id)
      // console.log('after',this.post)
      return x
    },
    ...mapGetters(['user', 'isLoggedIn']),
    ...mapGetters('posts',['posts'])
  },
methods: {
  like() {
    if (!this.isLoggedIn) {
      return
    }
    const likePayload = {user: this.user, post: this.post}
    console.log(likePayload)
    this.addLikeToPost(cloneDeep(likePayload))
    this.addLikeLogToUser(cloneDeep(likePayload))
    // this.setUser()
    // this.addLikeToPost(cloneDeep(likePayload))
  },
  unlike() {
    if (!this.isLoggedIn) {
      return
    }
    console.log('unlike')
  },
  ...mapMutations(['setUser']),
  ...mapActions(['addLikeLogToUser']),
  ...mapActions('posts',['addLikeToPost']),
  // ...mapActions(['removeLikeLogToUser']),
  // ...mapActions('posts', ['removeLikeToPost'])
},
  filters: {
    time(val) {
      return moment(val).format('YYYY/MM/DD HH:mm:ss')
    }
  }
}
</script>

<style>
.posts-page .el-table__row{
  cursor: pointer;
}
</style>
