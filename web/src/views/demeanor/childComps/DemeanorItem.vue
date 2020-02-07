<template>
  <div class="demeanor-item d-flex">
    <div class="img">
      <img :src=demeanor.coverSrc alt="" >
    </div>
    <div class="content flex-1">
      <el-link  
        class="title" 
        :underline="false"
        @click="demeanorClick(demeanor._id)">{{demeanor.title}}</el-link>
      <div class="time"><i class="el-icon-timer"></i>时间：{{demeanor.issueTime}}</div>
      <div class="text" v-html="demeanor.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    demeanor: { type: Object }
  },
  methods: {
    demeanorClick(id) {
      this.$emit('demeanorClick', id)
    }
  },
}
</script>


<style lang="scss" scoped>
  
  .demeanor-item {
    margin: 1vw 0 1vw 0;
    width: 56vw;
    height: 10vw;
    border-bottom: 1px solid #c1c1c1
  }

  .img {
    margin: 0 0 50px 0;
    width: 15vw;
    height: 8vw;
    overflow: hidden;
    img {
      
      width: 100%;
      height: 8vw;
      transition: all 0.8s;
    }
    img:hover{transform:scale(1.2);}
  }

  .title {
    margin: 0 0 0 1vw;
    font-size: 16px!important;
  }

  .time {
    margin: 1vw 0 0 1vw;
    width: 100%;
    height: 16px;;
    font-size: 12px;
    color: #999;
  }

  .text {
    height: 4.3vw;
    width: 40vw;
    margin: 0 0 0 1vw;
    font-size: 14px;
    text-overflow:ellipsis;
    overflow: hidden;
  }
</style>