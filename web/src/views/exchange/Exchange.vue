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
          :exchange="item"
          @exchangeClick="handleExchangeClick"
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
        <Adcard />
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
      exchanges: {
        "5e37b9d260a86c23842f5305": { page: 1, list: [] },
        "5e37b9e560a86c23842f5306": { page: 1, list: [] },
        "5e37ba6960a86c23842f5308": { page: 1, list: [] },
        "5e37ba7760a86c23842f5309": { page: 1, list: [] },
        "5e37ba8660a86c23842f530a": { page: 1, list: [] },
        "5e37ba9160a86c23842f530b": { page: 1, list: [] },
        "5e37baae60a86c23842f530c": { page: 1, list: [] },
        "5e37baba60a86c23842f530d": { page: 1, list: [] }
      },
      page: 1,
      currentType: "5e37b9d260a86c23842f5305",
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
    this._getExchange(this.currentType);
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

    // ------------------------- 事件监听 -------------------------------
    tabClick(index, id) { // 点击切换对应数据
      this.currentIndex = index
      this.currentType = id
      if (index < 1) {
        this.currentType = "5e37b9d260a86c23842f5305"
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
        path: `/exchange/detail/${id}`,
      });
      window.open(routeData.href, '_blank');
    },

    handleSaveDraft() {
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
        color: $gray-2;
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
      // height: 50vh;
    }
  }

  .right {
    margin: 0 0 0 2%;
    width: 28%;
    height: 30vw;
    // background-color: pink;
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