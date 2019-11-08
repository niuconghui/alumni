<template>
  <el-card class="box-card" shadow="hover">
    <div >
      <div slot="header" class="clearfix">
        <h3>{{ images.title }}</h3>
      </div>
      <div class="demo-image">
        <div class="block" >
          <el-image
            style="width: 300px; height: 150px"
            :src="images.image"
            :preview-src-list="srcList"
            :fits="fits"></el-image>
        </div>
      </div>
      <el-divider></el-divider>
      <span> {{ images.description}} </span>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    images: Object,
  },
  data() {
    return {
        fits: 'contain',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ]
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