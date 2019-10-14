<template>
  <div>
    <el-card class="back-card" shadow="never" >
      <el-form label-width="90px">
        <h3>反馈意见</h3>
        <el-form-item label="反馈类型：">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="问题描述：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="qq：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="微信：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item >
          <button @click.prevent="submit">提交反馈</button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '登录注册'
        }, {
          value: '选项2',
          label: '个人中心'
        }, {
          value: '选项3',
          label: '交流问题'
        }, {
          value: '选项4',
          label: '捐赠问题'
        }, {
          value: '选项5',
          label: '意见建议或其他'
        }],
        value: ''
      }
    },
    methods: {
      submit () {
        console.log(111);
      }
    }
  }
</script>

<style scoped>
  p {
    font-size: 20px;
  }
  span {
    color: #640000!important;
  }
  .back-card {
    width: 40rem;
    margin: 5rem auto;
  }

  .el-input__inner {
    border: 1px solid #DCDCDC!important;
  }
  .el-input__inner:hover {
    border: 1px solid #EA6F5A!important;
  }
  /* .textarea {
    border: 1px solid #DCDCDC!important;
    border-radius: 5px; 
  }
  .textarea:hover {
    border: 1px solid #EA6F5A!important;
  } */

  button {
    color: #ffffff!important;
    width: 80px;
    height: 40px;
    border: 1px solid #EA6F5A;
    background-color: #EA6F5A;
    border-radius: 10%;
    cursor: pointer;
  }

  .el-select-dropdown__item:hover {
    background-color: #FFEBCD!important;
  }
  .el-select-dropdown__item.selected {
    color: #640000!important;
    background-color: #FFEBCD!important;
  }
</style>