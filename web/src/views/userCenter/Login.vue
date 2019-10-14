<template>
  <div id="app" class="wrapper">
    <div class="nxist"><img src="~assets/images/nxist.png" alt=""></div>
    <el-card class="login-card">
      <h3>登录</h3>
      <el-form >
        <el-tabs value="first" v-model="activeName" @tab-click="handleClick" >
          <el-tab-pane label="账号密码登录" name="first" >
            <el-form-item >
                  <el-input placeholder="用户名" v-model="model.adminName"></el-input>
            </el-form-item>
            <el-form-item >
              <el-input placeholder="密码"  v-model="model.password"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="短信验证登录" name="second">
            <el-form-item >
              <el-input placeholder="手机号" v-model="phoneNumber"></el-input>
            </el-form-item>
            <el-form-item >
              <el-input placeholder="验证码" >
                <template slot="append">
                  <el-button  @click="getCode" :disabled="!currectNumber">{{ timeNumber> 0 ? `已发送(${timeNumber}s)` : '获取验证码'}}</el-button>
                  </template>
              </el-input>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
        <el-form-item class="item">
          <el-button type="primary" class="login-button" >登录</el-button>
        </el-form-item>
        <el-form-item class="item">
          没有账号？<el-button type="text" class="button" @click="change">注册</el-button>
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
      async login () {
        const res = await this.$http.post('login',this.model)
        localStorage.token = res.data.token
        this.$router.push('/')
        this.$message({
          type: 'success',
          message: '登录成功  '
        })
      },
      handleClick(tab, event) {
      },
      getCode () {
        if (!this.timeNumber) {
          this.timeNumber = 30
          const intervatId = setInterval(() => {
            this.timeNumber--
            if (this.timeNumber <= 0) {
              clearInterval(intervatId)
            }
          },1000)
        }
        
      },
      change () {
        this.$router.push('/register')
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
  .login-card {
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
    border: 1px solid #EA6F5A!important;
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
