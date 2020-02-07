<template>
  <div class="item">
    <div class="item-header">
      <span>{{exchange.userId ? exchange.userId.studentName : '用户已注销'}}</span>
      <span>&nbsp;·&nbsp;</span>
      <span>{{exchange.created_time}}</span>
    </div>
    <div class="item-title">
      <a href="javascript:" @click="exchangeClick(exchange._id)">{{exchange.title}}</a>
    </div>
    <div class="item-status d-flex">
      <span class="star"><img src="~assets/img/zan.svg" alt=""> {{exchange.starNum}}</span>
      <span class="comment"><img src="~assets/img/comment.svg" alt="">{{exchange.commentNum}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ExchangeItem',
    props: {
      exchange: { type: Object }
    },
    methods: {
      exchangeClick(id) {
        this.$emit('exchangeClick', id)
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
    color: $gray-2;
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
    line-height: 1.5vw;
    color: $gray-2;
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
  }
}

.item:hover {
  background-color: #FCFCFC;
}
 
</style>
