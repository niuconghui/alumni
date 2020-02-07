<template>
  <div class="content">
    <div class="footer-top">
      <div class="div-span">
        校友总会        <el-divider direction="vertical"></el-divider>    
        <el-link  href="http://www.nxist.com/views/font/homepage.form" 
                  target="_blank" :underline="false">
                  <!-- 宁夏理工学院 -->xxxxxxxxxxxxxxxx
                  </el-link>
      </div>
      <div class="div-link">
        <!-- <i class="el-icon-location"></i> 地址：宁夏回族自治区石嘴山市大武口区山水大道学院路宁夏理工学院<br> -->
        <i class="el-icon-location"></i> 地址：xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
        <i class="el-icon-phone-outline"></i> 电话：11111111111<br>
        <i class="el-icon-message"></i> 邮箱：1111111@nixit.com
      </div>
    </div>
    <div class="footer-bottom">
      <div class="copyright">Copyright2019 @xxxxxxx @xxxxxxxxxxxxxxxx</div> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
  .content {
    text-align: center
    
  }
  .div-span {
    margin: auto;
    width: 70vw;
    height: 3vw;
    border-bottom: 1px solid #B6B8b7;
    text-align: left;
    line-height: 3vw;
    font-size: 20px;
  }
  .div-link {
    margin: auto;
    width: 70vw;
    height: 3vw;
    text-align: left;
    font-size: 16px;
    line-height: 2vw;
  }
  a {
    font-size: 16px;
  }
  .footer-top {
    width: 100%;
    height: 9vw;
    color: #333;
    background-color: #dcdcdc;
    text-align: center;
    line-height: 5vh;
  }
  .footer-bottom {
    width: 100%;
    height: 2.5vw;
    color: #333;
    background-color: #B6B8C7;
  }
  .copyright {
    width: 70vw;
    height: 2.5vw;
    text-align: left;
    font-size: 16px;
    line-height: 2.5vw;
    margin: auto;
  }
</style>