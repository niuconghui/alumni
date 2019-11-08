<template>
  <div id="nxist" class="wrapper">
      <div class="header">
        <nav-header></nav-header>
        <nav-bar></nav-bar>
      </div>
        <div class="main">
        <main-view></main-view>
        <div class="sidebar">
          <sidebar>广告位1</sidebar>
          <sidebar>广告位2</sidebar>
        </div>
      </div>
      <div name="myfooter">
        <my-footer></my-footer>
      </div>
    <feed-button></feed-button>
    <el-backtop target=".wrapper" :bottom="70" class="backtop"></el-backtop>
  </div>
</template>

<script>
  import NavHeader from 'components/header/NavHeader'
  import NavBar from 'components/navbar/NavBar'
  import MainView from 'components/mainview/MainView'
  import Sidebar from 'components/sidebar/Sidebar'
  import MyFooter from 'components/footer/MyFooter'
  import FeedButton from 'components/feedback/FeedButton'

  export default {
    name: 'Nxist',
    components: {
      NavHeader,
      NavBar,
      MainView,
      Sidebar,
      MyFooter,
      FeedButton,
    },
  }
</script>


<style>
  .header {
    /* position:relative; */
  }
 
  .wrapper {
    height: 100vh;
    overflow: hidden;
    overflow-y: scroll;
    position: relative;
  }
 
  .backtop {
    color: #640000!important;
  }

  .backtop:hover {
    background-color: #FFEBCD!important;
  }

</style>