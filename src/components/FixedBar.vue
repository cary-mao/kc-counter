<script lang="jsx">
import { usePlaceholder } from "vant/es/composables/use-placeholder";
import { createNamespace } from "vant/es/utils/index";
import {ref} from 'vue'

const [name, bem] = createNamespace("fixed-bar");

export default {
  name,
  setup(props, context) {
    const fixedBarRef = ref()
    const renderPlaceholder = usePlaceholder(fixedBarRef, bem)
    const fixedBarRender = () => <div ref={fixedBarRef} className={bem('wrapper')}>{context.slots}</div>;
    return () => renderPlaceholder(fixedBarRender);
  },
};
</script>

<style lang="stylus">
.van-fixed-bar {
  &__wrapper {
    position: fixed;
    width: 100%;
  }
}
</style>