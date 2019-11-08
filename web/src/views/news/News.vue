<template>
  <div >
    <router-view :newslist="centerNewsList" :declearlist="declearNewsList"></router-view>
  </div>
</template>

<script>
import http from 'network/axios'

import NewsCenter from './childComps/NewsCenter'

export default {
  components: {
    
  },
  data() {
    return {
      centerNewsList: [],
      declearNewsList: []
    }
  },
  methods: {
    async getNewsCenter () {
      const res = await http.get('news/center')
      this.centerNewsList = res.data
    },
    async getNewsDeclear () {
      const res = await http.get('news/declear')
      this.declearNewsList = res.data
      console.log(this.declearNewsList)
    }
  },
  created() {
    this.getNewsCenter()
    this.getNewsDeclear()
  },
}
</script>

<style scoped>

  .el-aside {
    color: #333;
  }

  .el-menu {
    color: red!important;
  }

  .menu-item {
    color: #640000!important;
  }
  .menu-item:hover {
    background-color: 	#F5F5DC;
  }
</style>