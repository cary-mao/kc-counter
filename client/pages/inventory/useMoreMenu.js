import { ref } from "vue";
import { useRouter } from "vue-router";

export function useMoreActions() {
  return ref([
    { text: "添加物品", action: "add", icon: "addto" },
    { text: "提交", action: "upload", icon: "upload" },
  ]);
}

export function useMoreMenuSelectHandle() {
  const router = useRouter();

  return function (item, index) {
    switch (item.action) {
      case "add":
        router.push("/inventory/goodsAddition");
        break;
      case "filter":
        break;
      case "upload":
        break;
    }
  };
}
