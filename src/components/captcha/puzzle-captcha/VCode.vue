<template>

    <div>
        <el-button v-if="completeToref" type="success" disabled plain style="width:100%">已完成图片验证</el-button>
        <el-button v-if="!completeToref" style="width:100%" @click="isShow = true">点击完成图片验证</el-button>
        <puzzle-code :bind="$attrs" :show="isShow" success-text="验证成功" fail-text="验证失败" slider-text="拖动滑块完成拼图"
            @success="success" @fail="fail" @close="close"></puzzle-code>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, toRef } from 'vue'
import PuzzleCode from './PuzzleCode.vue'

export default defineComponent({
    name: 'VCode',
    components: {
        PuzzleCode
    },
    props: {
        complete: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    emits: ["success", "fail", "close"],
    setup(props, context) {

        const completeToref = toRef(props, "complete")
        const isShow = ref(false);
        // 用户通过了验证
        function success(x: any) {
            isShow.value = false // 通过验证后，需要手动隐藏模态框
            context.emit('success', x)
        }
        // 用户点击遮罩层，应该关闭模态框
        function close() {
            isShow.value = false
            context.emit('close')
        }
        function fail(x: any) {
            context.emit('fail', x)
        }

        return {
            isShow,
            success,
            close,
            fail,
            completeToref
        }
    },
})

</script>
<style scoped lang='less'>
</style>