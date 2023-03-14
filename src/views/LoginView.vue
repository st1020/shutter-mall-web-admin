<template>
  <n-card
    title="登陆"
    size="huge"
    style="min-width: 350px; width: 400px; max-width: 500px"
  >
    <n-form ref="formRef" :model="formValue" :rules="rules">
      <n-form-item label="用户名" path="name">
        <n-input v-model:value="formValue.name" placeholder="输入用户名" />
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input
          type="password"
          v-model:value="formValue.password"
          placeholder="输入密码"
        />
      </n-form-item>
      <n-form-item>
        <n-button attr-type="button" @click="handleValidateClick">
          登陆
        </n-button>
      </n-form-item>
    </n-form>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { FormInst } from "naive-ui";
import { useMessage } from "naive-ui";
import type { Result } from "@/types";
const formRef = ref<FormInst | null>(null);
const message = useMessage();
const formValue = ref({
  name: "",
  password: "",
});
const rules = {
  name: {
    required: true,
    message: "请输入用户名",
    trigger: ["input", "blur"],
  },
  password: {
    required: true,
    message: "请输入密码",
    trigger: ["input", "blur"],
  },
};
const handleValidateClick = async () => {
  let values = formValue.value;
  console.log("submit", values);
  let r: Result<{ token: string }> = await fetch("/api/user/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }).then((response) => response.json());
  if (r.code != 0) {
    message.error("登陆失败：" + r.msg);
    return;
  }
  window.localStorage.setItem("token", r.data.token);
  message.success("登陆成功！");
  history.back();
};
</script>
