<template>
  <el-card class="box-card" shadow="hover">
    <div>
      <div slot="header">
        <h3>{{ images.title }}</h3>
      </div>
      <div>
        <div class="block" >
          <el-image
            style="width: 100%; height: 100%"
            :src="images.coverSrc"
            :preview-src-list="imgList"
            :fits="fits"></el-image>
        </div>
      </div>
      <el-divider></el-divider>
      <span> {{ images.description}} </span>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    images: Object,
  },
  data() {
    return {
        fits: 'contain',
        imgList: []
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      this.imgList = this.images.imgList.map(item => {
        return item.imgURL
      });
    }
  },
}
</script>


<style scoped>
  .text {
    font-size: 14px;
  }

  .el-card {
    width: 20vw;
    height: 100%;
  }
</style>