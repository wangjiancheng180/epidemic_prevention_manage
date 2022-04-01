<template>
    <div class="table">
        <div class="table-head">
            <span class="title">资源列表</span>
            <el-button type="success" plain @click="dialogFormVisible = true">Success</el-button>
        </div>
        <el-table :data="tableDataToRef" :border="flag" row-key="id" style="width: 100%">
            <el-table-column
                v-for="(tableType, index) in tableTypesToRef"
                :prop="tableType['prop']"
                :label="tableType['label']"
                :width="tableType['width']"
                :align="tableType['align'] || 'left'"
                :key="index"
            />
            <el-table-column fixed="right" label="Operations" width="120">
                <template #default>
                    <el-button type="text" size="small">Detail</el-button>
                    <el-button type="text" size="small">Edit</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="dialogFormVisible" title="新建资源" center>
            <slot></slot>
            <!-- <el-form :model="form">
                <el-form-item label="Promotion name" label-width="140px">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="Zones" label-width="140px">
                    <el-select v-model="form.region" placeholder="Please select a zone">
                        <el-option label="Zone No.1" value="shanghai" />
                        <el-option label="Zone No.2" value="beijing" />
                    </el-select>
                </el-form-item>
            </el-form>-->
        </el-dialog>
    </div>
</template>

<script lang='ts'>
import { defineComponent, toRef, ref } from 'vue'
import { useStore } from '@/store'
export default defineComponent({
    name: 'CommonTable',
    props: {
        tableTypes: {}
    },
    setup(props) {
        const store = useStore();
        const tableDataToRef = toRef(store.state.system, 'resourceList')

        const tableTypesToRef = toRef(props, 'tableTypes');

        const flag = true;
        const dialogFormVisible = ref(false);
        // const form = reactive({
        //     name: '',
        //     region: '',
        //     date1: '',
        //     date2: '',
        //     delivery: false,
        //     type: [],
        //     resource: '',
        //     desc: '',
        // })

        return {
            tableDataToRef,
            tableTypesToRef,
            flag,
            dialogFormVisible,
            // form
        }
    },
})

</script>
<style scoped lang='less'>
.table {
    background-color: #ffffff;
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
}
</style>