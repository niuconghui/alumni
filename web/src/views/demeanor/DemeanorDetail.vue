<template>
  <div>
    <h2>{{ demeanor.title }}</h2>
    <div class="time">时间：{{ demeanor.issueTime }} </div>
    <div v-html="demeanor.content" class="content"></div>
  </div>
</template>

<script>
export default {
  props: { id: {} },
  components: {

  },
  data() {
    return {
      demeanor: {}
    }
  },
  created () {
    this._getDemeanorDetail()
  },
  methods: {

    async _getDemeanorDetail() { 
      const res = await this.$api.demeanor.getDemeanorDetail(this.id)
      console.log(res)
      if (res.data.code !== 0) return this.$message({
        type: 'error',
        msg: '网络不给给力，请稍后再试'
      })
      this.demeanor = res.data.data
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