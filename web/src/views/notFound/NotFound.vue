<template>
  <div id="main-view" class="wrapper">
    <div class="header">
      <nav-header />
      <nav-bar />
    </div>
    <div class="main">
      <div class="img">
        <img src="~assets/img/bg404.png" alt="">
        <img src="~assets/img/panfish.png" alt="" class="panfish">
        <img src="~assets/img/sea.png" alt="">
        <img src="~assets/img/spray.png" alt="">
        <div class="back-home text-c">
          <el-button type="primary" @click="handleBackHome">回到首页</el-button>
        </div>
      </div>
     
      <feed-button class="feed-back"/>
    </div>
  </div>
</template>

<script>
  import NavHeader from 'components/header/NavHeader'
  import NavBar from 'components/navbar/NavBar'

  import FeedButton from 'components/feedback/FeedButton'

  export default {
    name: 'NotFound',
    components: {
      NavHeader,
      NavBar,
      FeedButton
    },
    methods: {
      handleBackHome() {
        this.$router.push('/')
      }
    },
  }
</script>


<style lang="scss" scoped>
  .wrapper {
    position: relative;
    background-color: #fff;
  }
 

  .header {
    position: sticky;
    top: 0;
    z-index: 999;
    margin:  0 auto;
    width: 100%;
  }

  .main {
    position: relative;
    margin: 2vw 0 0 0 ;
    width: 100%;
    background-color: #fff;
    .img {
      position: relative;
      margin: auto;
      width: 70vw;
      height: 40vw;
      text-align: center;
      img:nth-child(1){
        margin: auto;
        width: 484px;
        height: 307px;
      }
      img:nth-child(2){
        position: absolute;
        left: 42.5%;
        top: 36.5%;
        margin: auto;
        width: 131px;
        height: 153px;
        z-index: 2;
        animation: panfish 3s ease-in-out infinite alternate;
      }
      img:nth-child(3){
        position: absolute;
        left: 18%;
        top: 51%;
        width: 619px;
        height: 167px;
        opacity: .7;
      }
      img:nth-child(4){
        position: absolute;
        left: 35%;
        top: 53%;
        width: 253px;
        height: 85px;
        opacity: .4;
        z-index: 3;
      }

      @keyframes panfish {
        0%, 100% {
          transform: translateY(10px)
        }
        50% {
          transform: translateY(0)
        }
      }
    }
  }

  .back-home {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 5vw;
    background-color: #fff;
    button {
      width: 10vw;
      height: 3.5vw;
      font-size: 1.2rem;
    }
  }

  .feed-back {
    position: fixed;
    bottom: 1%;
    left: 95%;
  }

</style>