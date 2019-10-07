<template>
  <el-card class="box-card wrapper">
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

<style scoped>
  .wrapper {
    width: 56%;
    height: 80vh;
    background-color: #fff;
    margin-left:12.5%;
    margin-top:1%;
  }

</style>