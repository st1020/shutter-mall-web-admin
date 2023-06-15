<template>
  <h1>欢迎您，管理员 {{ user.name }} ！</h1>
  <n-grid x-gap="12" :cols="2">
    <n-gi>
      <n-card style="max-width: 600px">
        <OrderStatistics
          :key="orderStatisticskey"
          :submit="orderSubmitCount"
          :confirm="orderConfirmCount"
          :reject="orderRejectCount"
          :finish="orderFinishCount"
        />
      </n-card>
    </n-gi>
    <n-gi>
      <n-card style="min-height: 200px">
        <SalesStatistics />
      </n-card>
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import type { Order, Product, User } from "@/types";
import { fetchA } from "@/utils";
import { ref } from "vue";
import { useMessage } from "naive-ui";
import OrderStatistics from "@/components/OrderStatistics.vue";
import SalesStatistics from "@/components/SalesStatistics.vue";

const message = useMessage();

const orderStatisticskey = ref<number>(0);

const userCount = ref<number>(0);
const productCount = ref<number>(0);
const orderSubmitCount = ref<number>(0);
const orderConfirmCount = ref<number>(0);
const orderRejectCount = ref<number>(0);
const orderFinishCount = ref<number>(0);

fetchA<User[]>("/api/user/getAll", null, message).then((response) => {
  if (response != null) {
    userCount.value = response.length;
  }
});
fetchA<Product[]>("/api/product/getAll", null, message).then((response) => {
  if (response != null) {
    productCount.value = response.length;
  }
});
fetchA<Order[]>("/api/order/getAll", null, message).then((response) => {
  if (response != null) {
    console.log(response);
    orderSubmitCount.value = response.filter(
      (o) => o.orderStatus == "SUBMIT"
    ).length;
    orderConfirmCount.value = response.filter(
      (o) => o.orderStatus == "CONFIRM"
    ).length;
    orderRejectCount.value = response.filter(
      (o) => o.orderStatus == "REJECT"
    ).length;
    orderFinishCount.value = response.filter(
      (o) => o.orderStatus == "FINISH"
    ).length;
    orderStatisticskey.value += 1;
  }
});

const user = ref<User>({
  id: 0,
  name: "Loading",
  email: "Loading",
  type: "USER",
  createDate: "",
});

fetchA<User>("/api/user/getMyUserInfo", null, message).then((response) => {
  if (response != null) {
    user.value = response;
  }
});
</script>
