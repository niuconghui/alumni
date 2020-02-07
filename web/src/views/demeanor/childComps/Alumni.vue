<template>
  <div>
    <h4 >杰出校友</h4>
    <demeanor-item 
      class="demeanor-item"
      v-for="(item, index) in alumniList"
      :key=index
      :demeanor=item
      @demeanorClick="handleDemeanorClick"
      />

    <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        layout="total, sizes, prev, pager, next "
        :page-sizes="[5, 10]"
        :page-size="limit"
        :total="total"
        />
  </div>
</template>

<script>
import DemeanorItem from './DemeanorItem'

export default {
  components: {
    DemeanorItem,
  },
  data() {
    return {
      alumniList: [],
      total: 0,
      page: 1,
      limit: 5
    }
  },
  created() {
    this._getDemeanorAlumni()
  },

  methods: {
    async _getDemeanorAlumni() {
      const res = await this.$api.demeanor.getDemeanorAlumini(this.page, this.limit)
      if (res.data.code !== 0) return
      this.alumniList = res.data.data.items
      this.total = res.data.data.total;
    },

    // -------------------------事件监听-----------------------
    handleDemeanorClick(id) {
      this.$router.push(`/demeanor/detail/${id}`)
    },

    handleSizeChange(val) {
      // 切换一页显示几条数据
      this.limit = val;
      this._getDemeanorAlumni();
    },
    handleCurrentChange(val) {
      // 根据页码请求数据
      this.page = val;
      this._getDemeanorAlumni();
    }
  },
}
</script>

<style scoped>
  h4 {
    margin: 0;
    padding: 0;
    color: #777;
    line-height: 30px;
    border-bottom: 1px solid #DCDCDC;
  }

</style>