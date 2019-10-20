<template>
  <div id="app" class="wrapper">
    <el-card class="login-card" >
      <el-form>
        <el-tabs value="first" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="账号密码登录" name="first" >
            <el-form-item >
              <el-input placeholder="用户名" v-model="model.adminName"></el-input>
            </el-form-item>
            <el-form-item >
              <el-input placeholder="密码" type="password"  v-model="model.password"></el-input>
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
            <el-button type="primary" @click="login">登录</el-button>
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
