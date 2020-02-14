<template>
  <div class="item">
    <div class="item-header">
      <span @click="usernameClick(exchange.userId._id)">{{exchange.userId ? exchange.userId.studentName : '用户已注销'}}</span>
      <span>&nbsp;·&nbsp;</span>
      <span>{{exchange.created_time}}</span>
    </div>
    <div class="item-title">
      <a href="javascript:" @click="exchangeClick(exchange._id)">{{exchange.title}}</a>
    </div>
    <div class="item-status d-flex">
      <span 
        class="star" 
        :class="{'active': !exchange.canStar }"
        @click="starClick(exchange._id, exchange.canStar)">
        <img src="~assets/img/zan.svg" alt="" v-if="exchange.canStar">
        <img src="~assets/img/zan-active.svg" alt="" v-else>
        {{exchange.starNum}}
      </span>
      <span 
        class="comment"
        @click="commentClick(exchange._id)">
        <img src="~assets/img/comment.svg" alt="">
        {{exchange.commentNum}}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ExchangeItem',
    props: {
      exchange: { type: Object }
    },
    created() {
      // console.log(this.exchange)
    },
    methods: {
      exchangeClick(id) {
        this.$emit('exchangeClick', id)
      },

      usernameClick(id) {
        this.$emit('usernameClick', id)
      },

      starClick(id, star) {
        this.$emit('starClick', id, star, this.$attrs.index)
      },

      commentClick(id) {
        this.$emit('commentClick', id)
      }
    },
  }
</script>

<style lang="scss" scoped>
.item {
  padding: 1.5vw 1.5vw 1.5vw 1.5vw;
  height: 9vw;
  width: 100%;
  border-bottom: 1px solid $gray-1;
  .item-header {
    color: $gray-3;
    font-size: 0.8rem;
  }
  .item-header span:hover {
    color: $primary;
    cursor: pointer;
  }

  .item-title {
    margin: 0.5vw 0 0.8vw 0;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .item-title:hover {
    text-decoration: underline;
  }

  .item-status {
    cursor: pointer;
    line-height: 1.5vw;
    color: $gray-3;
    span {
      display: flex;
      align-items: center;
      padding: 0 .5rem;
      height: 100%;
      border: 1px solid $gray-1;
    }
    span:first-child {
      border-right: none;
    }

    .active {
      color: #6CBD45;
    }
  }
}

.item:hover {
  background-color: #FCFCFC;
}
 
</style>
