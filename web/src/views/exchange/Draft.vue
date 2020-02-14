<template>
  <div class="draft">
    <div class="nav d-flex ">
      <el-col :span="2"></el-col>
      <el-col :span="19"><img src="~assets/img/nxist.png" alt=""></el-col>
      <el-button type="primary" @click="submit('draftForm')">
        {{this.id? '保存' : '发表'}}
      </el-button>
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
            <vue-editor 
              v-model="model.content"
              useCustomImageHandler 
              @image-added="handleImageAdded" 
            />
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
    props: { id: {} },
    data() {
      return {
        model: {
          userId: this.$store.state.userId,
          category: '',
          title: '',
          content: ''
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
      this._getDraft()
    },
    methods: {
      async _getDraft() {
        const res = await this.$api.exchange.getExchangeDetail(this.id)
        if (res.data.code === 0) {
          this.model = res.data.data.items
        }
      },

      async _getCategories() {
        const res = await this.$api.exchange.getCategory()
        if (res.data.code === 0) {
          this.categories = res.data.data.splice(2, res.data.data.length-2)
        } 
      },

      async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await this.$api.exchange.uploadImg(formData)
        Editor.insertEmbed(cursorLocation, "image", res.data.url);
        resetUploader();
      },

      submit(draftForm) {
        this.$refs['draftForm'].validate(async valid => {
          if (valid) {
            let res
            if (this.id) {
              res = await this.$api.exchange.updateExchange({
                _id: this.id,
                category: this.model.category,
                title: this.model.title,
                content: this.model.content
              })
              console.log(res)
              if (res.data.code === 0) {
                  this.$message({
                    type: 'success',
                    message: '保存成功了'
                  })
                  this.$router.push(`/user/center/${this.$store.state.userId}/activities`)
                }
            } else {
              res = await this.$api.exchange.saveExchange(this.model)
                if (res.data.code === 0) {
                  this.$message({
                    type: 'success',
                    message: '发表成功了'
                  })
                  this.$router.push('/exchange')
                }
            }
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
