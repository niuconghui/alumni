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
  /* .feedback {
    position: fixed ;
    left: 95.8%;
    top: 90%;
    padding: 0;
    margin: 0;
  } */
  .feedbotton {
    width: 42px;
    height: 42px;
    font-size: 16px;
  }

</style>