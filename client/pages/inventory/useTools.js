import { ref } from "vue";
import { useRouter } from "vue-router";

export const filterBarShow = ref(false);

export function useToolActions() {
  const router = useRouter();

  return ref([
    {
      name: "addto",
      icon: "addto",
      fn() {
        router.push("/inventory/goodsAddition");
      },
    },
    {
      name: "save",
      icon: "save1",
    },
    // {
    //   name: "selectAll",
    //   icon: "quanxuan",
    // },
    {
      name: "undo",
      icon: "undo",
    },
    {
      name: "redo",
      icon: "redo",
    },
    {
      name: "history",
      icon: "lishijilu",
    },
    {
      name: "filter",
      icon: "shaixuan_o",
      fn() {
        filterBarShow.value = !filterBarShow.value;
        console.log(filterBarShow.value);
      },
    },
    {
      name: "search",
      icon: "search",
    },
    {
      name: "upload",
      icon: "upload",
    },
  ]);
}
