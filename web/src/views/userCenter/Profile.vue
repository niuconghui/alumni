<template>
  <div class="profile">
    <el-form label-width="100px" ref='userInfoForm' :model="model" :rules="rules">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="基本信息" name="first">
          <el-form-item label="头像：">
            <el-upload
              class="avatar"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="afterApload"
            >
              <img v-if="model.avatar !== undefined" :src="model.avatar" />
              <img src="~assets/img/avatar.png" alt="" v-else>
            </el-upload>
          </el-form-item>
          <el-form-item label="用户名：" prop="studentName">
            <el-col :span="8">
              <el-input v-model="model.studentName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="真实姓名：" prop="trueName">
            <el-col :span="8">
              <el-input v-model="model.trueName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="性别：">
            <el-radio v-model="model.gender" label="男">男</el-radio>
            <el-radio v-model="model.gender" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="手机号：" prop="phoneID">
            <el-col :span="8">
              <el-input v-model="model.phoneID"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="邮箱：" prop="email">
            <el-col :span="8">
              <el-input v-model="model.email"></el-input>
            </el-col>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="院系信息" name="second">
          <el-form-item label="学号：" prop="studentID">
            <el-col :span="10">
              <el-input v-model="model.studentID"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="所在院系：">
            <el-col :span="10">
              <div class="block">
                <el-cascader
                  v-model="model.department"
                  :options="departments"
                  :props="{ expandTrigger: 'hover', checkStrictly: true  }"
                ></el-cascader>
              </div>
            </el-col>
          </el-form-item>
          <el-form-item label="入学时间：">
            <el-date-picker
              v-model="model.startYear"
              type="month"
              format="yyyy 年 MM 月"
              value-format="yyyy-MM"
              placeholder="选择月"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="毕业时间：">
            <el-date-picker
              v-model="model.endYear"
              type="month"
              format="yyyy 年 MM 月"
              value-format="yyyy-MM"
              placeholder="选择月"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="年级：">
            <el-select v-model="model.grade" placeholder="年级">
              <el-option
                v-for="item in grades"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="家庭信息" name="third">
          <el-form-item label="出生地址：">
            <el-col :span="8">
              <div class="block">
                <el-cascader
                  v-model="model.birthplace"
                  :options="cities"
                  :props="{ expandTrigger: 'hover', checkStrictly: true }"
                ></el-cascader>
              </div>
            </el-col>
          </el-form-item>
          <el-form-item label="现居地址：">
            <el-col :span="8">
              <div class="block">
                <el-cascader
                  v-model="model.address"
                  :options="cities"
                  :props="{ expandTrigger: 'hover', checkStrictly: true }"
                ></el-cascader>
              </div>
            </el-col>
          </el-form-item>
          <el-form-item label="单位名称：">
            <el-col :span="12">
              <el-input v-model="model.company_name" placeholder="请输入单位名称"></el-input>
            </el-col>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="其他" name="fourth">
          <el-form-item label="生日：">
            <el-date-picker
              v-model="model.birthday"
              type="datetime"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="座右铭：">
            <el-input v-model="model.motto" type="textarea"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-form-item>
          <el-button type="primary" @click="saveUserInfo('userInfoForm')">保存</el-button>
        </el-form-item>
      </el-tabs>
      
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "Profile",
  data() {
    const validateName = async (rule, value, callback) => {
      if (value === this.valiModel.studentName) return callback()
      const res = await this.$api.user.checkUsername(value)
      if (res.data.code === 0) {
        callback()
      } else {
        callback(new Error(res.data.msg))
      }
    }
    const validateStudentID = async (rule, value, callback) => {
      if (value === this.valiModel.studentID) return callback()
      if (value.length !== 8 ) return callback(new Error('学号必须是 8 位'))
      const res = await this.$api.user.getSUsers(value)
      if (res.data.code === 0) {
        callback()
      } else {
        callback(new Error(res.data.msg))
      }
    }
    const validateEmail = async (rule, value, callback) => {
      if (value === this.valiModel.email) return callback()
      const res = await this.$api.user.checkEmail(value)
      console.log(res)
      if (res.data.code === 0) {
        callback()
      } else {
        callback(new Error(res.data.msg))
      }
    }
    return {
      model: {},
      valiModel: {
        studentName: '',
        studentID: '',
        email: ''
      },
      activeName: "first",
      uploadUrl: "http://localhost:3000/web/api/upload",
      departments: [],
      cities: [],
      grades: [{
          value: 'first',
          label: '大一'
        }, {
          value: 'second',
          label: '大二'
        },
        {
          value: 'third',
          label: '大三'
        },
        {
          value: 'four',
          label: '大四'
        }],
      rules: {
        studentName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 9, message: '用户名长度必须在 3 到 9 个字符之间！', trigger: 'blur' },
          { validator: validateName, trigger: 'blur' }
        ],
        studentID: [
          { required: true, message: '请输入学号', trigger: 'blur' },
          { validator: validateStudentID, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱号', trigger:'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        phoneID: [
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger:'blur' },
        ]
      },
    };
  },
  created() {
    this._getUser()
    this._getDepartments()
    this._getCities()
  },
  methods: {
    ...mapActions(["setAvatar"]),
    // ------------------------------- 网络请求 --------------------------------
    afterApload(res) { // 图片上传完成后显示
      this.$set(this.model, "avatar", res.url);
      console.log('我是上传完图片还没点击保存' + res.url)
    },

    async _getUser() {
      const res = await this.$api.user.getUserInfo()
      this.model = res.data.data.user
      this.valiModel.studentName = res.data.data.user.studentName
      this.valiModel.studentID = res.data.data.user.studentID
      this.valiModel.email = res.data.data.user.email
    },

    async _getDepartments() {
      const department = await this.$api.user.getDepartments()
      const items = department.data.data
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

    async _getCities() {
      const city= await this.$api.user.getCities()
      const items = city.data.data
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

    // -------------------------------- 事件监听 --------------------------------
    async saveUserInfo(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.user.saveUserInfo(this.model)
          if (res.data.code === 0) {
            this.$message({ type: 'success', message: '保存成功' })
            this.setAvatar(this.model.avatar)
            this._getUser()
          }
        } else {
          this.$message.warning('请填写正确信息')
          return false;
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.el-tabs {
  min-height: 35vw;
  .avatar {
    height: 5vw;
    width: 5vw;
    text-align: center;
    line-height: 5vw;
    border: 1px dashed $gray-2;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.el-cascader {
  width: 100%;
}
</style>
