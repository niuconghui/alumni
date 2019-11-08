<template>
  <div id="app" class="wrapper">
    <div class="nxist"><img src="~assets/images/nxist.png" alt=""></div>
    <el-card class="register-card">
      <h3>注册</h3>
      <el-form >
        <el-form-item >
          <el-input placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item >
          <el-input show-password placeholder="密码"></el-input>
        </el-form-item>
         <el-form-item >
          <el-input placeholder="学号"></el-input>
        </el-form-item>
         <el-form-item >
          <el-input placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item class="item">
          <el-button type="primary" class="login-button">注册</el-button>
        </el-form-item>
        <el-form-item class="item">
          已有账号？<el-button type="text" class="button" @click="change">登录</el-button>
        </el-form-item>
        <el-form-item class="item">
          注册登录即表示同意
          <el-button type="text" class="button">用户协议</el-button>,
          <el-button type="text" class="button">隐私政策</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    components: {
      
    },
    data() {
      return {
        model: {},
        activeName: 'first',
        LoginWay: true,
        phoneNumber: '',
        timeNumber: 0,
      };
    },
    methods: {
      change () {
        this.$router.push('/login')
      }
    },
    computed: {
      currectNumber () {
        return /^1[3456789]\d{9}$/.test(this.phoneNumber)
      }
    },
  }
</script>

<style>
  body {
    background-color: #F4F5F5;
  }
  .nxist {
    width: 120px;
    height: 60px;
    position: relative;
    top: 50px;
    left: 5%;
  }
  .register-card {
    width: 23rem;
    margin: 5rem auto;
  }

  .tab-pane {
    color: #640000!important
  }

  .el-tabs__item:hover {
    color: #640000!important
  }
  .el-tabs__item.is-active {
    color: #640000!important
  }
  .el-tabs__active-bar {
    background-color: #640000!important;
  }

  .item {
    margin: 0!important;
    padding: 0!important;
  }

  .el-input__inner {
    border: 1px solid #DCDCDC!important;
  }
  .el-input__inner:hover {
    /* border: 1px solid #EA6F5A!important; */
  }
  .el-input__inner.active {
    border: #640000!important
  }

  .button {
    color: #EA6F5A!important;
  }

  .login-button {
    width: 100%!important;
    background-color: #EA6F5A!important;
    border: #640000!important;
  }
  


</style>
