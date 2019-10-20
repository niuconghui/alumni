<template>
  <div>
    <h4 >杰出校友</h4>
    <demeanor-item class="demeanor-item"></demeanor-item>
     <el-divider></el-divider>
    <!-- <pagination></pagination> -->
  </div>
</template>

<script>

import DemeanorItem from './DemeanorItem'
import Pagination from 'components/pagination/Pagination'

export default {
  components: {
    DemeanorItem,
    Pagination
  },
  data() {
    return {
 
    }
  },
}
</script>

<style scoped>
  h4 {
    margin: 0;
    padding: 0;
    color: #777;
    line-height: 30px;
    border-bottom: 1px solid #DCDCDC;
  }
  .demeanor-item {
    margin: 5px;
  }

</style>