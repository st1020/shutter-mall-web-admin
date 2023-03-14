<script setup lang="ts">
import { RouterView } from "vue-router";
import { dateZhCN, zhCN } from "naive-ui";
import SiderBar from "@/components/SiderBar.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import { useThemeStore } from "./stores/theme";
const theme = useThemeStore();
</script>

<template>
  <n-config-provider
    :theme="theme.theme"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <n-message-provider>
      <n-layout style="height: 100%" position="absolute">
        <HeaderBar />
        <n-layout
          has-sider
          style="top: var(--header-height)"
          position="absolute"
        >
          <SiderBar />
          <n-layout>
            <n-layout-content content-style="padding: 24px;">
              <RouterView />
            </n-layout-content>
            <n-layout-footer bordered>
              <div style="text-align: center; padding: 20px">
                <n-text depth="3"> ShutterMall · Made by Yishi Gao </n-text>
              </div>
            </n-layout-footer>
          </n-layout>
        </n-layout>
      </n-layout>
    </n-message-provider>
    <n-global-style />
  </n-config-provider>
</template>

<style>
html,
body,
#app,
.n-config-provider {
  height: 100%;
  --header-height: 64px;
}
</style>
