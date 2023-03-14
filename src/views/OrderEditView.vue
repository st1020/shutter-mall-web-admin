<template>
  <n-card
    title="编辑订单"
    size="huge"
    style="min-width: 350px; width: 400px; max-width: 500px"
  >
    <n-form ref="formRef" :model="formValue">
      <n-form-item label="订单编号" path="id">
        <n-input-number disabled v-model:value="formValue.id" />
      </n-form-item>
      <n-form-item label="用户名" path="user.name">
        <n-input disabled v-model:value="formValue.user.name" />
      </n-form-item>
      <n-form-item label="商品名" path="product.email">
        <n-input disabled v-model:value="formValue.product.name" />
      </n-form-item>
      <n-form-item label="状态" path="orderStatus">
        <n-select v-model:value="selectValue" :options="selectOptions" />
      </n-form-item>
      <n-form-item>
        <n-button attr-type="button" @click="handleValidateClick">
          提交
        </n-button>
      </n-form-item>
    </n-form>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { FormInst } from "naive-ui";
import { useMessage } from "naive-ui";
import { useRoute } from "vue-router";
import { fetchA } from "@/utils";
import type { Order } from "@/types";

const route = useRoute();
const formRef = ref<FormInst | null>(null);
const message = useMessage();
const selectValue = ref("SUBMIT");

// @ts-ignore
const formValue = ref<Order>({
  id: 0,
  orderStatus: "SUBMIT",
  createDate: "2022-12-20T12:37:39.685+00:00",
  user: { name: "Loading" },
  product: { name: "Loading" },
});

fetchA<Order>(
  "/api/order/getOrderInfo",
  JSON.stringify({ id: route.params.id }),
  message
).then((response) => {
  if (response != null) {
    formValue.value = response;
  }
});

const selectOptions = [
  {
    label: "已提交",
    value: "SUBMIT",
  },
  {
    label: "已确认",
    value: "CONFIRM",
  },
  {
    label: "拒绝",
    value: "REJECT",
  },
  {
    label: "完成",
    value: "FINISH",
  },
];
const handleValidateClick = () => {
  fetchA<Order>(
    "/api/order/setOrderStatus",
    JSON.stringify({
      orderId: formValue.value.id,
      orderStatus: selectValue.value,
    }),
    message
  ).then((response) => {
    if (response != null) {
      formValue.value = response;
      message.info("修改成功！");
    } else {
      message.info("修改失败！");
    }
  });
};
</script>
