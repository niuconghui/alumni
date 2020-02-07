<template>
  <div>
    <h4 >院士风采</h4>
    <demeanor-item 
      class="demeanor-item"
      v-for="(item, index) in academicianList"
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
  data() {
    return {
      academicianList: [],
      total: 0,
      page: 1,
      limit: 5
    }
  },
  components: {
    DemeanorItem
  },
  created() {
    this._getDemeanorAcademician()
  },

  methods: {
    // -------------------------网络请求---------------------------
    async _getDemeanorAcademician() {
      const res = await this.$api.demeanor.getDemeanorAcademician(this.page, this.limit)
      if (res.data.code !== 0) return
      this.academicianList = res.data.data.items
      this.total = res.data.data.total;
    },

    // -------------------------事件监听---------------------------
    handleDemeanorClick(id) {
      console.log(id)
      this.$router.push(`/demeanor/detail/${id}`)
    },

    handleSizeChange(val) {
      // 切换一页显示几条数据
      this.limit = val;
      this._getDemeanorAcademician();
    },
    handleCurrentChange(val) {
      // 根据页码请求数据
      this.page = val;
      this._getDemeanorAcademician();
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