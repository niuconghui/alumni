<template>
  <div id="app" class="wrapper">
    <div class="nxist"><img src="~assets/img/nxist.png" alt=""></div>
    <el-card class="login-card">
      <h3>登录</h3>
      <el-form  :model="model" :rules="rules" ref="loginForm" >
        <el-form-item  prop="studentName">
          <el-input placeholder="用户名" v-model="model.studentName"></el-input>
        </el-form-item>
        <el-form-item  prop="password">
          <el-input placeholder="密码" type="password" v-model="model.password"></el-input>
        </el-form-item>

        <el-form-item class="item">
          <el-button type="primary"  class="login-button" @click="login('loginForm')" >登录</el-button>
        </el-form-item>
        <div class="item">
          没有账号？<el-button type="text" class="button" @click="changeRegister">注册</el-button>
        </div>
        <div class="item">
          注册登录即表示同意
          <el-button type="text" class="button">用户协议</el-button>,
          <el-button type="text" class="button">隐私政策</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Login',
    components: {
      
    },
    data() {
      return {
        model: {},
        rules: {
          studentName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ],
        },
      };
    },

    methods: {
      ...mapActions(["setLogin", "setAvatar", "setUserId"]),
      login(formName) {
        this.$refs['loginForm'].validate(async (valid) => {
          if (valid) {
            const res = await this.$api.user.login(this.model)
            if (res.data.code !== 0) return this.$message({ type: 'error', message: res.data.msg})
            localStorage.setItem('token', res.data.data.token)
            this.setLogin(true)
            this.setUserId(res.data.data.userId)
            this.setAvatar(res.data.data.uavatar)
            this.$message({ type: 'success', message: '登录成功' })
            if (this.$route.query.redirect) {
              this.$router.replace(this.$route.query.redirect)
            } else {
              this.$router.push('/')
            }
          } else {
            return false;
          }
        })
      },

      handleClick(tab, event) {
      },

      changeRegister () {
        this.$router.push('/register')
      }
    },
   
  }
</script>

<style lang="scss" scoped>
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
    margin: 1rem auto;
    h3 {
      text-align: center
    }
  }

  .login-button {
    width: 100%;
  }

</style>
