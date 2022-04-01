<template>
    <div>
        <common-table :table-dtata="tableData" :table-types="tableTypes">
            <el-button type="success" plain>Success</el-button>
        </common-table>
    </div>
</template>

<script lang='ts'>
import { defineComponent, onBeforeMount, onMounted } from 'vue'
import CommonTable from '@/components/table/CommonTable.vue'
import { tableTypes } from './config/tableConfig'
export default defineComponent({
    name: 'User',
    components: {
        CommonTable
    },
    setup() {
        onBeforeMount(() => {
            //2.组件挂载页面之前执行----onBeforeMount
        })
        onMounted(() => {
            //3.组件挂载到页面之后执行-------onMounted
        })

        const tableData = [
            {
                id: '1',
                date: '2016-05-03',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
                children: [
                    {
                        id: '5',
                        date: '2016-05-02',
                        name: 'Tom',
                        address: 'No. 189, Grove St, Los Angeles',
                        children: [
                            {
                                id: '7',
                                date: '2016-05-02',
                                name: 'Tom',
                                address: 'No. 189, Grove St, Los Angeles',
                            },
                            {
                                id: '8',
                                date: '2016-05-04',
                                name: 'Tom',
                                address: 'No. 189, Grove St, Los Angeles',
                            },
                        ]
                    },
                    {
                        id: '6',
                        date: '2016-05-04',
                        name: 'Tom',
                        address: 'No. 189, Grove St, Los Angeles',
                    },
                ]
            },
            {
                id: '2',
                date: '2016-05-02',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                id: '3',
                date: '2016-05-04',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                id: '4',
                date: '2016-05-01',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            }
        ]
        return {
            tableData,
            tableTypes
        }
    },
})

</script>
<style scoped lang='less'>
</style>