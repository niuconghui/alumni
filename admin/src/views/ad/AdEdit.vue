<template>
  <div>
    <el-card>
      <h1>{{this.id ? '修改' : '添加'}}广告</h1>
      <el-form label-width="120px">
        <el-form-item label="标题：" >
          <el-input v-model="model.title"></el-input>
        </el-form-item>
        <el-form-item label="图片：" >
          <el-upload
            class="uploader"
            :action="uploadUrl"
            :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="afterApload">
            <img v-if="model.coverSrc" :src="model.coverSrc" class="scenery">
            <i v-else class="el-icon-plus scenery-uploader-icon"></i>
          </el-upload>
        </el-form-item>
         <el-form-item label="描述：" >
          <el-input type="textarea" :row="2" v-model="model.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>  
  </div>
</template>

<script>
export default {
  props: {id: {}},
  data() {
    return {
      model: {
       imgList: [], 
      },
    }
  },
  methods: {
    afterApload (res) {
      this.$set(this.model,'coverSrc',res.url)
    },
    async save () {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/ads/${this.id}`,this.model)
      } else {
        await this.$http.post('rest/ads',this.model)
      }
      this.$router.push('/ad/list')
      this.$message({
        type: 'success',
        message: '保存成功了'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/ads/${this.id}`)
      this.model = res.data
    }
  },
  created() {
    this.id && this.fetch()
  },
}
</script>

<style scoped>
.img-list-icon {
  border: 1px dashed #d9d9d9;
  width: 20vw;
  height: 20vh;
  font-size: 1.5rem;
  color: #999;
  text-align: center;
  line-height: 20vh;
}

.img-list-icon img {
  width: 20vw;
  height: 20vh;
}
.uploader .el-upload {
  border: 1px dashed #d9d9d9;
  
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.uploader img {
  width: 10vw;
  height: 10vw;
}
  /* .scenery-uploader .el-upload:hover {
    border-color: #409EFF;
  } */
  /* .scenery-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 280px;
    height: 80px;
    margin-top: 50px;
  } */
  /* .scenery {
    width: 300px;
    height: 150px;
    display: block;
  } */
</style>