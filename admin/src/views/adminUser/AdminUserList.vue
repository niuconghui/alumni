<template>
  <div>
    <el-card class="box-card">
      <el-breadcrumb  separator-class="el-icon-arrow-right" separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/adminUser/list' }">管理员管理</el-breadcrumb-item>
      </el-breadcrumb>
    
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input  placeholder="请输入内容">
            <el-button slot="append" type="primary" icon="el-icon-search" ></el-button>
          </el-input>
        </el-col>
      </el-row>
      
      <el-table :data="items">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column prop="_id" label="ID" width="240">
        </el-table-column>
        <el-table-column prop="adminName" label="管理员用户名" >
        </el-table-column>
        <el-table-column prop="password" label="管理员密码" >
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleted(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, sizes, prev, pager, next "
        :page-sizes="[1, 3, 5, 7]"
        :page-size=pageLimit
        :total=total
        hide-on-single-page>
      </el-pagination>
    </el-card>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      model: {},
      total: 0,
      currentPage: 1,
      pageLimit: 7,
    }
  },
  methods: {
    handleSizeChange(val) {  // 切换一页显示几条数据
      this.pageLimit = val
      this.fetch()
    },
    handleCurrentChange(val) { // 根据页码请求数据
      this.currentPage = val
      this.fetch()
    },
    async fetch () {
      const res = await this.$http.get('rest/AdminUsers', {
            page: this.currentPage,
            limit: this.pageLimit
          })
      this.items = res.data.items
      this.total = res.data.total
    },
    edit (row) {
      this.$router.push(`/adminUser/edit/${row._id}`)
    },
    deleted (row) {
      this.$confirm(`此操作将删除管理员《${row.adminName}》!`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`rest/AdminUsers/${row._id}`)
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
   .box-card {
      /* width: 480px; */
  }
</style>