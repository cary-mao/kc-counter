<template>
    <Field placeholder="请输入物品名称" v-model="inputText" @update:model-value="handleChange" />
    <Cell>
        <Button size="small" type="primary" @click="handleSelectAll" class="button">全选</Button>
        <Button size="small" type="primary" hairline plain @click="handleSelectReverse" class="button">反选</Button>
        <Button size="small" type="success" @click="handleCertain" class="button">确定</Button>
    </Cell>
    <CheckboxGroup v-model="checked" class="checkbox-group">
        <Checkbox class="checkbox" v-for="option in options" :key="option.value"
            @click="emit('itemClick', unref(option))" :name="option.value" shape="square">{{ option.text }}</Checkbox>
    </CheckboxGroup>
    <p v-if="options.length === 0">没有搜索结果</p>
</template>

<script setup>
// checkbox和navbar同时出现时，van-icon样式冲突，导致checkbox的样式显示错误
import { Field, Cell, Checkbox, CheckboxGroup, Button } from 'vant'
import { ref, unref, getCurrentInstance } from 'vue'

const { emit } = getCurrentInstance()

const props = defineProps({
    options: {
        type: Array,
        default: () => []
    },
    listMaxHeight: String
})
defineEmits(['itemClick', 'certain'])

console.log(props.listMaxHeight)

const inputText = ref('')
const options = ref(props.options)
const checked = ref(getResultAllCheckedArray())

// 获取所有options的checked
function getResultAllCheckedArray() {
    return options.value.map(option => option.value)
}

function handleChange(value) {
    if (value) {
        options.value = props.options.filter(item => item.text.indexOf(value) >= 0)
    } else {
        options.value = props.options
    }
}

function handleSelectAll() {
    checked.value = getResultAllCheckedArray()
}

function handleSelectReverse() {
    checked.value = options.value.filter(option => {
        return checked.value.indexOf(option.value) < 0
    }).map(option => option.value)
}

function handleCertain() {
    const checkedOptions = options.value.filter(option => checked.value.includes(option.value))

    emit('certain', checkedOptions)
}
</script>

<style lang="stylus" scoped>
.checkbox {
    padding: 0 0 8px 16px;

    ::v-deep(.van-icon) {
        color: var(--van-white);
    }

    &-group {
        overflow-y: auto;
        max-height: v-bind(listMaxHeight);
    }
}
.button + .button {
    margin-left: 8px;
}
</style>