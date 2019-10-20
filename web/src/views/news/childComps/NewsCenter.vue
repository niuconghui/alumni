<template>
  <div>
    <h4 >新闻资讯</h4>
    <news-item v-for="(item,index) in newslist" :key="index" :news="item"></news-item>
  </div>
</template>

<script>
import http from 'network/axios'

import NewsItem from './NewsItem'
import NewsDetail from './NewsDetail'

export default {
  props: {
    newslist: Array
  },
  components: {
    NewsItem,
    NewsDetail

  },
  data () {
    return {
      
    }
  },
  methods: {
    
  },
  created() {
    
  },
}
</script>

<style scoped>

  h4 {
    margin: 0;
    padding: 0;
    color: #777;
    line-height: 30px;
    border-bottom: 1px solid #DCDCDC;
  }
  
  .newsList {
    height: 20px;
  }
  .newsList:hover {
    color: #640000!important;
  }

  li {
    list-style-type: square ;
  }
  li:hover {
    border-bottom: 1px dashed #640000
  }

</style>