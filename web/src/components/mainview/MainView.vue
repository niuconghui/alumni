<template>
    <el-card class="box-card mwrapper">
        <router-view></router-view>
    </el-card>
</template>

<script>

  export default {
    data () {
      return {
        
      }
    },
    components: {

    }
  }
</script>

<style>
  .mwrapper {
    width: 55%;
    height: 100%;
    background-color: #fff;
    margin-left:12.5%;
    margin-top:1%;
  }

  .main {
    background-color: #F4F5F5;
    display: flex;
    flex-wrap: wrap;
  }


</style>