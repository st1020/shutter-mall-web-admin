<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :collapsed="collapsed"
    show-trigger
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <n-menu
      default-expand-all
      :options="menuOptions"
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
    />
  </n-layout-sider>
</template>

<script setup lang="tsx">
import { h, ref } from "vue";
import { NIcon } from "naive-ui";
import type { MenuOption } from "naive-ui";
import { RouterLink } from "vue-router";
import type { RouteLocationRaw } from "vue-router";
import type { Component } from "vue";
import {
  HomeOutline as HomeIcon,
  BarChartOutline as StatisticsIcon,
  PeopleOutline as UserIcon,
  LogInOutline as LoginIcon,
  PersonOutline as PersonIcon,
  CartOutline as ProductIcon,
  AddCircleOutline as AddIcon,
  DocumentsOutline as OrdersIcon,
  DocumentTextOutline as OrderIcon,
} from "@vicons/ionicons5";

const collapsed = ref<boolean>(false);

function renderIcon(icon: Component) {
  return () => <NIcon>{h(icon)}</NIcon>;
}

function renderLink(name: string, to: RouteLocationRaw) {
  return () => <RouterLink to={to}> {name} </RouterLink>;
}

const menuOptions: MenuOption[] = [
  {
    label: renderLink("主页", "/"),
    key: "home",
    icon: renderIcon(HomeIcon),
  },
  {
    label: renderLink("数据统计", "/statistics"),
    key: "statistics",
    icon: renderIcon(StatisticsIcon),
  },
  {
    key: "divider-1",
    type: "divider",
    props: {
      style: {
        marginLeft: "32px",
      },
    },
  },
  {
    label: "用户管理",
    key: "user-group",
    icon: renderIcon(UserIcon),
    children: [
      {
        label: renderLink("登陆", "/login"),
        key: "login",
        icon: renderIcon(LoginIcon),
      },
      {
        label: renderLink("用户管理", "/user"),
        key: "user",
        icon: renderIcon(PersonIcon),
      },
    ],
  },
  {
    label: "商品管理",
    key: "product-group",
    icon: renderIcon(ProductIcon),
    children: [
      {
        label: renderLink("添加商品", "/product/add"),
        key: "product-add",
        icon: renderIcon(AddIcon),
      },
      {
        label: renderLink("商品管理", "/product"),
        key: "product",
        icon: renderIcon(ProductIcon),
      },
    ],
  },
  {
    label: "订单管理",
    key: "order-group",
    icon: renderIcon(OrdersIcon),
    children: [
      {
        label: renderLink("订单管理", "/order"),
        key: "order",
        icon: renderIcon(OrderIcon),
      },
    ],
  },
];
</script>
