<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <span>风景标题</span>
    </div>
    <div class="demo-image">
      <div class="block" >
        <el-image
          style="width: 300px; height: 150px"
          :src="url"
          :fits="fits"></el-image>
      </div>
    </div>
    <el-divider></el-divider>
    <span>这里是风景的描述这里是风景的描述这里是风景的描述这里是风景的描述这里是风景的描述这里是风景的描述</span>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
        fits: 'contain',
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
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