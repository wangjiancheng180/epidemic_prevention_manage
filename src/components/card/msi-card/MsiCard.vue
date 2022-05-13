<template>
    <div class="box-card">
        <el-card shadow="hover">
            <template #header>
                <div class="card-header">
                    <span>{{ configToRef?.title }}</span>
                    <!-- <el-button class="button" type="text">Operation button</el-button> -->
                </div>
            </template>
            <div class="card-body" :style="configToRef?.style">
                {{ configToRef?.data }}
            </div>
        </el-card>
    </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, toRef } from 'vue'
import { Config } from './hooks/type'
export default defineComponent({
    name: 'MsiCard',
    props: {
        config: {
            type: Object as PropType<Config>
        }
    },
    setup(props) {
        const configToRef = toRef(props, 'config');
        return {
            configToRef
        }
    },
})

</script>
<style scoped lang='less'>
.box-card {
    width: 100%;
    font-size: 50px;
    font-weight: bolder;
}

.card-header {
    height: 50px;
    text-align: center;

}

.card-body {
    text-align: center;
    height: 150px;
    font-size: 100px;
}
</style>