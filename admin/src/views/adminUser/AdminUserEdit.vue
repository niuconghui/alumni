<template>
  <div>
    <h1>{{this.id ? '修改' : '添加'}}管理员</h1>
    <el-form label-width="120px">
      <el-form-item label="管理员姓名：" >
        <el-input v-model="model.adminName"></el-input>
      </el-form-item>
      <el-form-item label="管理员密码：" >
        <el-input v-model="model.password"></el-input>
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
        res = await this.$http.put(`rest/AdminUsers/${this.id}`,this.model)
      } else {
        await this.$http.post('rest/AdminUsers',this.model)
      }
      this.$router.push('/adminUser/list')
      this.$message({
        type: 'success',
        message: '保存成功了'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/AdminUsers/${this.id}`)
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