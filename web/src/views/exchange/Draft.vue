<template>
  <div class="draft">
    <div class="nav d-flex ">
      <el-col :span="2"></el-col>
      <el-col :span="19"><img src="~assets/img/nxist.png" alt=""></el-col>
      <el-button type="primary" @click="submit('draftForm')">发表</el-button>
    </div>

    <div class="content d-flex">
      <el-col :span="2"></el-col>
      <el-col :span="20">
        <el-form :model="model" :rules=rules ref="draftForm">
          <el-form-item prop="category">
            <el-select v-model="model.category" placeholder="请选择分类">
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.title"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="title">
            <el-input placeholder="请输入标题" v-model="model.title"></el-input>
          </el-form-item>

          <el-form-item prop="content">
            <vue-editor v-model="model.content" />
          </el-form-item>
        </el-form>
      </el-col>

    </div>
  </div>
</template>

<script>
  import { VueEditor } from "vue2-editor"

  export default {
    name: 'Draft',
    data() {
      return {
        model: {
          userId: this.$store.state.userId
        },
        categories: [],
        rules: {
          category: [
            { required: true, message: '分类不能为空！', trigger: 'change' },
          ],
          title: [
            { required: true, message: '标题不能为空！', trigger: 'blur' },
          ],
          content: [
            { required: true, message: '内容不能为空！', trigger: 'blur' },
          ]
        },
      }
    },
    components: { VueEditor },
    created() {
      this._getCategories()
    },
    methods: {
      async _getCategories() {
        const res = await this.$api.exchange.getCategory()
        if (res.data.code === 0) {
          this.categories = res.data.data.splice(2, res.data.data.length-2)
        } 
      },

      submit(draftForm) {
        this.$refs['draftForm'].validate(async valid => {
          if (valid) {
            const res = await this.$api.exchange.saveExchange(this.model)
            if (res.data.code === 0) {
              this.$message({
                type: 'successd',
                message: '发表成功了'
              })
              this.$router.push('/exchange')
            }
            console.log(res)
          } else {
            this.$message({
              type: 'error',
              message: '请正确填写信息'
            })
          }
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
.draft {
  height: 100vh;
  background-color: $white;
  .nav {
    width: 100%;
    height: 5vw;
    // background-color: #999;
    align-items: center;
  }

  .content {
    margin: 2vw 0 2vw 0 ;
  }
}
 
</style>
