import { ref } from "vue";

export function usePlaceholder(type) {
  const string = type === "inventory" ? "请输入清点商品名称" : "";
  const placeholder = ref(string);

  return {
    placeholder,
  };
}
