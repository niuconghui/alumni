<template>
  <div class="echarts">
    <div :style="{height:'400px',width:'100%',}" ref="myEchart">
    </div>
  </div>
</template>


<script>
  import echarts from "echarts";
  import '../../../../node_modules/echarts/map/js/china.js'
  export default {
    name: "echarts",
    props: {
      userJson: { type: Array },
      province: { type: Array }
    },
    data() {
      return {
        chart: null
      };
    },
    mounted() {
      this.chinaConfigure();
    },
    beforeDestroy() {
      if (!this.chart) {
        return;
      }
      this.chart.dispose();
      this.chart = null;
    },
    methods: {
      chinaConfigure() {
        let myChart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置    
        window.onresize = myChart.resize;
        myChart.setOption({ // 进行相关配置
          backgroundColor: "#fff",
          tooltip: {}, // 鼠标移到图里面的浮动提示框
          dataRange: {
            show: false,
            min: 0,
            max: 500,
            text: ['High', 'Low'],
            realtime: true,
            calculable: true,
            color: ['orangered', 'yellow', 'lightskyblue']
          },
          geo: { // 这个是重点配置区
            map: 'china', // 表示中国地图
            roam: true,
            label: {
              normal: {
                show: true, // 是否显示对应地名
                textStyle: {
                  color: 'rgba(0,0,0,0.4)'
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(0, 0, 0, 0.2)'
              },
              emphasis: {
                areaColor: null,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          series: [{
              type: 'scatter',
              coordinateSystem: 'geo' // 对应上方配置
            },
            {
              name: '校友分布', // 浮动框的标题
              type: 'map',
              geoIndex: 0,
              data: this.userJson 
              // data: [{
              //   name: "河南",
              //   value: 80
              // }, {
              //   name: "上海",
              //   value: 150
              // }, {
              //   name: "山东",
              //   value: 200
              // }, {
              //   name: "浙江",
              //   value: 250
              // }, {
              //   name: "湖北",
              //   value: 350
              // }, {
              //   name: "河北",
              //   value: 400
              // }, {
              //   name: "山西",
              //   value: 450
              // }, {
              //   name: "宁夏",
              //   value: 500
              // }]
            }
          ]
        })
      }
    }
  }
</script>

<style>

</style>