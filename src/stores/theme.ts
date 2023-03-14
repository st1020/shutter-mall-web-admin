import { ref } from "vue";
import { defineStore } from "pinia";
import { darkTheme } from "naive-ui";
import type { GlobalTheme } from "naive-ui";

export const useThemeStore = defineStore("theme", () => {
  const theme = ref<GlobalTheme | null>(null);
  function dark() {
    theme.value = darkTheme;
  }
  function light() {
    theme.value = null;
  }
  function change() {
    if (theme.value == null) {
      theme.value = darkTheme;
    } else {
      theme.value = null;
    }
  }

  return { theme, dark, light, change };
});
