<template>
  <div id="main-view" class="wrapper">
    <div class="header">
      <nav-header />
      <nav-bar />
    </div>
    <div class="main">
      <router-view />
    </div>
    <div id="footer">
      <Footer />
    </div>
    <feed-button class="feed-back"/>
    <el-backtop target="" class="back-top"></el-backtop>
  </div>
</template>

<script>
  import NavHeader from 'components/header/NavHeader'
  import NavBar from 'components/navbar/NavBar'
  import Footer from 'components/footer/Footer'
  import FeedButton from 'components/feedback/FeedButton'

  export default {
    name: 'MainView',
    components: {
      NavHeader,
      NavBar,
      Footer,
      FeedButton,
    },
  }
</script>


<style lang="scss" scoped>
  .wrapper {
    position: relative;
  }
 

  .header {
    position: sticky;
    top: 0;
    z-index: 999;
    margin:  0 auto;
    width: 100%;
  }

  .main {
    margin: 1vw auto 1vw auto;
    width: 70vw;
    background-color: #fff;
  }

  #footer {
    width: 100%;
  }

  .el-backtop {
    position: fixed;
    bottom: 8%!important;
    left: 95%;
  }

  .feed-back {
    position: fixed;
    bottom: 1%;
    left: 95%;
  }

  
</style>