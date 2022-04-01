<template>
    <div>
        <common-table :table-types="tableTypes">
            <el-form
                label-position="left"
                label-width="100px"
                :model="formData"
                style="max-width: 460px"
            >
                <el-form-item label="名称">
                    <el-input v-model="formData.name" />
                </el-form-item>
                <el-form-item label="key值">
                    <el-input v-model="formData.sourceKey" />
                </el-form-item>
                <el-form-item label="Activity form">
                    <el-input v-model="formData.type" />
                </el-form-item>
                <el-form-item label="父级资源">
                    <el-cascader
                        v-model="formData.parentId"
                        :options="options"
                        :props="{ checkStrictly: true, value: 'id', label: 'name' }"
                        clearable
                        placeholder="不选默认为顶级资源"
                        size="large"
                    />
                </el-form-item>
            </el-form>
        </common-table>
    </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRef } from 'vue'
import CommonTable from '@/components/table/CommonTable.vue'
import { tableTypes } from './config/tableConfig'
import { useStore } from '@/store/index'
export default defineComponent({
    name: 'Resource',
    components: {
        CommonTable,

    },
    setup() {
        const formData = reactive({
            name: '',
            parentId: '',
            sourceKey: '',
            type: '',
        })

        const payload = { dataName: 'resource' }
        const store = useStore();
        store.dispatch('system/changeData', payload)
        const options = toRef(store.state.system, 'resourceList')
        return {
            tableTypes,
            formData,
            options
        }
    },
})

</script>
<style scoped lang='less'>
</style>