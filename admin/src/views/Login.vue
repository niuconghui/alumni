<template>
  <div id="app" class="wrapper">
    <el-card class="login-card" >
      <el-form>
        <el-tabs value="second" v-model="activeName"  @tab-click="handleClick">
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
         <el-form-item>
            <el-button type="primary">登录</el-button>
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
      activeName: 'second',
      LoginWay: true,
      phoneNumber: '',
      timeNumber: 0,
    };
  },
  methods: {
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
  },
  computed: {
    currectNumber () {
      return /^1[3456789]\d{9}$/.test(this.phoneNumber)
    }
  },
}
</script>

<style>

  .login-card {
    width: 25rem;
    margin: 5rem auto;
  }


</style>
