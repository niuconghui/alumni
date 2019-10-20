<template>
  <div >
    <router-view :newslist="newsList"></router-view>
  </div>
</template>

<script>
import http from 'network/axios'

import NewsCenter from './childComps/NewsCenter'

export default {
  components: {
    NewsCenter
  },
  data() {
    return {
      newsList: []
    }
  },
  methods: {
    async getNews () {
      const res = await http.get('news')
      this.newsList = res.data

    }
  },
  created() {
    this.getNews()
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