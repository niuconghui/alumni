<template>
  <div>
    <h1>{{this.id ? '修改' : '添加'}}源校友学号</h1>
    <el-form label-width="120px">
      <el-form-item label="学号：" >
        <el-input v-model="model.studentSID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
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
        res = await this.$http.put(`rest/sourceUsers/${this.id}`,this.model)
      } else {
        await this.$http.post('rest/sourceUsers',this.model)
      }
      this.$router.push('/sourceUser/list')
      this.$message({
        type: 'success',
        message: '保存成功了'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/sourceUsers/${this.id}`)
      this.model = res.data
    }
  },
  created() {
    this.id && this.fetch()
  },
}
</script>

<style scoped>

</style>