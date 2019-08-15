<template>
  <div>
    <h2>Index Page</h2>
    <ul>
      <li><nuxt-link to='/login'>ログインページ</nuxt-link></li>
      <li><nuxt-link to='/authed-route'>認証が必要なページ</nuxt-link></li>
    </ul>
  </div>
</template>

<script>
import {mapGetters } from 'vuex'

export default {
  async asyncData({store}){
    if(store.getters['items'].length){
      return
    }
    await store.dispatch('fetchItems')
  },
  computed: {
    ...mapGetters(['items'])
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  padding: 16px;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
h3 {
  margin: 16px 0;
  padding: 8px 0;
  border-bottom: solid 1px #e5e5e5;
}
li + li {
  margin: 16pz 0;
}
p {
  margin: 8px 0;
}
</style>
