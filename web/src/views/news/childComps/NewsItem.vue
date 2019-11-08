<template>
  <div>
    <ul>
      <li>
        <el-link
          @click="toDetail"
          target="_blank" :underline="false" 
          class="newsList"
          :newsid="news._id"
          >
          {{ news.title }}

        </el-link>
      </li>
    </ul>
  </div>
</template>

<script>

import NewsItem from './NewsItem'
import NewsDetail from './NewsDetail'

export default {
  props: {
    news: Object
  },
  data() {
    return {
      
    }
  },
  methods: {
    toDetail () {
      this.$router.push(`/news/${this.news._id}`)
    }
  }
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