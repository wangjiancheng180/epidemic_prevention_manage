<template>
    <template v-for="item in childrenList" :key="item.id">
        <template v-if="item.type == 1">
            <el-menu-item v-if="item.children.length == 0 || item.children[0].type == 2"
                :index="`/main${item.sourceUrl}`">
                <el-icon>
                    <i class="iconfont" :innerHTML="item.icon"></i>
                </el-icon>
                <span>{{ item.name }}</span>
            </el-menu-item>
            <el-sub-menu v-else :index="item.sourceUrl">
                <template #title>
                    <el-icon>
                        <i class="iconfont" v-bind:innerHTML="item.icon"></i>
                    </el-icon>

                    <span>{{ item.name }}</span>
                </template>
                <TreeMenu :childrenList="item.children"></TreeMenu>
            </el-sub-menu>
        </template>
    </template>
</template>

<script lang='ts'>
import { defineComponent, PropType, toRef } from 'vue'
import { SysResourceTree } from '@/service/system/resource/type'
export default defineComponent({
    name: 'TreeMenu',
    props: {
        childrenList: Array as PropType<Array<SysResourceTree>>
    },
    setup(props) {
        const childrenListToRef = toRef(props, "childrenList")


        return {
            childrenListToRef
        }
    },
})

</script>
<style scoped lang='less'>
.el-sub-menu {
    font-weight: bolder;
}
</style>