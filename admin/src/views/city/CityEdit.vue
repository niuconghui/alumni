<template>
  <div>
    <el-card>
      <h1>{{this.id ? '修改' : '添加'}}省市</h1>
      <el-form label-width="120px">
        <el-form-item label="省(名称)：" >
            <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="省代码">
          <el-input v-model="model.code"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click=addCityName()>
            <i class="el-icon-plus"></i> 添加市
          </el-button>
        </el-form-item>
          
        <el-form-item>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="24" v-for="(item, i) in model.city" :key="i">
              <el-form-item>
                <el-form-item label="市名称：">
                  <el-input v-model="item.name" placeholder=""></el-input>
                </el-form-item>
                
                <el-form-item label="市代码：">
                  <el-input v-model="item.code"></el-input>
                </el-form-item>

                <div>
                  <el-button type="primary" @click=addCounty(item.area) size="mini">
                    <i class="el-icon-plus"></i> 添加县(区)
                  </el-button>
                  <el-row type="flex" style="flex-wrap: wrap" ref="class">
                    <el-col :md="12" v-for="(area, index) in item.area" :key="index">
                      <el-form-item>
                        <el-form-item label="县(区)名称：">
                          <el-input v-model="area.name"></el-input>
                        </el-form-item>
                        <el-form-item label="县(区)代码：">
                          <el-input v-model="area.code"></el-input>
                          <el-button size="mini" type="danger" @click="item.area.splice(index, 1)">删除县(区)</el-button>
                        </el-form-item>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>

                <el-button size="small" type="danger" @click="model.city.splice(i, 1)">删除市</el-button>
              </el-form-item>
            </el-col>
          </el-row>
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
        city: [{
          area: []  
        }]
      },
      
    }
  },
  methods: {
    async save () {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/cities/${this.id}`,this.model)
      } else {
        await this.$http.post('rest/cities',this.model)
      }
      this.$router.push('/cities/list')
      this.$message({
        type: 'success',
        message: '保存成功了'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/cities/${this.id}`)
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