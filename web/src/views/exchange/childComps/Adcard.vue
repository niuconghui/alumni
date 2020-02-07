<template>
  <div class="card" v-if="isShow">
    <div class="close-icon" >
      <i class="el-icon-close" @click="closeClick"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Adcard',
    data() {
      return {
        isShow: true
      }
    },
    methods: {
      closeClick() {
        this.isShow = false
      }
    },
  }
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  width: 100%;
  height: 20vw;
  background-color: pink;
  .close-icon {
    position: absolute;
    top: 0;
    font-size: 1.5rem;
    width: 100%;
    text-align: right;
  }
}
 
</style>
