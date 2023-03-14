import router from "@/router";
import type { Result } from "./types";
import type { MessageApiInjection } from "naive-ui/es/message/src/MessageProvider";

export async function fetchA<T>(
  input: RequestInfo | URL,
  body: BodyInit | null | undefined,
  message: MessageApiInjection
): Promise<T | null> {
  const token = window.localStorage.getItem("token");
  if (token == undefined) {
    message.error("未登录！");
    router.push("/login");
    return null;
  }
  try {
    const r: Result<T> = await fetch(input, {
      method: "post",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: body,
    }).then((response) => response.json());
    if (r.code != 0 || r.data == undefined || r.data == null) {
      message.error("请求失败：" + r.msg);
    }
    return r.data;
  } catch {
    message.error("请求失败!");
    return null;
  }
}

export const formatDate = (dateString: string | Date) => {
  return new Date(dateString).toLocaleString();
};

export const formatPrice = (price: number) => {
  return "¥" + (price / 100).toFixed(2);
};
