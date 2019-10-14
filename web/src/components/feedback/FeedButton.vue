<template>
  <div class="feedback">
    <el-link href="/feedback" :underline="false" target="_blank" >
      <el-button icon="el-icon-s-comment" circle class="feedbotton" ></el-button>
    </el-link>
    
  </div>
</template>

<script>
export default {
  name: 'FeedBack',
  data () {
    return {

    }
  },
  methods: {
    feedback () {
     
    }
  }
}
</script>


<style scoped>
   .feedback {
    position: absolute ;
    left: 94%;
    top: 90%;
    padding: 0!important;
    margin: 0!important;
  }
  .feedbotton {
    width: 100%!important;
    height: 100%!important;
    color: #640000!important;
    font-size: 16px!important;
    background-color: #fff!important;
    border: 1px solid #FFEBCD!important;
    box-shadow:0 0 5px #FFEBCD!important;
  }

   .feedbotton:hover {
    background-color: #FFEBCD!important;
  }
</style>