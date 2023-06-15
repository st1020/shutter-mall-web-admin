<template>
  <n-card
    title="添加商品"
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
      <n-form-item label="库存" path="stock">
        <n-input-number
          v-model:value="formValue.stock"
          placeholder="输入库存"
        />
      </n-form-item>
      <n-form-item label="图片URL" path="picture">
        <n-input v-model:value="formValue.picture" placeholder="输入图片" />
      </n-form-item>
      <n-form-item label="详情" path="detail">
        <n-input
          type="textarea"
          v-model:value="formValue.detail"
          placeholder="输入详情"
        />
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
import { fetchA } from "@/utils";
import type { Product, User } from "@/types";
import router from "@/router";

const formRef = ref<FormInst | null>(null);
const message = useMessage();

const token = window.localStorage.getItem("token");
if (token == undefined) {
  message.error("未登录！");
  router.push("/login");
}

// @ts-ignore
const formValue = ref<Product>({
  name: "",
  description: "",
  specification: "",
  price: 0,
  picture: "",
  shopInfo: {
    id: 0,
    name: "Loading",
    email: "Loading",
    type: "USER",
    createDate: "",
  },
  stock: 0,
  detail: "",
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
  stock: {
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
  detail: {
    required: true,
    message: "请输入",
    type: "string",
    trigger: ["input", "blur"],
  },
};
const handleValidateClick = async () => {
  let user = await fetchA<User>("/api/user/getMyUserInfo", null, message);
  if (user == null) {
    return;
  }
  formValue.value.shopInfo = user;
  let response = await fetchA<Product>(
    "/api/product/addProduct",
    JSON.stringify(formValue.value),
    message
  );
  if (response != null) {
    formValue.value = response;
    message.info("添加成功！");
  } else {
    message.info("添加失败！");
  }
};
</script>
