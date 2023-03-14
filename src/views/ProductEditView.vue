<template>
  <n-card
    title="编辑商品"
    size="huge"
    style="min-width: 350px; width: 400px; max-width: 500px"
  >
    <n-form ref="formRef" :model="formValue" :rules="rules">
      <n-form-item label="名称" path="name">
        <n-input v-model:value="formValue.name" placeholder="输入名称" />
      </n-form-item>
      <n-form-item label="描述" path="description">
        <n-input v-model:value="formValue.description" placeholder="输入描述" />
      </n-form-item>
      <n-form-item label="规格" path="specification">
        <n-input
          v-model:value="formValue.specification"
          placeholder="输入规格"
        />
      </n-form-item>
      <n-form-item label="价格" path="price">
        <n-input-number
          v-model:value="formValue.price"
          placeholder="输入价格"
        />
      </n-form-item>
      <n-form-item label="图片URL" path="picture">
        <n-input v-model:value="formValue.picture" placeholder="输入图片" />
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
import type { FormInst, FormRules } from "naive-ui";
import { useMessage } from "naive-ui";
import { useRoute } from "vue-router";
import { fetchA } from "@/utils";
import type { Product } from "@/types";

const route = useRoute();
const formRef = ref<FormInst | null>(null);
const message = useMessage();

const formValue = ref<Product>({
  id: 1,
  name: "Loading",
  description: "Loading",
  specification: "Loading",
  price: 0,
  createDate: "2022-12-20T12:43:48.417+00:00",
  lastModifiedDate: "2022-12-20T12:43:48.417+00:00",
  picture: "",
});

fetchA<Product>(
  "/api/product/getProductInfo",
  JSON.stringify({ id: route.params.id }),
  message
).then((response) => {
  if (response != null) {
    formValue.value = response;
  }
});

const rules: FormRules = {
  name: {
    required: true,
    message: "请输入",
    type: "string",
    trigger: ["input", "blur"],
  },
  description: {
    required: true,
    message: "请输入",
    type: "string",
    trigger: ["input", "blur"],
  },
  specification: {
    required: true,
    message: "请输入",
    type: "string",
    trigger: ["input", "blur"],
  },
  price: {
    required: true,
    message: "请输入",
    type: "number",
    trigger: ["input", "blur"],
  },
  picture: {
    required: true,
    message: "请输入",
    type: "string",
    trigger: ["input", "blur"],
  },
};
const handleValidateClick = () => {
  fetchA<Product>(
    "/api/product/setProductInfo",
    JSON.stringify(formValue.value),
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
