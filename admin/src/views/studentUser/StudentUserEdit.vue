<template>
  <div>
    <el-card>
      <h1>{{this.id ? '修改' : '添加'}}用户</h1>
      <el-form label-width="120px">
        <el-form-item label="用户名：" >
          <el-input v-model="model.studentName"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item label="头像：">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="afterApload">
            <img v-if="model.avatar" :src="model.avatar" class="avatar">
            <i v-else class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="真实姓名：">
          <el-input v-model="model.trueName"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio v-model="model.gender" label="男">男</el-radio>
          <el-radio v-model="model.gender" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="学号：">
          <el-input v-model="model.studentID"></el-input>
        </el-form-item>
        <el-form-item label="所在院系：">
          <div class="block">
            <el-cascader
              v-model="model.department"
              :options="departments"
              :props="{ expandTrigger: 'hover' }"
              ></el-cascader>
          </div>
        </el-form-item>
        <el-form-item label="入学时间：">
          <el-date-picker
            v-model="model.startYear"
            type="month"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
            placeholder="选择月">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="毕业时间：">
          <el-date-picker
            v-model="model.endYear"
            type="month"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
            placeholder="选择月">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="model.phoneID"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="model.email"></el-input>
        </el-form-item>
        <el-form-item label="出生地址：">
          <div class="block">
            <el-cascader
              v-model="model.birthplace"
              :options="cities"
              :props="{ expandTrigger: 'hover' }"
              ></el-cascader>
          </div>
        </el-form-item>
        <el-form-item label="现居地址：">
          <div class="block">
            <el-cascader
              v-model="model.address"
              :options="cities"
              :props="{ expandTrigger: 'hover' }"
              ></el-cascader>
          </div>
        </el-form-item>
        <el-form-item label="单位名称：">
          <el-input v-model="model.company_name" placeholder="请输入单位名称"></el-input>
        </el-form-item>
        <el-form-item label="生日：">
          <el-date-picker
            v-model="model.birthday"
            type="datetime"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="座右铭：">
          <el-input v-model="model.motto"></el-input>
        </el-form-item>
        <el-form-item label="状态码：">
          <el-radio v-model="model.status" label='0'>0</el-radio>
          <el-radio v-model="model.status" label='1'>1</el-radio>
          <el-radio v-model="model.status" label='2'>2</el-radio>
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
      value: [],
      departments: [],
      cities: [],
    }
  },
  created() {
    this.getClass()
    this.getCity()
    this.id && this.fetch()
  },
  methods: {
    async save () {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/StudentUsers/${this.id}`,this.model)
        console.log(res)
      } else {
        res = await this.$http.post('rest/StudentUsers',this.model)
        console.log(res)
      }
      this.$router.push('/studentUser/list')
      this.$message({
        type: 'success',
        message: '保存成功了'
      })
    },

    async fetch () { // 修改的时候从数据库读取数据
      const res = await this.$http.get(`rest/StudentUsers/${this.id}`)
      this.model = res.data
    },
    
    afterApload (res) { // 图片上传完成后显示
      this.$set(this.model,'avatar',res.url)
    },

    async getClass() { // 获取院系班级三级联动
      const department = await this.$http.get(`rest/secClasses`)
      const items = department.data.items
      this.departments = items.map((item) => {
      
        return {
          value: item.sec_name,
          label: item.sec_name,
          children: item.major.map((item) => {
            return {
              value: item.major_name,
              label: item.major_name,
              children: item.class.map((item) => {
                return {
                  value: item.class_name,
                  label: item.class_name
                }
              })
            }
          })
        }
      })
    },

    async getCity() { // 获取省市三级联动
      const city= await this.$http.get(`rest/cities`)
      const items = city.data.items
      this.cities = items.map((item) => {
      
        return {
          value: item.name,
          label: item.name,
          children: item.city.map((item) => {
            return {
              value: item.name,
              label: item.name,
              children: item.area.map((item) => {
                return {
                  value: item.name,
                  label: item.name
                }
              })
            }
          })
        }
      })
    },
  },
  
}
</script>

<style scoped>
  .avatar-uploader {
    width: 5.5vw;
    height: 5.5vw;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    font-size: 1.5rem;
    text-align: center;
    line-height: 5.5vw;
    cursor: pointer; 
  }
  .avatar {
    padding: 0.25vw;
    width: 4.9vw;
    height: 4.9vw;
  }


</style>