<template>
  <div>
    <el-container >
      <el-aside width="150px" >
        <el-menu :default-openeds="['1']" 
                 class="el-menu" 
                 router
                 >
            <el-menu-item index="/news/center" class="menu-item">新闻中心</el-menu-item>
            <el-menu-item index="/news/declear" class="menu-item">公告中心</el-menu-item>
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
      return {
       
    }
  }
}
</script>

<style scoped>

  .el-aside {
    color: #333;
  }

  .el-menu {
    color: red!important;
  }

  .menu-item {
    color: #640000!important;
  }
  .menu-item:hover {
    background-color: 	#F5F5DC;
  }
</style>