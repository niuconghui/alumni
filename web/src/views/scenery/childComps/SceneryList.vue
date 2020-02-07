<template>
  <div class="scenery-list d-flex flex-wrap just-between">
    <scenery-item 
      class="scenery-item" 
      v-for="(item, index) in imagelist" 
      :key="index" :images="item" 
    />
  </div>
</template>

<script>
import SceneryItem from './SceneryItem'

export default {
  props: {
    imagelist: Array,
  },
  components: {
    SceneryItem
  },
}
</script>

<style scoped>

  .scenery-item {
    margin: 1vw 1.5vw 1vw 1.5vw;
    width: 32vw;
    
  }
</style>