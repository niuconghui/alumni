<template>
  <div class="nav-wrapper">
      <el-menu router :default-active="$route.path"  
                      class="el-menu-demo" 
                      mode="horizontal" 
                      active-text-color="#640000"
                      @select="handleSelect">
        <el-menu-item index="" style="cursor:default">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </el-menu-item>
        <el-menu-item index="/home">首页</el-menu-item>
        <el-submenu index="/news" active-text-color="#640000" >
          <template slot="title">新闻中心</template>
          <el-menu-item index="/news/center">热点新闻</el-menu-item>
          <el-menu-item index="/news/declear">公告中心</el-menu-item>
        </el-submenu>
        <el-menu-item index="/exchange">校园交流</el-menu-item>
        <el-menu-item index="/demeanor/alumni">校友风采</el-menu-item>
        <el-menu-item index="/scenery" >校园风光</el-menu-item>
        <el-menu-item index="/donate">校友捐赠</el-menu-item>
        <el-menu-item index="" style="cursor:default">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </el-menu-item>
        <el-menu-item v-if="true" index="" style="cursor:default">
          <el-link type="primary" class="link" :underline="false" @click="login">登录</el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link class="link" :underline="false" @click="register" >注册</el-link>
        </el-menu-item>
        <el-menu-item v-else>
          <el-col :span="12" >
            <span class="demonstration"></span>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <el-avatar>
                  <img src="../../assets/images/logo.png" alt="" @click="center">
                </el-avatar>
              </span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item icon="el-icon-edit" class="dropdown">写交流</el-dropdown-item>
                <el-dropdown-item icon="el-icon-user-solid" divided class="dropdown">我的主页</el-dropdown-item>
                <el-dropdown-item icon="el-icon-star-on" class="dropdown">我赞过的</el-dropdown-item>
                <el-dropdown-item icon="el-icon-setting" divided class="dropdown">设置</el-dropdown-item>
                <el-dropdown-item icon="el-icon-warning" class="dropdown">关于</el-dropdown-item>
                <el-dropdown-item icon="el-icon-d-arrow-right" divided class="dropdown">登出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
  import 'assets/scss/style.scss'
  import Register from 'views/userCenter/Register'
  export default {
    data() {
        return {
          activeIndex: '1',
          isShowActive: true,
          isShow: true,
          isShowRegister: false,
        };
      },
      components: {
        Register
      },
      methods: {
        login () {
          this.$router.push('/login')
        },
        register () {
          this.$router.push('/register')
          // this.isShowRegister = !this.isShowRegister
        },
        center () {
          this.isShow = !this.isShow
          console.log('个人中心')
        },
        handleSelect(key, keyPath) {
        }
      },
  }
</script>

<style >
  .nav-wrapper {
    position: sticky;
    margin: auto;
  }
  .el-menu--horizontal {
    margin: auto!important;
  }
  .el-submenu__title {
    font-size: 16px!important;
    color: #333!important;
    margin: auto!important;
  }
  .el-icon-arrow-down:before {
    display: none!important;
  }
  .el-menu-item {
    font-size: 16px!important;
    color: #333!important;
    margin: auto!important;
  }
  .el-menu-item:hover {
    color: #640000!important;
  }
  .link {
    font-size: 16px!important;
    color:#640000!important;
  }
  .divider {
    margin: 0!important;
  }
  .dropdown:hover {
    background-color: #f4f4f4!important;
    color: #640000!important;
  }

  .test{
    width: 100px;
    height: 100px;
    background-color: pink;
  }
</style>