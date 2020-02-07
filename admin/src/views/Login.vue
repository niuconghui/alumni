<template>
  <div id="login" class="wrapper">
    <el-card class="login-card" >
      <el-form :model="model"  ref="ruleForm">
        <el-tabs value="first" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="账号密码登录" name="first" >
            <el-form-item prop="name">
              <el-input placeholder="用户名" v-model="model.adminName"></el-input>
            </el-form-item>
            <el-form-item prop="psd">
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
            <el-button type="primary" @click="login" :disabled="isdisabled">登录</el-button>
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
      isdisabled: false,
      activeName: 'first',
      LoginWay: true,
      phoneNumber: '',
      timeNumber: 0,
      // rules: {
      //   name: [
      //     { required: true, message: '请输入用户名', trigger: 'blur' },
      //     { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
      //   ],
      //   psd: [
      //     { required: true, message: '请输入密码', trigger: 'blur' },
      //     { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
      //   ]
      // }
    };
    
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false;
        }
      })
    },

    async login () {
      const res = await this.$http.post('login',this.model)
      sessionStorage.token = res.data.token
      this.$router.push('/')
      this.$message({
        type: 'success',
        message: '登录成功'
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
