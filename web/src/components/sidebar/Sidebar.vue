<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span><slot></slot></span>
    </div>
  </el-card>
</template>

<script>
export default {
  
}
</script>


<style scoped>
   .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 250px;
    height: 350px;
    margin-left: 8%;
    margin-top: 5%;  
  }
</style>