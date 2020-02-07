<template>
  <div class="block" >
    <el-carousel height="400px">
      <el-carousel-item v-for="(item,index) in carousel" :key="index">
        <img :src="item.coverSrc" alt="">
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
  .el-carousel__item  img {
    width:100%;
    height: 100%;
  }

</style>