<template>
  <div class="demeanor">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="省市分布" name="first">
        <china-map  v-if="province.length" :userJson="province"/>
      </el-tab-pane>
      <el-tab-pane label="精准检索" name="second">
        <el-row class="el-row-head">
          <el-col :span="24">
            <el-input 
              placeholder="请输入关键字" 
              v-model="model.keyword" 
              clearable>
              <el-button slot="append" @click="getSearch" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
        </el-row>
        <el-row  class="el-row-head" :gutter="20">

          <el-col :span="4">
            <el-cascader
              :options="cities"
              size="mini"
              :props="{ checkStrictly: true }"
              v-model="model.address"
              placeholder="地址"
              clearable />
          </el-col>

          <el-col :span="4">
            <el-cascader
              :options="departments"
              size="mini"
              placeholder="院系班级"
              v-model="model.department"
              :props="{ checkStrictly: true }"
              clearable />
          </el-col>

          <el-col :span="4">
            <el-select v-model="model.gender" size="mini" placeholder="性别" clearable>
              <el-option
                v-for="item in sexs"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
              </el-option>
            </el-select>
          </el-col>

          <el-col :span="4">
            <el-select v-model="model.grade" size="mini" placeholder="年级" clearable>
              <el-option
                v-for="item in grades"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <div class="search" v-if="targetUsers.length">
          <div>找到 {{targetUsers.length}} 个人</div>
          <ul class="search-list d-flex ">
            <li 
              class="d-flex" 
              v-for="item in targetUsers"
              :key="item._id">
              <img src="~assets/img/avatar.png" alt="">
              <div>
                <span>{{item.studentName}}({{item.studentID}})</span>
                <el-button 
                  type="primary" 
                  size="mini" 
                  @click="viewUser(item._id)">
                  查看<i class="el-icon-plus el-icon--right"></i>
                </el-button>
              </div>
            </li>
          </ul>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-container>
      <el-aside width="150px" >
        <el-menu 
          :default-active="$route.path"
          class="el-menu" 
          router
          >
            <el-menu-item index="/demeanor/academician" class="menu-item">院士风采</el-menu-item>
            <el-menu-item index="/demeanor/alumni" class="menu-item">杰出校友</el-menu-item>
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import ChinaMap from './childComps/ChinaMap'

  export default {
    components: {
      ChinaMap
    },
    data () {
      return {
        activeIndex: '/demeanor/academician',
        activeName: 'first',
        departments: [],
        cities: [],
        targetUsers: [],
        province: [],
        model: {
          keyword: '',
          address: [],
          gender: '',
          department: [],
          grade: ''
        },
        sexs: [{
          value: '男',
          label: '男'
        }, {
          value: '女',
          label: '女'
        }],
        grades: [{
          value: '大一',
          label: '大一'
        }, {
          value: '大二',
          label: '大二'
        },
        {
          value: '大三',
          label: '大三'
        },
        {
          value: '大四',
          label: '大四'
        }],
      }
    },
    created() {
      this._getDepartments()
      this._getCities()
      this._getProvince()
    },
    watch: {
      "model": {
        handler() {
          this.getSearch()
        },
        deep: true
      }
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      },

      viewUser(id) {
        let routerData = this.$router.resolve({
          path: `/user/center/${id}`
        })
        window.open(routerData.href, '_blank')
      },

      async getSearch() {
        const res = await this.$api.demeanor.getSearch(this.model)
        if (res.data.code === 0) {
          if (res.data.data.length === 0) {
            this.targetUsers = []
            return this.$message.warning('没有符合条件的校友')
          } else {
            this.targetUsers = res.data.data
          }
        } else {
          this.targetUsers = []
        }

        
      },

      async _getProvince() {
        const res = await this.$api.demeanor.getProvince()
        if (res.data.code === 0) {
          const provinceDate = res.data.data
          this.province = Object.entries(provinceDate)
            .filter(item => {
              return item[0] !== "undefined"
            })
            .map(item => {
              let iname
              if (item[0].includes("省")) {
                iname = item[0].split("省")
              } else if (item[0].includes("维吾尔自治区")) {
                iname = item[0].split("维吾尔自治区")
              } else if (item[0].includes("回族自治区")) {
                iname = item[0].split("回族自治区")
              } else if (item[0].includes("壮族自治区")) {
                iname = item[0].split("壮族自治区")
              } else if (item[0].includes("自治区")) {
                iname = item[0].split("自治区")
              } else {
                iname = item[0].split("特别行政区")
              }
              
              return {
                  name: iname[0],
                  value: item[1]
                }
            })
        }
      },

      async _getDepartments() {
        const department = await this.$api.demeanor.getDepartments()
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
        const city= await this.$api.demeanor.getCities()
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
    },
  }
</script>

<style lang="scss" scoped>
  .demeanor {
    background-color: $bgc;
    .search {
      padding: 10px;
      background-color: $white;
      .search-list {
        margin: 0;
        padding: 0;
        width: 100%;
        flex-wrap: wrap;
        justify-content: left;

        li {
          margin: 10px 10px 0 0;
          padding: 10px;
          width: 23%;
          height: 5vw;
          background-color: $white;
          list-style: none;
          img {
            margin-top: 0.2vw;
            padding: 0 0.4vw 1vw 0 ;
            width: 4.5vw;
            height: 4.5vw;
          }

          span {
            display: inline-block;
            margin-bottom: 0.5vw;
          }
        }
        
      }
    }
  }

  .el-tabs {
    // min-height: 20vw;
    background-color: #fff;
  }

  .el-container {
    margin: 1vw 0 0 0;
    background-color: #fff;
  }

  .el-header {
    background-color: #FFFFF0;
    color: #333;
    text-align: left!important;
    font-size: 16px!important;
    line-height: 60px;
  }

  .el-row-head {
    margin-left: 0!important;
    padding: 10px;
    // background-color: $blue-light-1;
    width: 100%;
  }

  .el-col {
    padding-left: 0!important;
  }

</style>