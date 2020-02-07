<template>
  <div>
    <el-carousel height="400px">
      <el-carousel-item v-for="(item, index) in carousels" :key="index">
        <el-image :src="item.coverSrc"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    props: {
      carousels: { type: Array }
    },
    data() {
      return {
        
      }
    },
  }
</script>

<style scoped>

</style>