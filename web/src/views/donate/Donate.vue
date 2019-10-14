<template>
  <div>
    <h1>赞助我们的团队</h1>
    <h4>Hi ~~~ ！等你很久啦！ O(∩_∩)O~</h4>
    <h4>喜欢我们团队的小伙伴可以支持下维护的本系统的老师们呀！</h4>
    <br>
    <h2>一次性赞助</h2>
    <el-divider></el-divider>
    <h4>我们通过以下方式接受赞助：</h4>
    <div class="payment">
       <el-card :body-style="{ padding: '0px' }" class="card" shadow="hover">
        <img src="../../assets/images/apiliy.png" class="image">
      </el-card>
      <el-card :body-style="{ padding: '0px' }" class="card" shadow="hover">
        <img src="../../assets/images/weChatPayment.png" class="image">
      </el-card>
    </div>
    <br><br>
    <h2>感谢榜</h2>
    <el-divider></el-divider>
    <div v-for="item in donate"  class="text item donate">
      <el-card shadow="hover">
        感谢 {{item.name }} 给我们支持了{{item.money }}元
      </el-card>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      donate: [
        {name: 'xxx',money: '100'},
        {name: 'nnn',money: '50'},
        {name: 'vvv',money: '200'},
        {name: 'sss',money: '80'},
      ]
    }
  },
}
</script>
  

<style scoped>
  .payment {
    display: flex;
    justify-content: space-around;
  }
  .card {
    width: 260px;
    height: 130px;
  }
  .image {
    width: 260px;
    height: 130px;
  }

  .donate {
  margin-top: 5px;
  }


</style>