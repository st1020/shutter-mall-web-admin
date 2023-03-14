<template>
  <h1>订单管理</h1>
  <n-data-table
    :columns="columns"
    :data="data"
    :pagination="{ defaultPageSize: 20 }"
    :bordered="false"
  />
</template>

<script setup lang="tsx">
import { ref } from "vue";
import { NAvatar, NButton, NSpace, useMessage } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import type { Order } from "@/types";
import { fetchA, formatDate, formatPrice } from "@/utils";
import router from "@/router";

const data = ref<Order[]>([]);

const message = useMessage();
const columns: DataTableColumns<Order> = [
  {
    title: "Id",
    key: "id",
  },
  {
    title: "用户名",
    key: "user.name",
  },
  {
    title: "商品编号",
    key: "product.id",
  },
  {
    title: "商品图片",
    key: "picture",
    render: (row) => <NAvatar size="small" src={row.product.picture} />,
  },
  {
    title: "商品名称",
    key: "product.name",
  },
  {
    title: "价格",
    key: "product.price",
    render: (row) => formatPrice(row.product.price),
  },
  {
    title: "下单时间",
    key: "createDate",
    render: (row) => formatDate(row.createDate),
  },
  {
    title: "订单状态",
    key: "orderStatus",
  },

  {
    title: "操作",
    key: "actions",
    render: (row) => (
      <NSpace>
        <NButton
          strong
          tertiary
          size="small"
          onClick={() => router.push(`/order/edit/${row.id}`)}
        >
          编辑
        </NButton>
        <NButton
          strong
          tertiary
          size="small"
          onClick={() =>
            fetchA<Order[]>(
              "/api/order/deleteOrder",
              JSON.stringify({ id: row.id }),
              message
            ).then((response) => {
              if (response != null) {
                message.success("删除成功！");
                updatePage();
              }
            })
          }
        >
          删除
        </NButton>
      </NSpace>
    ),
  },
];

const updatePage = () => {
  fetchA<Order[]>("/api/order/getAll", null, message).then((response) => {
    if (response != null) {
      data.value = response;
    }
  });
};
updatePage();
</script>
