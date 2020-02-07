<template>
  <div>
    <el-card>
      <h1>{{this.id ? '修改' : '添加'}}校园风光</h1>
      <el-form label-width="120px">
        <el-form-item label="标题：" >
          <el-input v-model="model.title"></el-input>
        </el-form-item>
        <el-form-item label="封面：" >
          <el-upload
            class="scenery-uploader"
            :action="uploadUrl"
            :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="afterApload">
            <img v-if="model.coverSrc" :src="model.coverSrc" class="scenery">
            <i v-else class="el-icon-plus scenery-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="照片列表：">
          <el-button size="small" @click="model.imgList.push({})">
            <i class="el-icon-plus"></i> 添加照片
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="8" v-for="(item, i) in model.imgList" :key="i">
              <el-form-item label="">
                <el-upload
                  class="img-list-icon"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'imgURL', res.url)">
                  <img v-if="item.imgURL" :src="item.imgURL" class="scenery">
                  <i v-else class="el-icon-plus "></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.imgList.splice(i, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
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
        res = await this.$http.put(`rest/sceneries/${this.id}`,this.model)
      } else {
        await this.$http.post('rest/sceneries',this.model)
      }
      this.$router.push('/sceneries/list')
      this.$message({
        type: 'success',
        message: '保存成功了'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/sceneries/${this.id}`)
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
  /* background-color: #666; */
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
  /* .scenery-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  } */
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