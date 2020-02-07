<template>
  <div>
    <el-card class="back-card" shadow="never" >
      <el-form label-width="100px" :model="model" :rules="rules" ref="feedbackForm">
        <h3>反馈意见</h3>
        <el-form-item label="反馈类型：" prop="category">
          <el-select v-model="model.category" placeholder="请选择">
            <el-option
              v-for="item in categories"
              :key="item._id"
              :label="item.title"
              :value="item._id"
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="问题描述：" prop="problemDesc">
          <el-input  
            type="textarea"
            :rows="2"
            placeholder="请输入问题详情"
            v-model="model.problemDesc">
          </el-input>
        </el-form-item>
        <el-form-item label="qq：" prop="qq">
          <el-input v-model="model.qq"></el-input>
        </el-form-item>
        <el-form-item label="微信：" prop="weChat">
          <el-input v-model="model.weChat"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="model.email"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="submit('feedbackForm')">提交反馈</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        model: {},
        categories: [],
        rules: {
          category: [
            { required: true, message: '反馈类型必须选择', trigger: 'change' }
          ],
          problemDesc: [
            { required: true, message: '请填写问题描述', trigger: 'blur' }
          ],
          qq: [
            { required: true, message: '请填写qq', trigger: 'blur' }
          ],
          weChat: [
            { required: true, message: '请填写微信', trigger: 'blur' }
          ],
          email: [
            { type: 'email', required: true, message: '请填写正确的邮箱', trigger: 'blur' }
          ],
        }  
      }
    },
    created() {
      this._getCategory()
    },
    methods: {
      async _getCategory() {
        const res = await this.$api.feedback.getCategory()
        console.log(res)
        if (res.data.code !== 0) return
        this.categories = res.data.data
      },

      async submit (feedbackForm) {
        this.$refs.feedbackForm.validate(async (valid) => {
          if (valid) {
            const res = await this.$api.feedback.postFeedback(this.model)
            if (res.data.code === 0) {
              this.$message({
                type: 'success',
                message: '您的反馈已经成功提交，感谢您的意见！您可以继续反馈！'
              })
              this.model = {}
            }
          } else {
            this.$alert('请按规则填写信息！', {
              confirmButtonText: '确定'
            })
            return false;
          }
        })
      }
    }
  }
</script>

<style scoped>
  p {
    font-size: 20px;
  }

  .back-card {
    width: 40rem;
    margin: 4rem auto;
  }


</style>