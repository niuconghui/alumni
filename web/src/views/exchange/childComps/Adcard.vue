<template>
  <div class="card" v-if="isShow">
    <div class="close-icon" >
      <i class="el-icon-close" @click="closeClick"></i>
    </div>
    <div class="content" >
      <img :src="ad.coverSrc" alt="" v-if="ad.coverSrc">
    </div>
    <div class="text" v-if="ad.description">
      {{ad.description}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Adcard',
    props: {
      ad: { type: Object }
    },
    data() {
      return {
        isShow: true
      }
    },
    created() {
      console.log(this.ad);
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
  .close-icon {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1.5rem;
    width: 10%;
    text-align: right;
    color: #fff;
    background-color: rgba($color: red, $alpha: 0.2);
    cursor: pointer;
  }

  .close-icon:hover {
    background-color: rgba($color: red, $alpha: 0.8);
  }

  .content {
    img {
      width: 100%;
      height: 100%;
    }
  }

  .text {
    position: absolute;
    bottom: 10px;
    left: 5px;
    width: 98%;
    line-height: 2rem;
    color: #333;
    font-size: 2rem;
    display: -webkit-box;
    overflow: hidden;
    white-space: normal;
    -webkit-box-orient: vertical;
  }
}
 
</style>
