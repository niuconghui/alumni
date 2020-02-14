<template>
  <div>
    <h1>源校友学号列表</h1>
    <el-table :data="items">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column prop="_id" label="ID" width="240">
      </el-table-column>
      <el-table-column prop="studentSID" label="学号" >
      </el-table-column>
      <el-table-column label="操作" >
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
      const res = await this.$http.get('rest/sourceUsers')
      this.items = res.data.items
    },
    edit (row) {
      this.$router.push(`/sourceUser/edit/${row._id}`)
    },
    deleted (row) {
      this.$confirm(`此操作将删除源学号《${row.studentSID}》!`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`rest/sourceUsers/${row._id}`)
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