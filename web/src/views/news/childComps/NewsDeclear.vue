<template>
  <div>
    <h4 >公告中心</h4>
    <div class="news-list"> 
      <news-item 
      v-for="(item,index) in declearList" 
      :key="index" 
      :news="item"
      @newsClick="newsItemClick" />
    </div>

    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      layout="total, sizes, prev, pager, next "
      :page-sizes="[10, 15]"
      :page-size="limit"
      :total="total"
    />
  </div>
</template>

<script>
import NewsItem from './NewsItem'
import NewsDetail from './NewsDetail'

export default {
  components: {
    NewsItem,
    NewsDetail
  },
  data() {
    return {
      declearList: [],
      total: 0,
      page: 1,
      limit: 10
    }
  },

  created() {
    this._getNewsCenter()
  },
  methods: {
    // ----------------------------------网络请求---------------------------------------
    async _getNewsCenter() {
      const res = await this.$api.news.getNewsDeclear(this.page, this.limit)
      if (res.data.code === 0) {
        this.declearList = res.data.data.items
        this.total = res.data.data.total
      }
    },

    // -----------------------------------事件监听-------------------------------------
    newsItemClick(id) {
      this.$router.push(`/news/detail/${id}`)
    },

    handleSizeChange(val) {
      // 切换一页显示几条数据
      this.limit = val;
      this._getNewsCenter();
    },
    handleCurrentChange(val) {
      // 根据页码请求数据
      this.page = val;
      this._getNewsCenter();
    }
  },
}
</script>


<style scoped>
.news-list {
  min-height: 350px;
}

h4 {
    margin: 0;
    padding: 0;
    color: #777;
    line-height: 30px;
    border-bottom: 1px solid #DCDCDC;
  }
  
</style>