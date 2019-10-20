<template>
  <div class="scenery">
    <scenery-item class="scenery-item" v-for="(item, index) in imagelist" :key="index" :images="item"></scenery-item>
  </div>
</template>

<script>
import SceneryItem from './SceneryItem'

export default {
  components: {
    SceneryItem
  },
  props: {
    imagelist: Array,
  },
  data () {
    return {
      
    }
  }
  
}
</script>

<style scoped>

  .scenery {
    display: flex;
     flex-wrap:  wrap;
    /* justify-content: space-between; */
  }

  .scenery-item {
    margin: auto;
    margin-top: 15px;
    width: 340px;
    flex-grow: 0.1
  }
</style>