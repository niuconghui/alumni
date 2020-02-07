<template>
  <div>
    <el-container style="height: 100vh">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu  router :default-active="$route.path">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-document"></i>校园新闻管理</template>
            <el-menu-item-group>
              <template slot="title">新闻管理</template>
              <el-menu-item index="/news/create">添加新闻</el-menu-item>
              <el-menu-item index="/news/list">新闻列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">分类管理</template>
              <el-menu-item index="/category/create">添加分类</el-menu-item>
              <el-menu-item index="/category/list">分类列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-chat-dot-round"></i>校园交流管理</template>
            <el-menu-item-group>
              <template slot="title">校园交流</template>
              <el-menu-item index="/exchange/create">添加校园交流</el-menu-item>
              <el-menu-item index="/exchange/list">校园交流列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">点赞管理</template>
              <el-menu-item index="2-1">添加点赞</el-menu-item>
              <el-menu-item index="2-2">点赞列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">评论管理</template>
              <el-menu-item index="/comment/create">添加评论</el-menu-item>
              <el-menu-item index="/comment/list">评论列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-star-off"></i>校友风采管理</template>
            <el-menu-item-group>
              <el-menu-item index="/demeanor/create">添加校友风采</el-menu-item>
              <el-menu-item index="/demeanor/list">校友风采列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-sunrise-1"></i>校园风光管理</template>
            <el-menu-item-group>
              <el-menu-item index="/sceneries/create">添加校园风光</el-menu-item>
              <el-menu-item index="/sceneries/list">校园风光列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-edit"></i>校友捐赠管理</template>
            <el-menu-item-group>
              <el-menu-item index="5-1">添加校友捐赠</el-menu-item>
              <el-menu-item index="6-2">校友捐赠列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-user"></i>用户管理</template>
            <el-menu-item-group>
              <template slot="title">源校友</template>
              <el-menu-item index="/sourceUser/create">添加源校友</el-menu-item>
              <el-menu-item index="/sourceUser/list">源校友列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">用户管理</template>
              <el-menu-item index="/studentUser/create">添加用户</el-menu-item>
              <el-menu-item index="/studentUser/list">用户列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">管理员管理</template>
              <el-menu-item index="/adminUser/create">添加管理员</el-menu-item>
              <el-menu-item index="/adminUser/list">管理员列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title"><i class="el-icon-s-home"></i>院校管理</template>
            <el-menu-item-group>
              <el-menu-item index="/secClass/create">添加二级学院</el-menu-item>
              <el-menu-item index="/secClass/list">二级学院列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="8">
            <template slot="title"><i class="el-icon-location-information"></i>省市管理</template>
            <el-menu-item-group>
              <el-menu-item index="/cities/create">添加省市</el-menu-item>
              <el-menu-item index="/cities/list">省市列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="9">
            <template slot="title"><i class="el-icon-chat-dot-square"></i>反馈管理</template>
            <el-menu-item-group>
              <el-menu-item index="/feedback/create">添加反馈</el-menu-item>
              <el-menu-item index="/feedback/list">反馈列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <span></span>
          <el-button type="danger" plain @click="logout">注销</el-button>
        </el-header>
        
        <el-main>
          <router-view :key="$route.path"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        token: ''
      }
    },
    created() {
      this.getUser()
    },
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
      },
      getUser() {
        let token = ' token= ' + sessionStorage. getItem('token')
        this.token = token
      }
    },
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


