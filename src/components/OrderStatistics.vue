<template>
  <v-chart style="height: 50vh" :option="option" autoresize />
</template>

<script setup lang="ts">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { EffectScatterChart, PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import { ref } from "vue";

const { submit, confirm, reject, finish } = defineProps<{
  submit: number;
  confirm: number;
  reject: number;
  finish: number;
}>();

console.log(submit, confirm, reject, finish);

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  EffectScatterChart,
  LegendComponent,
]);

const option = ref({
  title: {
    text: "订单统计",
    subtext: "订单状态统计",
    left: "center",
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: "left",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: "50%",
      data: [
        { value: submit, name: "已提交" },
        { value: confirm, name: "已确认" },
        { value: reject, name: "已拒绝" },
        { value: finish, name: "已完成" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
});
</script>
