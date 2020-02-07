<template>
  <div class="scenery">
    <scenery-carousel :carousel="imageList"></scenery-carousel>
    <scenery-list :imagelist="imageList"></scenery-list>
    
  </div>
</template>

<script>

  import SceneryCarousel from './childComps/SceneryCarousel'
  import SceneryList from './childComps/SceneryList'

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

    created() {
      this._getScenery()
    },

    methods: {
      async _getScenery () {
        const res = await this.$api.scenery.getScenery() 
        this.imageList = res.data.data
      }
    },
    
  }
</script>

<style scoped>
</style>