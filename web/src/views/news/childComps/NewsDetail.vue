<template>
  <div>
    <h2>{{ news.title }}</h2>
    <div class="time">时间：{{ news.issueTime }} </div>
    <div v-html="news.content" class="content">
      {{ news.content }}
    </div>
  </div>
</template>

<script>
import http from 'network/axios'

import { formatDate } from "@/common/utils";

export default {
  props: {

  },
  components: {

  },
  data() {
    return {
      newsId: null,
      news: {}
    }
  },
  methods: {
    async fetchCenter () {
      const res = await http.get(`/news/${this.newsId}`)
      this.news = res.data
      console.log(this.news)
    },
  },
  created () {
    this.newsId = this.$route.params.id
    this.fetchCenter()
  },

}
</script>

<style scoped>

  h2 {
    text-align: center;
    font-size: 20px;
    color: #555;
  }
  
  .time {
    text-align: center;
    font-size: 15px;
    color: #333;
    margin: auto;
  }

  .content {
    text-indent: 2em;
  }
</style>