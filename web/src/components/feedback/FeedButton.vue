<template>
  <div class="feedback">
    <el-link href="/feedback" :underline="false" target="_blank" >
      <el-tooltip class="item" effect="light" content="建议反馈" placement="bottom-start">
        <el-button icon="el-icon-s-comment" circle class="feedbotton" ></el-button>
      </el-tooltip>
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
    left: 94.2%;
    top: 90%;
    padding: 0!important;
    margin: 0!important;
  }
  .feedbotton {
    width: 40px!important;
    height: 40px!important;
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