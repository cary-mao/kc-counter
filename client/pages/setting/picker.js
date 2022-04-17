import { computed } from "vue";

/**
 * @class
 * 列表的描述对象为：
 * {
 *  [target: string]: {
 *      picked: Ref<string> // 勾选项的key
 *      options: {
 *          [key: string]: string // 项目的key:名字
 *      }
 *      title: string
 *      onConfirm: (value, index)
 *  }
 * }
 */
class TargetPicker {
  /**
   *
   * @param {string} target ref
   * @param {object} descriptor 非ref
   */
  constructor(target, descriptors) {
    this.target = target;
    this.descriptors = descriptors;
    this.listMap = {}; // cache list
    this.valueToKeyMap = {};
    this.init();
  }
  getDescriptor(target) {
    return this.descriptors[target];
  }
  getList(target) {
    if (!this.listMap[target]) {
      this.listMap[target] = Object.values(this.getDescriptor(target).options);
    }
    return this.listMap[target];
  }
  getKeyFromValue(target, key) {
    if (!this.valueToKeyMap[target]) {
      const map = (this.valueToKeyMap[target] = {});
      const options = this.getDescriptor(target).options;
      Object.keys(options).forEach((key) => {
        map[options[key]] = key;
      });
    }
    return this.valueToKeyMap[target][key];
  }
  init() {
    this.columns = computed(() => this.getList(this.target.value));
    this.index = computed(() => {
      const target = this.target.value;
      const descriptor = this.getDescriptor(target);
      const curOption = descriptor.options[descriptor.picked.value];
      return this.getList(target).indexOf(curOption);
    });
    this.title = computed(() => this.getDescriptor(this.target.value).title);
    this.handleConfirm = this.handleConfirm.bind(this);
  }
  handleConfirm() {
    const fn = this.getDescriptor(this.target.value).onConfirm;
    if (fn) {
      fn.apply(this, arguments);
    }
    if (this.afterConfirm) {
      this.afterConfirm.apply(this, arguments);
    }
  }
}

export default TargetPicker;
