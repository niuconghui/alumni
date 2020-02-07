<template>
  <div>
    <el-card>
      <h3>{{this.id ? '修改' : '添加'}}校园交流</h3>
      <el-form label-width="120px">
        <el-form-item label="用户 id：" >
          <el-input v-model="model.userId"></el-input>
        </el-form-item>
        <el-form-item label="分类：" >
          <el-select v-model="model.category" placeholder="请选择">
            <el-option
              v-for="item in categories"
              :key="item._id"
              :label="item.title"
              :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题：" >
          <el-input v-model="model.title"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <vue-editor v-model="model.content"
          useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
        </el-form-item>
        <el-form-item label="点赞数：" >
          <el-input-number 
            v-model="model.starNum" 
            @change="handleChange" 
            :min="1" 
            :max="10" >
          </el-input-number>
        </el-form-item>
        <el-form-item label="评论数：" >
          <el-input-number 
            v-model="model.commentNum" 
            @change="handleChange" 
            :min="1" 
            :max="10" >
          </el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { VueEditor } from "vue2-editor";

  export default {
    components: {
      VueEditor
    },
    props: {id: {}},
    data() {
      return {
        options: [{
          value: '新闻',
          label: '新闻'
        },{
          value: '公告',
          label: '公告'
        }],
        model: {},
        categories: []
      }
    },
    created() {
      this.id && this.fetch()
      this.getCategory()
    },
    methods: {
      async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await this.$http.post('upload',formData)
        Editor.insertEmbed(cursorLocation, "image", res.data.url);
        resetUploader();
      },

      async save () {
        let res
        if (this.id) {
          res = await this.$http.put(`rest/exchange/${this.id}`,this.model)
        } else {
          await this.$http.post('rest/exchange',this.model)
        }
        this.$router.push('/exchange/list')
        this.$message({
          type: 'success',
          message: '保存成功了'
        })
      },

      async fetch () {
        const res = await this.$http.get(`rest/exchange/${this.id}`)
        this.model = res.data
      },

      async getCategory() {
        const res = await this.$http.get('rest/category')
        console.log(res)
        this.categories = res.data.items
      },

      handleChange(value) {
        console.log(value)
      }
    },
    
  }
</script>

<style >
  .scenery-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .scenery-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .scenery-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 280px;
    height: 80px;
    margin-top: 50px;
  }
  .scenery {
    width: 300px;
    height: 150px;
    display: block;
  }
</style>