<template>
  <div>
    <el-card>
      <el-breadcrumb  separator-class="el-icon-arrow-right" separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/clties/list' }">城市管理</el-breadcrumb-item>
      </el-breadcrumb>

      <el-row :gutter="10">
        <el-col :span="6">
          <el-input  placeholder="请输入内容" v-model="queryKey" clearable @clear="fetch">
            <el-button slot="append" type="primary" icon="el-icon-search" @click="fetch"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <h1>城市</h1>
      <el-table :data="items">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column prop="_id"  label="ID" width="240">
        </el-table-column>
        <el-table-column  prop="name" label="省名称" >
        </el-table-column>
        <el-table-column prop="code" label="省代码" >
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
        :page-sizes="[1, 3, 5, 7, 9]"
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
      items: [
        { major: [] }
      ],
      item: {},
      total: 0,
      currentPage: 1,
      pageLimit: 9,
      queryKey: ''
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
      const res = await this.$http.get('rest/cities', {
        params: {
          page: this.currentPage,
          limit: this.pageLimit,
          queryKey: this.queryKey
        }
      })
      this.items = res.data.items
      this.total = res.data.total
      this.items.forEach(item => {
        console.log(item)
      });
    },
    edit (row) {
      this.$router.push(`/cities/edit/${row._id}`)
    },
    deleted (row) {
      this.$confirm(`此操作将删除省市信息《${row.name}》!`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`rest/cities/${row._id}`)
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
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>