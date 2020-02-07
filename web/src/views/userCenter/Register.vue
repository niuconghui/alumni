<template>
  <div id="app" class="wrapper">
    <div class="nxist"><img src="~assets/img/nxist.png" alt=""></div>
    <el-card class="register-card">
      <h3>注册</h3>
      <el-form :model="model" :rules="rules" ref="ruleForm">
        <el-form-item prop="studentName">
          <el-input placeholder="用户名" v-model="model.studentName"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input show-password placeholder="密码" v-model="model.password"></el-input>
        </el-form-item>
         <el-form-item prop="studentID">
          <el-input placeholder="学号" v-model="model.studentID"></el-input>
        </el-form-item>
         <el-form-item prop="phoneID">
          <el-input placeholder="手机号" v-model="model.phoneID"></el-input>
        </el-form-item>
        <el-form-item class="item">
          <el-button type="primary" class="register-button" @click="register('ruleForm')">注册</el-button>
        </el-form-item>
        <div class="item">
          已有账号？<el-button type="text" class="button" @click="changeLogin">登录</el-button>
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
  export default {
    name: 'Login',
    components: {
      
    },
    data() {
      return {
        model: {
          studentName: '',
          password: '',
          studentID: '',
          phoneID: '',
        },
        rules: {
          studentName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 6, message: '用户名长度必须在 3 到 6 个字符之间！', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, message: '密码长度必须在 6 到 16 个字符之间！', trigger: 'blur' }
          ],
          studentID: [
            { required: true, message: '请输入学号', trigger: 'blur' },
            { min: 8, max: 8, message: '学号长度必须为 8 位！', trigger: 'blur' }
          ],
          phoneID: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号长度必须为 11 位', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      changeLogin () {
        this.$router.push('/login')
      },

      register(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('注册成功!');
            this.$router.push('/login')
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
    },
  }
</script>

<style lang="scss" >
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
    margin: auto;
    h3 {
      text-align: center
    }
  }
  
  .register-button {
    width: 100%;
  }
  
  .item {
    font-size: 0.9rem
  }

</style>
