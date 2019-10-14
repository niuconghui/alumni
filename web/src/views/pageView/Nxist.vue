<template>
    <div id="app" class="wrapper">
      <nav-header></nav-header>
      <nav-bar></nav-bar>
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
      <el-backtop target=".wrapper" :bottom="70" class="backtop">
      </el-backtop>
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
    name: 'App',
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


<style  scoped>
  .wrapper {
    height: 100vh;
    overflow: hidden;
    overflow-y: scroll;
  }
 
  .backtop {
    color: #640000!important;
  }

  .backtop:hover {
    background-color: #FFEBCD!important;
  }

</style>