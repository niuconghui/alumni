<template>
    <div class="nav-wrapper">
      <el-menu router :default-active="activeIndex"  
                      class="el-menu-demo" 
                      mode="horizontal" 
                      active-text-color="#640000"
                      @select="handleSelect">
        <el-menu-item >
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </el-menu-item>
        <el-menu-item index="home">首页</el-menu-item>
        <el-menu-item index="news">新闻中心</el-menu-item>
        <el-menu-item index="exchange">校园交流</el-menu-item>
        <el-menu-item index="demeanor">校友风采</el-menu-item>
        <el-menu-item index="scenery" >校园风光</el-menu-item>
        <el-menu-item index="donate">校友捐赠</a></el-menu-item>
        <el-menu-item >
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;
        </el-menu-item>
        <el-menu-item v-if="false">
          <el-button type="text" class="btn" @click="login">登录</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" class="btn" @click="registe">注册</el-button>
        </el-menu-item>
        <el-menu-item v-if="true">
          
          <el-col :span="12">
            <span class="demonstration"></span>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <el-avatar>
                  <img src="../../assets/images/logo.png" alt="" @click="center">
                </el-avatar>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-edit">写交流</el-dropdown-item>
                <el-divider class="divider"></el-divider>
                <el-dropdown-item icon="el-icon-user-solid">我的主页</el-dropdown-item>
                <el-dropdown-item icon="el-icon-star-on">我赞过的</el-dropdown-item>
                <el-divider class="divider"></el-divider>
                <el-dropdown-item icon="el-icon-setting">设置</el-dropdown-item>
                <el-dropdown-item icon="el-icon-warning">关于</el-dropdown-item>
                <el-divider class="divider"></el-divider>
                <el-dropdown-item icon="el-icon-d-arrow-right">登出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-menu-item>
      </el-menu>
    </div>
</template>

<script>
  import '../../assets/scss/style.scss'
  export default {
    data() {
        return {
          activeIndex: 'home',
          activeIndex2: '1',
          isShow: true
        };
      },
      methods: {
        login () {
          console.log('登录')
          this.isShow = !this.isShow
        },
        registe () {
          console.log('注册')
        },
        center () {
          this.isShow = !this.isShow
          console.log('个人中心')
        },
        handleSelect(key, keyPath) {
          //console.log(key, keyPath);
        }
      }
  }
</script>

<style >
  .nav-wrapper {
    position: sticky;
  }
  .el-menu-item {
    font-size: 16px!important;
    color: #333!important;
    margin: auto!important;
  }
  .btn {
    font-size: 16px!important;
    color:#640000!important;
  }
  .divider {
    margin: 0!important;
  }
</style>