<template>
  <div id="news">
    <el-container >
      <el-aside width="150px" >
        <el-menu 
          :default-active="activeIndex" 
          class="el-menu" 
          router
          >
          <el-menu-item index="/news/newsCenter" class="menu-item" >新闻中心</el-menu-item>
          <el-menu-item index="/news/newsDeclear" class="menu-item">公告中心</el-menu-item>
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
    export default {
      name: 'News',
      components: {
        
      },
      data() {
        return {
          activeIndex: '/news/newsCenter',
          centerNewsList: [],
          declearNewsList: [],
          page: 1,
          limit: 10
        }
      },

      created() {
      },

      methods: {
        handleCurrentChange() {
          console.log(2222222222)
        }
      },
     
    }
</script>

<style  lang="scss" scoped>
  #news {
    .news-submenu {
      div {
        height: 5vh;
        line-height: 5vh;
        background-color: #666;
      }
      a {
        color: #666;
        text-decoration: none
      }
      .router-link-active {
        padding: .8vw;
        padding-left: .3vw;
        color: $primary;
        border-left: 3px solid $primary
      }
    }
    
    .news-content {
      margin-left: .5vw; 
      flex: 1;
    }
    
  }
  
</style>