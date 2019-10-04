<template>
  <div>
    <h1>校园风光列表</h1>
    <el-table :data="items">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column prop="_id" label="ID" width="180">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="180" >
      </el-table-column>
      <el-table-column prop="image" label="图片" >
        <template slot-scope="scope">
          <img :src="scope.row.image" alt=""  width="280px" height="150px">
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" >
      </el-table-column>
      <el-table-column label="操作"  width="120">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="deleted(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  methods: {
    async fetch () {
      const res = await this.$http.get('rest/sceneries')
      this.items = res.data
    },
    edit (row) {
      this.$router.push(`/sceneries/edit/${row._id}`)
    },
    deleted (row) {
      this.$confirm(`此操作将删除校园风光《${row.title}》!`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`rest/sceneries/${row._id}`)
          this.fetch()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
    }
  },
  created() {
    this.fetch()
  },
}
</script>

<style scoped>

</style>