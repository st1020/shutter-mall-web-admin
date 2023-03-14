<template>
  <n-layout-header bordered class="nav">
    <n-grid x-gap="12" :cols="4" style="height: 50px">
      <n-gi>
        <n-gradient-text type="info" size="30" style="padding-left: 20px">
          ShutterMall
        </n-gradient-text>
      </n-gi>
      <n-gi class="nav-end" offset="2">
        <n-space>
          <n-button quaternary class="nav-picker" @click="handleThemeUpdate">
            {{ theme.theme == null ? "深色" : "浅色" }}
          </n-button>
          <n-button quaternary class="nav-picker" @click="handleLogout">
            登出
          </n-button>
        </n-space>
      </n-gi>
    </n-grid>
  </n-layout-header>
</template>

<script setup lang="ts">
import router from "@/router";
import { useThemeStore } from "@/stores/theme";
import { useMessage } from "naive-ui";
const theme = useThemeStore();
const message = useMessage();
const handleThemeUpdate = () => {
  theme.change();
};
const handleLogout = () => {
  localStorage.clear();
  message.success("已登出！");
  router.push("/login");
};
</script>

<style scoped>
.nav {
  --side-padding: 16px;
  display: grid;
  /* grid-template-columns: auto 1fr auto; */
  grid-template-rows: calc(var(--header-height) - 1px);
  align-items: center;
  padding: 0 var(--side-padding);
}
.nav-end {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
