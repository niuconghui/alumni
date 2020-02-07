<template>
  <div>
    <div>
      <h2>{{ news.title }}</h2>
      <div class="time">时间：{{ news.issueTime }} </div>
      <div v-html="news.content" class="content"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: { id: {} },
  components: {

  },
  data() {
    return {
      news: {}
    }
  },
  created () {
    this.id && this._getNewsDetail()
  },
  methods: {

    async _getNewsDetail() { 
      const res = await this.$api.news.getNewsDetail(this.id)
      if (res.data.code !== 0) return this.$message({
        type: 'error',
        msg: '网络不给给力，请稍后再试'
      })
      this.news = res.data.data
    }
  },


}
</script>

<style scoped>

  h2 {
    padding: 0;
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
    min-height: 400px;
  }
</style>