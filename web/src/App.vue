<template>
  <div id="app">
    <nav-header></nav-header>
    <nav-bar></nav-bar>
    <div class="main-view">
      <keep-alive>
        <main-view></main-view>
        <router-view/>
      </keep-alive>
      <sidebar class="sidebar"></sidebar>
    </div>
  </div>
</template>

<script>
  import NavHeader from './components/header/NavHeader'
  import NavBar from './components/navbar/NavBar'
  import MainView from './components/mainview/MainView'
  import Sidebar from './components/sidebar/Sidebar'
  export default {
    name: 'App',
    components: {
      NavHeader,
      NavBar,
      MainView,
      Sidebar
    },
  }
</script>

<style>
  .main-view {
    background-color: #F4F5F5;
    display: flex;
    
  }
  

</style>
