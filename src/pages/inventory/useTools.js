import { ref } from "vue";

export function useToolActions() {
  return ref([
    {
      name: "createTask",
      icon: "createtask",
      fn() {
        console.log("createTask");
      },
    },
    {
      name: "save",
      icon: "save1",
    },
    {
      name: "selectAll",
      icon: "quanxuan",
    },
  ]);
}
