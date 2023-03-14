<template>
  <h1>商品管理</h1>
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
import type { Product } from "@/types";
import { fetchA, formatDate, formatPrice } from "@/utils";
import router from "@/router";

const data = ref<Product[]>([]);

const message = useMessage();
const columns: DataTableColumns<Product> = [
  {
    title: "Id",
    key: "id",
  },
  {
    title: "名称",
    key: "name",
  },
  {
    title: "描述",
    key: "description",
  },
  {
    title: "规格",
    key: "specification",
  },
  {
    title: "价格",
    key: "price",
    render: (row) => formatPrice(row.price),
  },
  {
    title: "创建时间",
    key: "createDate",
    render: (row) => formatDate(row.createDate),
  },
  {
    title: "最后修改时间",
    key: "lastModifiedDate",
    render: (row) => formatDate(row.createDate),
  },
  {
    title: "图片",
    key: "picture",
    render: (row) => <NAvatar size="small" src={row.picture} />,
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
          onClick={() => router.push(`/product/edit/${row.id}`)}
        >
          编辑
        </NButton>
        <NButton
          strong
          tertiary
          size="small"
          onClick={() =>
            fetchA<Product[]>(
              "/api/product/deleteProduct",
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
  fetchA<Product[]>("/api/product/getAll", null, message).then((response) => {
    if (response != null) {
      data.value = response;
    }
  });
};
updatePage();
</script>
