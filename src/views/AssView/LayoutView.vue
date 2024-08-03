<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';
import { reactive } from 'vue';
import LayoutView from "@/views/EchartsView/LayoutView.vue";

const counter = useCounterStore();
localStorage.setItem('selectedKey', "17");
counter.selectedKeys = [localStorage.getItem("selectedKey")];

// 定义一个响应式 data 变量来存储图表配置
const data = reactive({
  value: {}
});

// 使用 eval 执行字符串代码并将结果存储在 data 变量中
const dataString = `
  const result = ${JSON.stringify({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          show: true
        }
      }
    },
    grid: {
      left: '4%',
      top: '15%',
      right: '4%',
      bottom: '10%'
    },
    legend: {
      data: ['昨日总人数', '今日实时人数'],
      top: '4%',
      color: '#1FC3CE',
      fontSize: 14,
      selected: { 昨日使用率: false }
    },
    xAxis: {
      data: [
        '会议室1',
        '会议室2',
        '会议室3',
        '会议室4',
        '会议室5',
        '会议室6',
        '会议室7',
        '会议室8',
        '会议室9'
      ],
      axisLine: {
        show: true,
        lineStyle: {
          color: '#eee',
          width: 1
        }
      },
      axisTick: {
        show: true,
        alignWithLabel: true
      },
      axisLabel: {
        show: true,
        color: '#333',
        fontSize: 14
      }
    },
    yAxis: [
      {
        type: 'value',
        name: '人数',
        nameTextStyle: {
          color: '#333',
          fontSize: 14
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: '#eee'
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          show: true,
          color: '#333',
          fontSize: 14
        }
      }
    ],
    series: [
      {
        name: '昨日总人数',
        type: 'bar',
        barWidth: 18,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: '#F89898'
              },
              {
                offset: 1,
                color: '#F56C6C'
              }
            ]
          }
        },
        data: [24, 45, 43, 35, 76, 154, 86, 42, 68]
      },
      {
        name: '今日实时人数',
        type: 'bar',
        barWidth: 18,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: '#52A7FF'
              },
              {
                offset: 1,
                color: '#409EFF'
              }
            ]
          }
        },
        data: [133, 23, 114, 67, 89, 35, 67, 96, 90]
      }
    ]
  })};

  data.value = result;
`;

// 执行 eval
eval(dataString);
</script>

<template>
  <div>
    批量处理
    <div :style="{ width: '1230px', height: '350px' }">
      <LayoutView :option="data.value" />
    </div>
  </div>
</template>

<style scoped lang="less">
/* 这里写你的样式 */
</style>