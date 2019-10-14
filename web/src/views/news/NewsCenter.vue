<template>
  <div>
    <h4 >新闻资讯</h4>
    <ul v-for="item in newsList">
      <li>
        <el-link href="https://element.eleme.io" 
          target="_blank" :underline="false" 
          class="newsList">{{ item.title }}
        </el-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newsList: [
        { 
        title: '2019年十月一日',
        author: '牛丛慧',
        content: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        issuTime: '2019/10/12'
        },
         { 
        title: '2019年十月二日',
        author: '牛丛慧2',
        content: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        issuTime: '2019/10/12'
        },
         { 
        title: '2019年十月三日',
        author: '牛丛慧3',
        content: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        issuTime: '2019/10/12'
        },
      ]
    }
  },
  methods: {

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