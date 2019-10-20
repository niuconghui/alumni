<template>
  <div>
    <div class="demeanot-item">
      <img src="~assets/images/demean.png" alt="" >
      <div>
        <el-link  class="title" :underline="false">标题</el-link>
        <div class="time">时间</div>
        <div class="text">默认情况下，项目都排在一条线（又称默认情况下，项目都排在一条线（又又称"轴....</div>
      </div>
    </div>
    <div class="demeanot-item">
      <img src="~assets/images/demean.png" alt="" >
      <div>
        <el-link  class="title" :underline="false">标题</el-link>
        <div class="time">时间：</div>
        <div class="text">默认情况下，项目都排在一条线（又称默认情况下，项目都排在一条线（又又称"轴....</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  
}
</script>


<style scoped>
  
  .demeanot-item {
    width: 100%;
    height: 100px;
    background-color: #fff;
    display: flex;
    /* flex-wrap: wrap; */
    /* align-content: space-around; */
    margin-top: 40px;
    /* margin: 20px; */
  }

  img {
    width: 160px;
    height: 100px;
  }


  .title {
    margin-left: 10px;
    font-size: 16px!important;
  }

  .title:hover {
    color: #640000!important;
  }

   .time {
    width: 100px;
    height: 16px;;
    background-color: #fff;
    font-size: 12px;
    margin-left: 10px;
    margin-top: 10px;
  }

  .text {
    background-color: #fff;
    margin-left: 10px;
    margin-top: 10px;
    font-size: 14px;
    overflow: hidden;
  }
</style>