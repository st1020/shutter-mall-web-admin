<template>
  <h1>用户管理</h1>
  <n-data-table
    :columns="columns"
    :data="data"
    :pagination="{ defaultPageSize: 20 }"
    :bordered="false"
  />
</template>

<script setup lang="tsx">
import { ref } from "vue";
import { NButton, NSpace, useMessage } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import type { User } from "@/types";
import { fetchA, formatDate } from "@/utils";
import router from "@/router";

const data = ref<User[]>([]);

const message = useMessage();
const columns: DataTableColumns<User> = [
  {
    title: "Id",
    key: "id",
  },
  {
    title: "用户名",
    key: "name",
  },
  {
    title: "邮箱",
    key: "email",
  },
  {
    title: "类型",
    key: "type",
  },
  {
    title: "创建时间",
    key: "createDate",
    render: (row) => formatDate(row.createDate),
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
          onClick={() => router.push(`/user/edit/${row.id}`)}
        >
          编辑
        </NButton>
        <NButton
          strong
          tertiary
          size="small"
          onClick={() =>
            fetchA<User[]>(
              "/api/user/deleteUser",
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
  fetchA<User[]>("/api/user/getAll", null, message).then((response) => {
    if (response != null) {
      data.value = response;
    }
  });
};
updatePage();
</script>
