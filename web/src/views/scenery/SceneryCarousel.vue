<template>
   <div class="block">
    <el-carousel height="400px">
      <el-carousel-item v-for="(item,index) in carousel" :key="index">
        <el-image :src="item.image"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>


<script>
export default {
  props: {
    carousel: Array
  },
  data() {
    return {
      
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  /* .el-carousel__item:nth-child(2n) {
     background:url('../../assets/images/sc1.jpeg')
  } */
  
  /* .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  } */
</style>