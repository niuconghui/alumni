<template>
  <div class="scroll"  >
    <scenery-carousel :carousel="imageList"></scenery-carousel>
    <scenery-list :imagelist="imageList"></scenery-list>
  </div>
</template>

<script>

  import http from 'network/axios'

  import SceneryCarousel from './SceneryCarousel'
  import SceneryList from './SceneryList'

  export default {
    components: {
      SceneryCarousel,
      SceneryList
    },
    data() {
      return {
        imageList: []
      }
    },
    methods: {
      // 获取图片数据
      async getImage () {
        const res = await http.get('scenery')
        this.imageList = res.data
      }
    },
    created() {
      this.getImage()
    },
  }
</script>

<style scoped>

</style>