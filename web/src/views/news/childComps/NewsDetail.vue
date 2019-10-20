<template>
  <div>
    {{ news.author }}
    <div v-html="news.content">
      {{ news.content }}
    </div>
  </div>
</template>

<script>
import http from 'network/axios'
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
    async fetch () {
      const res = await http.get(`/news/${this.newsId}`)
      this.news = res.data
      console.log(this.news)
    }
  },
  created () {
    this.newsId = this.$route.params.id
    this.fetch()
  }
}
</script>

<style scoped>

</style>