<template>
    <div></div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref, computed, onBeforeMount, onMounted } from 'vue'
export default defineComponent({
    name: '',
    setup() {
        onBeforeMount(() => {
            //2.组件挂载页面之前执行----onBeforeMount
        })
        onMounted(() => {
            //3.组件挂载到页面之后执行-------onMounted
        })

        return {

        }
    },
})

</script>
<style scoped lang='less'>
</style>