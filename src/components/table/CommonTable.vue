<template>
    <div class="table">
        <div class="table-head">
            <span class="title">{{ configToRef.title }}</span>
            <div class="handle">
                <el-button type="success" plain @click="createFormData()">新建</el-button>
                <slot name="excel"></slot>
                <!-- <slot name="importExcel"></slot> -->
            </div>

        </div>
        <el-table :data="tableDataToRef" :border="true" row-key="id" style="width: 100%"
            :height="configToRef.tableHeight">
            <el-table-column v-for="(tableType, index) in tableTypesToRef" :prop="tableType.prop"
                :label="tableType.label" :width="tableType.width" :align="tableType.align || 'left'" :key="index">
                <template v-if="tableType.isSlot" #default="scope">

                    <slot :item="scope.row[tableType.prop]" :name="tableType.prop"></slot>
                </template>

            </el-table-column>

            <el-table-column v-if="configToRef.isTrail" fixed="right" label="轨迹" width="120" :align="'center'">
                <template #default="scope">
                    <slot :item="scope.row" name="trail"></slot>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120" :align="'center'">
                <template #default="scope">
                    <el-button type="text" :icon="Edit" @click="updateFormData(scope)"></el-button>
                    <el-button type="text" :icon="Delete" @click="deleteById(scope.row.id)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="configToRef.dialogFormVisible"
            :title="config.isUpdate ? `修改${configToRef.formTitle}` : `新建${configToRef.formTitle}`" center
            :close-on-click-modal="false" width="30%">
            <div class="form">
                <slot></slot>
            </div>
        </el-dialog>

        <slot name="page"></slot>
    </div>
</template>

<script lang='ts'>
import { defineComponent, toRef, PropType } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
// import { SystemState } from "@/store/system/type"
import { useStore } from '@/store'
interface TableTypes {
    prop: string,
    label: string,
    width?: string,
    align?: string
    isSlot?: boolean,
    [propNames: string]: any
}
interface ConfigType {

    title: string,
    formTitle?: string,
    tableHeight?: number,
    dialogFormVisible: boolean,
    tableDataName: any,
    storeModule: string
    source: string,
    isUpdate: boolean,
    isTrail?: boolean
}
export default defineComponent({
    name: 'CommonTable',
    props: {
        tableTypes: {
            type: Array as PropType<Array<TableTypes>>,
            required: true

        },
        config: {
            type: Object as PropType<ConfigType>,
            required: true,
        }
    },
    emits: ['deleteData'],
    setup(props, ctx) {
        //获取基本配置
        const configToRef = toRef(props, 'config')
        //获取表格配置
        const tableTypesToRef = toRef(props, 'tableTypes');
        const store = useStore();
        //获取表格数据
        const tableDataToRef = toRef(store.state[configToRef.value.storeModule], configToRef.value.tableDataName)

        //更新数据
        function updateFormData(scope: any) {
            const payload = { source: configToRef.value.source, id: scope.row.id }
            store.dispatch(`${configToRef.value.storeModule}/changeFormData`, payload).then(() => {

                configToRef.value.dialogFormVisible = true;
                configToRef.value.isUpdate = true;
            })
        }
        //新建数据
        const createFormData = async () => {
            const payload = { source: configToRef.value.source }
            await store.dispatch(`${configToRef.value.storeModule}/clearFormData`, payload)
            configToRef.value.isUpdate = false;
            configToRef.value.dialogFormVisible = true;
        }

        //删除数据
        function deleteById(id: number) {
            ctx.emit('deleteData', id)
        }
        return {
            tableDataToRef,
            tableTypesToRef,
            configToRef,
            Edit,
            Delete,
            updateFormData,
            createFormData,
            deleteById
        }
    },
})

</script>
<style scoped lang='less'>
.table {
    background-color: #ffffff;

    // height: 2000px;
    // overflow-y: scroll;
    // &::-webkit-scrollbar {
    //     display: none;
    // }
    .table-head {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 20px 20px 20px 20px;
    }

    .title {
        font-size: 80px;
        font-weight: 700;
    }

    .handle {
        width: 30%;
        display: flex;
        flex-direction: row-reverse;
    }
}

.form {
    display: flex;
    justify-content: center;
    padding: 0 210px 0 0;
    max-height: 1200px;
    overflow-y: auto;
    //设置滚动条出现时的厚度 这里是为了ie和Firefox浏览器不兼容-webkit-scrollbar
    // scrollbar-width: none;
    // /* firefox */
    // -ms-overflow-style: none;

    /* IE 10+ */
    // &::-webkit-scrollbar {
    //     display: none;
    // }

    &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 20px;
        /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }

    &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        background-color: skyblue;
        background-image: -webkit-linear-gradient(45deg,
                rgba(255, 255, 255, 0.2) 25%,
                transparent 25%,
                transparent 50%,
                rgba(255, 255, 255, 0.2) 50%,
                rgba(255, 255, 255, 0.2) 75%,
                transparent 75%,
                transparent);
    }

    &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #ededed;
        border-radius: 10px;
    }
}
</style>