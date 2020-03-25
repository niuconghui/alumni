<template>
  <div class="wrapper">
    <div class="info">
      <div>{{user.name}}</div>
      <div class="d-flex text-l">
        <div v-if="lastMessage.content">{{lastMessage.content}}</div>
        <div v-else>{{$store.state.userName === user.name ? '我' : ''}}</div>
        <div class="unread" v-if="unReaderNum != 0">{{unReaderNum}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ChatroomUser',
    props: {
      user: Object,
      messages: Array
    },
    computed: {
      lastMessage(){
        let len = this.messages.length;
        if (len == 0) {
          return {}
        } else {
          return this.messages[len-1];
        }
      },
      unReaderNum() {
        let num = 0;
        let len = this.messages.length;
        if(len != 0) {
          this.messages.forEach((item) => {
            if(!item.isRead){
              num ++
            }
          })
        }
        return num
      }
    },
    data() {
      return {

      }
    },
    created() {
      console.log(this.messages);
    },
    methods: {
      changeChannel(item) {
        this.$emit('changeChannel', item)
      }
    },
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    width: 80%;
    .info {
        padding: 5px;
        width: 100%;
        div:nth-child(1) {
          font-size: 1rem;
        }

        div:nth-child(2) {
          position: relative;
          div:nth-child(1) {
            margin-top: 5px;
            font-size: 0.8rem;
            width: 90%;
            line-height: 1rem;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          div:nth-child(2) {
            position: absolute;
            right: 0;
            top: 2px;
            width: 15px;
            line-height: 15px;
            font-size: 0.8rem;
            background-color: red;
            text-align: center;
            color: #fff;
            border-radius: 50%;
          }
          
        }
      }
    } 
 
 
</style>
