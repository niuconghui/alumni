<template>
  <div>
    <el-card>
      <h1>{{this.id ? '修改' : '添加'}}反馈</h1>
      <el-form label-width="120px">
        <el-form-item label="反馈类型：" >
            <el-input v-model="model.category"></el-input>
        </el-form-item>
        <el-form-item label="问题描述：">
          <el-input v-model="model.problemDesc" 
            type="textarea"
            :rows="2"
            placeholder="请输入问题详情"></el-input>
        </el-form-item>
        <el-form-item label="qq：">
          <el-input v-model="model.qq"></el-input>
        </el-form-item>
        <el-form-item label="微信：">
          <el-input v-model="model.weChat"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="model.email"></el-input>
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
      model: {},
      
    }
  },
  methods: {
    async save () {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/feedback/${this.id}`,this.model)
      } else {
        await this.$http.post('rest/feedback',this.model)
      }
      this.$router.push('/feedback/list')
      this.$message({
        type: 'success',
        message: '保存成功了'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/feedback/${this.id}`)
      this.model = res.data
    },
    addCityName() {
      this.id && this.fetch()
      this.model.city.push({})
    },
    addCounty(area) {
      area.push({})
    }
  },
  created() {
    this.id && this.fetch()
  },
}
</script>

<style scoped>

</style>