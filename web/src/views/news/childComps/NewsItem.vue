<template>
  <div>
    <ul>
      <li>
        <el-link
          @click="newsClick(news._id)"
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
    newsClick(id) {
      console.log(id)
      this.$emit('newsClick', id)
    }
  }
}
</script>


<style lang="scss" scoped>

h4 {
    margin: 0;
    padding: 0;
    color: #777;
    line-height: 30px;
    border-bottom: 1px solid #DCDCDC;
  }
  

  li {
    list-style-type: square ;
    height: 1.3rem;
  }

  li:hover {
    color: $primary;
    border-bottom: 1px dashed $primary
  }

</style>