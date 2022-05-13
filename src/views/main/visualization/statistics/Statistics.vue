<template>
    <div>
        <!-- <msi-echarts :options="options"></msi-echarts> -->
        <el-row style="margin-bottom: 20px;" :gutter="20">
            <el-col :span="6" v-for="(item, index) in cardCongfigs" :key="index">
                <msi-card :config="item"></msi-card>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="12">
                <page-china-charts :option-data="epidemicData"></page-china-charts>
            </el-col>
            <el-col :span="12">
                <statistics-map v-if="mapData" :map-data="mapData"></statistics-map>
            </el-col>
        </el-row>
        <!-- <el-row>
            <el-col :span="12">
                <page-china-charts :option-data="epidemicData"></page-china-charts>
            </el-col>
        </el-row> -->

    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, onBeforeMount, onMounted, computed } from 'vue'
// import MsiEcharts from '@/components/echarts/msi-echarts/MsiEcharts.vue'
// import { EChartsOption } from "echarts";
import PageChinaCharts from '@/components/echarts/echarts-page/PageChinaCharts.vue';
import { queryChinaEpidemicData } from "@/service/visualization/statistics";
import { transformData, ResultData } from '@/components/echarts/echarts-page/hooks/pageChinaCharts';
import MsiCard from '@/components/card/msi-card/MsiCard.vue'
import { getCardData, getPointsCenter, getRadius } from './hooks/method'
import { Config as CardConfig } from '@/components/card/msi-card/hooks/type'
import StatisticsMap from '@/components/map/statistics-map/StatisticsMap.vue'
import { queryAllPoints } from '@/service/university/trail';
import { MapData } from './config/type'
export default defineComponent({
    name: 'Statistics',
    components: {
        // MsiEcharts
        PageChinaCharts,
        MsiCard,
        StatisticsMap
    },
    setup() {
        onBeforeMount(() => {
            //2.组件挂载页面之前执行----onBeforeMount
        })
        onMounted(() => {
            //3.组件挂载到页面之后执行-------onMounted
        })
        let epidemicData = ref<ResultData>();

        queryChinaEpidemicData().then((result) => {
            epidemicData.value = transformData(result.data)

        });

        //聚集范围
        let mapData = ref<MapData>();
        queryAllPoints().then((result) => {
            //先获取中心点
            const point = getPointsCenter(result.data);
            //获取半径
            const radius = getRadius(point, result.data);
            mapData.value = { center: [point.lng, point.lat], radius: radius };
            console.log(mapData.value)
        });
        const cardCongfigs = computed((): Array<CardConfig> => {
            return getCardData(epidemicData.value)
        })
        return {
            epidemicData,
            cardCongfigs,
            mapData
        }
    },
})

</script>
<style scoped lang='less'>
</style>