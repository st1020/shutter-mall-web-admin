<template>
  <v-chart style="height: 50vh" :option="option" autoresize />
</template>

<script setup lang="ts">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { TitleComponent, GridComponent } from "echarts/components";
import VChart from "vue-echarts";
import { ref } from "vue";

use([CanvasRenderer, LineChart, TitleComponent, GridComponent]);

const option = ref({
  title: {
    text: "销售额",
    subtext: "销售额统计",
    left: "center",
  },
  xAxis: {
    type: "category",
    data: ["06-09", "06-10", "06-11", "06-12", "06-13", "06-14", "06-15"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line",
    },
  ],
});
</script>
