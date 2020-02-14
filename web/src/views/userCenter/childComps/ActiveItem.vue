<template>
  <div class="item">
    <div class="content d-flex ">
      <div class="avatar">
        <img :src=exchange.userId.avatar alt="" v-if="exchange.userId.avatar">
        <img src="~assets/img/avatar.png" alt="" v-else>
      </div>
      <div class="active-info flex-1">
        <div class="name">{{exchange.userId.studentName}}</div>
        <div class="tag">
          <span>{{exchange.category.title}}</span> <span> · </span> <span>{{exchange.created_time}}</span>
        </div>
        <div class="title" @click="exchangeTitleClick(exchange._id)">{{exchange.title}}</div>
        <el-row>
          <el-col :span="20">
            <div class="text" v-html="exchange.content"></div>
          </el-col>
          <div class="edit-delete" v-if="isShowEditAndDeleteBtn">
            <el-col :span="1" type="flex">
              <el-button type="text" @click="userExchangeEditClick(exchange._id)">编辑</el-button>
            </el-col>
            <el-col :span="1" type="flex">
              <el-button type="text" @click="userExchangeDeleteClick(exchange._id, exchange.title)">删除</el-button>
            </el-col>
          </div>
        </el-row>
       
      </div>
    </div>
    <div class="status d-flex">
      <span 
        class="flex-1"
        :class="{'active': !exchange.canStar }"
        @click="starClick(exchange._id, exchange.canStar)"
        >
        <img src="~assets/img/zan.svg" alt="" v-if="exchange.canStar">
        <img src="~assets/img/zan-active.svg" alt="" v-else>
        {{exchange.starNum}}
      </span>
      <span class="flex-1"><img src="~assets/img/comment.svg" alt="">{{exchange.commentNum}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ActiveItem',
    props: { 
      exchange: { type: Object },
      isShowEditAndDeleteBtn: { type: Boolean, default: false }
    },
    methods: {
      starClick(id, star) {
        console.log(this.$attrs)
        this.$emit('starClick', id, star, this.$attrs.index)
      },
      exchangeTitleClick(id) {
        this.$emit('exchangeTitleClick', id)
      },

      userExchangeEditClick(id) {
        this.$emit('userExchangeEditClick', id)
      },

      userExchangeDeleteClick(id, title) {
        this.$emit('userExchangeDeleteClick', id, title)
      },
    },
  }
</script>

<style  lang="scss" scoped>
  .item {
    height: 100%;
    width: 100%;
    border-radius: 5px;
    background-color: $white;
    border-bottom: 1px solid $gray-2;
    .content {
      width: 100%;
      height: 100%;
      border-bottom: 1px solid $gray-2;
      .avatar {
        padding: 1.2vw 1vw 1vw 1.5vw;
        background-color: #fff;
        img {
          width: 3.5vw;
          height: 3.5vw;
          border-radius: 50%;
        }
      }
      
      .active-info {
        padding: 1.2vw 0 0 0 ;
        width: 100%;
        overflow: hidden;
        .name {
          font-size: 1.3rem;
          color: $gray-5;
        }

        .tag {
          margin: 0.8vw 0 0.8vw 0;
          font-size: 0.8rem;
          color: $gray-3;
        }

        .title {
          cursor: pointer;
          margin: 0 0 0 0;
          font-size: 1.3rem;
          color: $gray-5;
          width: 100%;
        }

        .text {
          height: 3vw;
          line-height: 3vw;
          text-overflow:ellipsis;
          overflow: hidden;
          color: $gray-3;
        }
      }
    }
    
    .status {
      border-radius: 20px;
      line-height: 3vw;
      color: $gray-3;
      span {
        display: flex;
        align-items: center;
        padding: 0 13rem;
        text-align: center;
        height: 100%;
        border-right: 1px solid $gray-2;
      }
      span:last-child {
        border-right: none;
      }

      .active {
        color: #6CBD45;
      }
    }
  }

  .edit-delete {
    display: none;
  }

  .item:hover {
    .edit-delete {
      display: block;
    }
  }
 
</style>
