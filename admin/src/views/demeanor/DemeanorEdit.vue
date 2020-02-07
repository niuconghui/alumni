<template>
  <div>
    <el-card>
      <h1>{{this.id ? '修改' : '添加'}}校友风采</h1>
      <el-form label-width="120px">
        <el-form-item label="标题：" >
          <el-input v-model="model.title"></el-input>
        </el-form-item>
        <el-form-item label="信息封面：">
          <el-upload
            class="cover-img"
            :action="uploadUrl"
            :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="afterApload">
            <img v-if="model.coverSrc" :src="model.coverSrc" class="cover-img">
            <i v-else class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="作者：" >
          <el-input v-model="model.author"></el-input>
        </el-form-item>
        <el-form-item label="校友名字：" >
          <el-input v-model="model.excellentName"></el-input>
        </el-form-item>
        <el-form-item label="标签：" >
          <el-input v-model="model.tag"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
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
        model: {},
      }
    },
    created() {
      this.id && this.fetch()
    },
    methods: {
      // 富文本编辑器图片上传
      async handleImageAdded (file, Editor, cursorLocation, resetUploader) { 
        const formData = new FormData();
        formData.append("file", file);
        const res = await this.$http.post('upload',formData)
        Editor.insertEmbed(cursorLocation, "image", res.data.url);
        resetUploader();
      },

      afterApload (res) { // 图片上传完成后显示
        this.$set(this.model,'coverSrc',res.url)
      },

      async save () {
        let res
        if (this.id) {
          res = await this.$http.put(`rest/demeanor/${this.id}`,this.model)
        } else {
          await this.$http.post('rest/demeanor',this.model)
        }
        this.$router.push('/demeanor/list')
        this.$message({
          type: 'success',
          message: '保存成功了'
        })
      },

      async fetch () {
        const res = await this.$http.get(`rest/demeanor/${this.id}`)
        this.model = res.data
      }
    },
    
  }
</script>

<style >
  .cover-img {
    width: 15vw;
    height: 15vh;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    font-size: 1.5rem;
    text-align: center;
    line-height: 15vh;
    cursor: pointer; 
  }
  /* .cover {
    padding: 0.25vw;
    width: 4.9vw;
    height: 4.9vw;
  } */
</style>