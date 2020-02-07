<template>
  <div>
    <h1>{{this.id ? '修改' : '添加'}}院系管理</h1>
    <el-form label-width="120px">
      <el-form-item label="二级学院名称：" >
          <el-input v-model="model.sec_name"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="model.major.push({})">
          <i class="el-icon-plus"></i> 添加专业(系)
        </el-button>
      </el-form-item>
        
      <el-form-item>
        <el-row type="flex" style="flex-wrap: wrap">
          <el-col :md="24" v-for="(item, i) in model.major" :key="i">
            <el-form-item label="专业班级：">
              <el-input v-model="item.major_name" placeholder=""></el-input>

              <div>
                <el-button type="primary" @click="item.class.push({})" size="mini">
                  <i class="el-icon-plus"></i> 添加班级
                </el-button>
                <el-row type="flex" style="flex-wrap: wrap" ref="class">
                  <el-col :md="12" v-for="(cla, index) in item.class" :key="index">
                    <el-form-item label="班级名称：">
                      <el-input v-model="cla.class_name"></el-input>
                      <el-button size="mini" type="danger" @click="item.class.splice(index, 1)">删除班级</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <el-button size="small" type="danger" @click="model.major.splice(index, 1)">删除专业</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
      model: {
        // sec_name: '',
        major: [{
          // major_name: '',
          class: [
            // class_name: ''
          ]  
        }]
      },
      isAddMajor: false,
      isAddClass: false
    }
  },
  methods: {
    async save () {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/secClasses/${this.id}`,this.model)
      } else {
        await this.$http.post('rest/secClasses',this.model)
      }
      this.$router.push('/secClass/list')
      this.$message({
        type: 'success',
        message: '保存成功了'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/secClasses/${this.id}`)
      this.model = res.data
    },
  },
  created() {
    this.id && this.fetch()
  },
}
</script>

<style scoped>

</style>