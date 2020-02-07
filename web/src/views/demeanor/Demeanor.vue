<template>
  <div class="demeanor">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="省市分布" name="first">
        <china-map/>
      </el-tab-pane>
      <el-tab-pane label="男女比例" name="second">
        <div class="gender">
          <el-progress type="circle" :percentage="25"></el-progress>
          <el-progress type="circle" :percentage="65"></el-progress>
        </div>
      </el-tab-pane>
      <el-tab-pane label="年龄区间" name="third">
        <div class="age"></div>
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
        activeName: 'first'
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
  }
</script>

<style lang="scss" scoped>
  .demeanor {
    background-color: $bgc;
  }

  .el-tabs {
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


  .gender {
    height: 400px;
    width: 100%;
    background-color: #fff;
  }

  .age {
    height: 400px;
    width: 100%;
    background-color: #fff;
  }
</style>