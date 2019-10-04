<template>
  <div>
    <el-container style="height: 100vh">
      
      <el-container>
        
        <el-main >
          <span>六月</span>
          <el-divider></el-divider>
          <span>曾以为毕业是一个结束  </span>
          <el-divider></el-divider>
          <span>其实也是一个开始</span>
          <el-divider></el-divider>
          <span>愿以梦为马，不负韶华</span>
          <el-divider></el-divider>
          <span>莫愁前路无知己</span>
          <el-divider></el-divider>
          <span>天下谁人不识君</span>
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


