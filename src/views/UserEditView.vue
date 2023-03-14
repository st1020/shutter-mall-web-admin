<template>
  <n-card
    title="编辑用户"
    size="huge"
    style="min-width: 350px; width: 400px; max-width: 500px"
  >
    <n-form ref="formRef" :model="formValue" :rules="rules">
      <n-form-item label="姓名" path="name">
        <n-input v-model:value="formValue.name" placeholder="输入姓名" />
      </n-form-item>
      <n-form-item label="邮件" path="email">
        <n-input v-model:value="formValue.email" placeholder="输入密码" />
      </n-form-item>
      <n-form-item label="类型" path="type">
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
import type { User } from "@/types";

const route = useRoute();
const formRef = ref<FormInst | null>(null);
const message = useMessage();
const selectValue = ref("USER");

const formValue = ref<User>({
  id: 0,
  name: "Loading",
  email: "Loading",
  type: "USER",
  createDate: "2022-12-20T12:37:39.685+00:00",
});

fetchA<User>(
  "/api/user/getUserInfo",
  JSON.stringify({ id: route.params.id }),
  message
).then((response) => {
  if (response != null) {
    formValue.value = response;
  }
});

const rules = {
  name: {
    required: true,
    message: "请输入姓名",
    trigger: ["input", "blur"],
  },
  email: {
    required: true,
    message: "请输入邮件",
    trigger: ["input", "blur"],
  },
  type: {
    required: true,
    message: "请输入类型",
    trigger: ["input", "blur"],
  },
};
const selectOptions = [
  {
    label: "用户",
    value: "USER",
  },
  {
    label: "管理员",
    value: "ADMIN",
  },
];
const handleValidateClick = () => {
  formValue.value.type = selectValue.value;
  fetchA<User>(
    "/api/user/setUserInfo",
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
