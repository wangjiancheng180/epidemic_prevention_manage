<template>
    <div>
        <!-- <common-table :table-dtata="tableData" :table-types="tableTypes">
            <el-button type="success" plain>Success</el-button>
        </common-table> -->
    </div>
</template>

<script lang='ts'>
import { defineComponent, onBeforeMount, onMounted } from 'vue'
// import CommonTable from '@/components/table/CommonTable.vue'
import { tableTypes } from './config/type'
export default defineComponent({
    name: 'User',
    components: {
        // CommonTable
    },
    setup() {
        onBeforeMount(() => {
            //2.组件挂载页面之前执行----onBeforeMount
        })
        onMounted(() => {
            //3.组件挂载到页面之后执行-------onMounted
        })


        return {

            tableTypes
        }
    },
})

</script>
<style scoped lang='less'>
</style>