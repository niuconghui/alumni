<template>
  <div>
    <el-card>
      <el-breadcrumb  separator-class="el-icon-arrow-right" separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/studentUser/list' }">用户管理</el-breadcrumb-item>
      </el-breadcrumb>

      <el-row :gutter="10">
        <el-col :span="6">
          <el-input  placeholder="请输入内容" v-model="queryKey" clearable @clear="fetch">
            <el-button slot="append" type="primary" icon="el-icon-search" @click="fetch"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <h1>用户列表</h1>
      <el-table :data="items" style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column prop="_id" label="ID" width="240">
        </el-table-column>
        <el-table-column prop="studentName" label="用户名" width="140">
        </el-table-column>
        <el-table-column prop="avatar" label="头像" width="100">
          <template slot-scope="scope">
            <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.avatar"
              >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="trueName" label="真实姓名" width="80">
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="50">
        </el-table-column>
        <el-table-column prop="studentID" label="学号" width="100">
        </el-table-column>
        <el-table-column prop="department" label="院系班级" width="350">
        </el-table-column>
        <el-table-column prop="startYear" label="入学时间" width="100">
        </el-table-column>
        <el-table-column prop="endYear" label="毕业时间" width="100">
        </el-table-column>
        <el-table-column prop="phoneID" label="手机号" width="120">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="120">
        </el-table-column>
        <el-table-column prop="birthplace" label="出生地址" width="200">
        </el-table-column>
        <el-table-column prop="address" label="现居地址" width="200">
        </el-table-column>
        <el-table-column prop="company_name" label="单位名称" width="200">
        </el-table-column>
        <el-table-column prop="birthday" label="生日" width="100">
        </el-table-column>
        <el-table-column prop="motto" label="座右铭" width="400">
        </el-table-column>
        <el-table-column prop="created_time" label="注册时间" width="200">
        </el-table-column>
        <el-table-column prop="last_modified_time" label="最后修改时间" width="200">
        </el-table-column>
        <el-table-column prop="status" label="状态码" width="100">
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="120px">
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
      model: {
        department: {},
        birthplace: {},
        address: {}
      },
      total: 0,
      currentPage: 1,
      pageLimit: 7,
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
      const res = await this.$http.get('rest/StudentUsers', {
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
      this.$router.push(`/studentUser/edit/${row._id}`)
      // console.log(scope.row.avatar)
    },
    deleted (row) {
      this.$confirm(`此操作将删除用户《${row.studentName}》!`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`rest/StudentUsers/${row._id}`)
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