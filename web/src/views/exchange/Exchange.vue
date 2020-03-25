<template>
  <div class="exchange d-flex">
    <div class="left">
      <div class="tab">
        <span
          class="type"
          :class="{active: index === currentIndex}"
          v-for="(item, index) in categories"
          :key="index"
          @click="tabClick(index, item._id)"
        >{{item.title}}</span>
      </div>

      <div>
        <exchange-item
          v-for="(item, index) in exchanges[currentType].list"
          :key="index"
          :index="index"
          :exchange="item"
          @exchangeClick="handleExchangeClick"
          @usernameClick="handleUsernameClick"
          @starClick="handleStarClick"
          @commentClick="handleCommentClick"
        />
        <p 
          class="text-c"
          v-loading="loading" 
          element-loading-text="数据加载中~~~"
          element-loading-spinner="el-icon-loading"
          ><span v-if="!loading">没有更多数据啦....</span></p>
      </div>
    </div>

    <div class="right">
      <div class="publish">
        <el-button type="primary" icon="el-icon-plus" @click="handleSaveDraft">发表</el-button>
      </div>

      <div class="ad-card">
        <Adcard v-for="item in adList" :key="item._id" :ad="item"/>
      </div>
    </div>
  </div>
</template>

<script>
import ExchangeItem from "./childComps/ExchangeItem"
import Adcard from './childComps/Adcard'

export default {
  data() {
    return {
      categories: [],
      currentIndex: 0,
      adList: [],
      exchanges: {
        "5e436360f8b8801df8dc2d82": { page: 1, list: [] },
        "5e43637af8b8801df8dc2d83": { page: 1, list: [] },
        "5e436396f8b8801df8dc2d84": { page: 1, list: [] },
        "5e4363aaf8b8801df8dc2d85": { page: 1, list: [] },
        "5e4363c3f8b8801df8dc2d86": { page: 1, list: [] },
        "5e4363dff8b8801df8dc2d87": { page: 1, list: [] },
        "5e4363ebf8b8801df8dc2d88": { page: 1, list: [] }
      },
      page: 1,
      currentType: "5e436360f8b8801df8dc2d82",
      loading: true,
      timerid: null,
      mark: true
    };
  },
  components: {
    ExchangeItem,
    Adcard
  },
  created() {
    this._getCategory();
    this._getExchange(this.currentType)
    this._getAdList()
  },
  mounted() {
    window.addEventListener("scroll", this.throttling(this.handleScroll))
  },
  methods: {
    async _getCategory() {
      const res = await this.$api.exchange.getCategory();
      if (res.data.code !== 0) return;
      this.categories = res.data.data;
    }, 

    async _getExchange(type) {
      const page = this.exchanges[type].page;
      const res = await this.$api.exchange.getExchange(page, type);
      if(res.data.data.items.length === 0) this.loading = false
      this.exchanges[type].list.push(...res.data.data.items);
      this.exchanges[type].page += 1;
    },

    async _getAdList() {
      const res = await this.$api.exchange.getAd()
      if (res.data.code !== 0) return;
      this.adList = res.data.data;
    },

    // ------------------------- 事件监听 -------------------------------
    tabClick(index, id) { // 点击切换对应数据
      this.currentIndex = index
      this.currentType = id
      if (index < 1) {
        this.currentType = "5e436360f8b8801df8dc2d82"
        this._getExchange(this.currentType)
      } else {
        this._getExchange(this.currentType)
      }
    },

    handleScroll() { // 下拉加载更多
      this.loading = true
      if (
        document.documentElement.scrollTop + window.innerHeight ==
        document.body.offsetHeight
      ) {
        this._getExchange(this.currentType);
      }
    },

    throttling(callback, delay = 500) { // 节流
      // console.log(1111)
      return () => {
        clearTimeout(this.timerid);
        this.timerid = setTimeout(() => {
          callback.call(this);
        }, delay);
      }

      
    },

    debounce(callback, delay = 500){
      if(!this.mark) return
      this.mark = false
      callback.call(this)
      setTimeout(()=>{
        this.mark = true
      }, delay)
    },


    handleExchangeClick(id) {
      let routeData = this.$router.resolve({
        path: `/exchange/detail/${id}`
      })
      window.open(routeData.href, '_blank')
    },

    handleUsernameClick(id) {
      this.$router.push(`/user/center/${id}`)
    },

    async handleStarClick(id, star, index) {
      if(!localStorage.token) {
        this.$message({
          type: 'error',
          message: '您还未登陆，请先登录！'
        })
        this.$router.push('login')
      }
      if (star == false) return this.$message.warning('您已赞过')
      const res = await this.$api.exchange.postStar(id)
      if (res.data.code === 0) {
        this.exchanges[this.currentType].list[index].canStar = false
        this.exchanges[this.currentType].list[index].starNum ++
        this.$message.success('点赞成功')
      }
      
    },

    handleCommentClick(id) {
      let routeData = this.$router.resolve({
        path: `/exchange/detail/${id}`
      })
      window.open(routeData.href, '_blank')
    },

    handleSaveDraft() { // 添加新交流
      this.$router.push('/exchange/new')
    }
  }
}
</script>

<style  lang="scss" scoped>
.exchange {
  min-height: 35vw;
  background-color: $global-bgc;
  .left {
    width: 70%;
    background-color: $white;
    .tab {
      line-height: 3.5vw;
      border-bottom: 1px solid $gray-1;
      .type {
        padding: 0 1vw 0 1vw;
        color: $gray-3;
        font-size: 0.9rem;
        border-right: 1px solid $gray-1;
      }
      .type:hover {
        color: $primary;
        cursor: pointer;
      }
      .type:last-child {
        border: none;
      }
      .active {
        color: $primary;
      }
    }

    .list {
      margin: 0;
      padding: 0;
    }
  }

  .right {
    margin: 0 0 0 2%;
    width: 28%;
    height: 30vw;
    .publish {
      button {
        width: 100%;
        font-size: 1.1rem;
      }
    }

    .ad-card {
      margin: 1vw 0 0 0;
    }
  }
}

p {
  height: 3vw;
}
</style>