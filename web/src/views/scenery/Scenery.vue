<template>
  <div class="scroll">
    <carousel></carousel>
    <div class="scenery">
      <scenery-item  class="scenery-item"></scenery-item>
      <scenery-item  class="scenery-item"></scenery-item>
    </div>
  </div>
</template>

<script>
  import Carousel from '../../components/carousel/Carousel'
  import SceneryItem from './SceneryItem'

  export default {

    components: {
      Carousel,
      SceneryItem
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

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }

  .scenery {
    display: flex;
    justify-content: space-between;
  }

  .scenery-item {
    margin: auto;
    margin-top: 15px;
    width: 340px;
    flex-grow: 0.1
  }

</style>