import { ref } from "vue";
import { useRouter } from "vue-router";

export function useMoreActions() {
  return ref([
    { text: "清单", action: "task", icon: "createtask" },
    { text: "提交", action: "upload", icon: "upload" },
  ]);
}

export function useMoreMenuSelectHandle() {
  const router = useRouter();

  return function (item, index) {
    switch (item.action) {
      case "add":
        router.push("/inventory/addition");
        break;
      case "filter":
        break;
      case "upload":
        break;
    }
  };
}
