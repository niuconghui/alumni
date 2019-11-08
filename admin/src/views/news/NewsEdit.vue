<template>
  <div>
    <h1>{{this.id ? '修改' : '添加'}}新闻</h1>
    <el-form label-width="120px">
      <el-form-item label="标题：" >
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="作者：" >
        <el-input v-model="model.author"></el-input>
      </el-form-item>
      <el-form-item label="分类：" >
        <el-select v-model="model.tag" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.lable"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新闻内容：">
        <vue-editor v-model="model.content"
        useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item label="发表时间：" >
        <div class="block">
          <el-date-picker
            v-model="model.issueTime"
            type="datetime"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
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
      }
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
          res = await this.$http.put(`rest/news/${this.id}`,this.model)
        } else {
          await this.$http.post('rest/news',this.model)
        }
        this.$router.push('/news/list')
        this.$message({
          type: 'success',
          message: '保存成功了'
        })
      },
      async fetch () {
        const res = await this.$http.get(`rest/news/${this.id}`)
        this.model = res.data
      }
    },
    created() {
      this.id && this.fetch()
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