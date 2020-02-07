<template>
  <div>
    <el-card>
      <h1>{{this.id ? '修改' : '添加'}}评论</h1>
      <el-form label-width="120px">
        <el-form-item label="评论用户：" >
          <el-input v-model="model.userId"></el-input>
        </el-form-item>
        <el-form-item label="评论交流：" >
          <el-input v-model="model.exchangeId"></el-input>
        </el-form-item>
        <el-form-item label="评论内容：" >
          <el-input v-model="model.content"></el-input>
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

    props: { id: {} },
    data() {
      return {
        model: {},
      }
    },

    created() {
      this.id && this.fetch()
    },

    methods: {
      async save () {
        let res
        if (this.id) {
          res = await this.$http.put(`rest/comment/${this.id}`,this.model)
        } else {
          await this.$http.post('rest/comment',this.model)
        }
        this.$router.push('/comment/list')
        this.$message({
          type: 'success',
          message: '保存成功了'
        })
      },

      async fetch () {
        const res = await this.$http.get(`rest/comment/${this.id}`)
        this.model = res.data
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