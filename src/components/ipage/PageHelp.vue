<template>
    <div class="pagination-block">
        <!-- <div class="demonstration">All combined</div> -->
        <el-pagination v-model:currentPage="pageInfoToRef.page" v-model:page-size="pageInfoToRef.size" background
            layout="slot, ->, prev, pager, next, jumper" :total="pageInfoToRef.total">
            <div class="left">
                <span class="total">总计 {{ pageInfoToRef.total }} 条</span>
                <el-select v-model="pageInfoToRef.size" clearable placeholder="Select">
                    <el-option v-for="item in pageInfoToRef.pageOptions" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </div>
        </el-pagination>
    </div>
</template>

<script lang='ts'>

interface PageOption {
    label: string,
    value: number
}
interface PageInfo {
    page: number,
    size: number,
    total: number,
    pageOptions: Array<PageOption>
}
import { defineComponent, toRef, PropType } from 'vue'
export default defineComponent({
    name: 'PageHelp',
    props: {
        pageInfo: {
            type: Object as PropType<PageInfo>,
            required: true
        }
    },
    setup(props) {
        const pageInfoToRef = toRef(props, 'pageInfo');
        return {
            pageInfoToRef
        }
    },
})

</script>
<style scoped lang='less'>
.pagination-block {
    width: 100%;
    margin: 20px 0 0 0;
}

.left {
    font-size: 32px;
    font-weight: bolder;
    display: flex;
}

.total {
    margin: 0 20px 0 0;
}
</style>