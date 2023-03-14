<template>
  <h1>欢迎您，管理员 {{ user.name }} ！</h1>
  <n-grid x-gap="12" :cols="2">
    <n-gi>
      <n-card title="统计信息" style="max-width: 600px">
        <n-grid x-gap="12" :cols="4">
          <n-gi>
            <n-statistic label="用户数量" tabular-nums :value="userCount" />
          </n-gi>
          <n-gi>
            <n-statistic label="商品数量" tabular-nums :value="productCount" />
          </n-gi>
        </n-grid>
        <n-grid x-gap="12" :cols="4" style="padding-top: 20px">
          <n-gi>
            <n-statistic
              label="已提交订单"
              tabular-nums
              :value="orderSubmitCount"
            />
          </n-gi>
          <n-gi>
            <n-statistic
              label="已确认订单"
              tabular-nums
              :value="orderConfirmtCount"
            />
          </n-gi>
          <n-gi>
            <n-statistic
              label="已拒绝订单"
              tabular-nums
              :value="orderRejectCount"
            />
          </n-gi>
          <n-gi>
            <n-statistic
              label="已完成订单"
              tabular-nums
              :value="orderFinishCount"
            />
          </n-gi>
        </n-grid>
      </n-card>
    </n-gi>
    <n-gi>
      <n-card title="暂无其他功能" style="min-height: 200px"></n-card>
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import type { Order, Product, User } from "@/types";
import { fetchA } from "@/utils";
import { ref } from "vue";
import { useMessage } from "naive-ui";

const message = useMessage();

const userCount = ref<number>(0);
const productCount = ref<number>(0);
const orderSubmitCount = ref<number>(0);
const orderConfirmtCount = ref<number>(0);
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
    orderSubmitCount.value = response.filter(
      (o) => o.orderStatus == "SUBMIT"
    ).length;
    orderConfirmtCount.value = response.filter(
      (o) => o.orderStatus == "CONFIRM"
    ).length;
    orderRejectCount.value = response.filter(
      (o) => o.orderStatus == "REJECT"
    ).length;
    orderFinishCount.value = response.filter(
      (o) => o.orderStatus == "FINISH"
    ).length;
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
