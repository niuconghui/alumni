<template>
  <div>
    <el-container style="height: 100vh">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu  router :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>校园新闻管理</template>
            <el-menu-item-group>
              <el-menu-item index="/news/create">添加新闻</el-menu-item>
              <el-menu-item index="/news/list">新闻列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>校园交流管理</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">添加校园交流</el-menu-item>
              <el-menu-item index="2-2">校园交流列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>校友风采管理</template>
            <el-menu-item-group>
              <el-menu-item index="3-1">添加校友风采</el-menu-item>
              <el-menu-item index="3-2">校友风采列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-setting"></i>校园风光管理</template>
            <el-menu-item-group>
              <el-menu-item index="/sceneries/create">添加校园风光</el-menu-item>
              <el-menu-item index="/sceneries/list">校园风光列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-setting"></i>校友捐赠管理</template>
            <el-menu-item-group>
              <el-menu-item index="5-1">添加校友捐赠</el-menu-item>
              <el-menu-item index="6-2">校友捐赠列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-setting"></i>高级管理</template>
            <el-menu-item-group>
              <template slot="title">源校友</template>
              <el-menu-item index="/sourceUser/create">添加源校友</el-menu-item>
              <el-menu-item index="/sourceUser/list">源校友列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">用户管理</template>
              <el-menu-item index="5-1">添加用户</el-menu-item>
              <el-menu-item index="6-2">用户列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">管理员管理</template>
              <el-menu-item index="5-1">添加管理员</el-menu-item>
              <el-menu-item index="6-2">管理员列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <span>牛丛慧</span>
        </el-header>
        
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
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
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


