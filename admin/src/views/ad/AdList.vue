<template>
  <div>
    <el-card class="box-card">
      <el-breadcrumb  separator-class="el-icon-arrow-right" separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/ad/list' }">广告管理</el-breadcrumb-item>
      </el-breadcrumb>
      
    
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input  placeholder="请输入内容" v-model="queryKey" clearable @clear="fetch">
            <el-button slot="append" type="primary" icon="el-icon-search" @click="fetch"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <el-table :data="items"  style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column prop="_id" label="ID" width="180">
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180" >
        </el-table-column>
        <el-table-column prop="image" label="封面" >
          <template slot-scope="scope">
            <img :src="scope.row.coverSrc" alt=""  width="200px" height="200px">
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" >
        </el-table-column>
        <el-table-column label="操作"  width="200" fixed="right" >
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
        :page-sizes="[1, 2, 3]"
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
      total: 0,
      currentPage: 1,
      pageLimit: 3,
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
      const res = await this.$http.get('rest/ads', {
          params: {
            page: this.currentPage,
            limit: this.pageLimit,
            queryKey: this.queryKey
          }
        })
      this.items = res.data.items
      this.total = res.data.total
    },
    edit (row) {
      this.$router.push(`/ad/edit/${row._id}`)
    },
    deleted (row) {
      this.$confirm(`此操作将删除广告《${row.title}》!`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`rest/ads/${row._id}`)
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
    height: 100%;
  }

  .el-pagination {
    margin-top: 3vh  ; 
  }
</style>