<template>
  <div>
    <el-container>
      <el-container>
        <el-main >
          <span>欢迎登陆后台管理系统</span>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    methods: {
      logout () {
        this.$confirm('确定注销吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (localStorage.token) {
            localStorage.clear()
            this.$router.push('/login')
          }
          this.$message({
            type: 'success',
            message: '注销成功!'
          });
        })
      }
    },
    data() {
      return {
      
      }
    }
  }
</script>

<style scoped>
   .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>


