<template>
    <div class="page-china-chart">
        <msi-echarts :options="option" :height="'500px'"></msi-echarts>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";

import MsiEcharts from "../msi-echarts/MsiEcharts.vue";
import mapProvinceToMap from "../msi-echarts/hooks/mapProvinceToMap";
// import mapCityToMap from "../msi-echarts/hooks/mapCityToMap";
import { EChartsOption } from "echarts";
import { ResultData } from "./hooks/pageChinaCharts";


export default defineComponent({
    name: "PageChinaCharts",
    props: {
        optionData: {
            type: Object as PropType<ResultData>,
            default: () => ({})
        }
    },
    components: { MsiEcharts },
    setup(props) {
        var option = computed((): EChartsOption => {
            if (!props.optionData.mapValues) {
                return {};
            }
            return {
                backgroundColor: "#FFFFFF",

                title: {
                    text: "全国确诊病例统计",
                    top: 20,
                    left: "center",
                    textStyle: {
                        // color: "#fff"
                    }
                },
                tooltip: {
                    trigger: "item",
                    formatter: (params: any) => {

                        return `${params.name}当前确诊病例:${params.data?.value.at(-1)}`

                    }
                },
                visualMap: {
                    min: 0,
                    max: 1000,
                    left: 20,
                    bottom: 20,
                    // calculable: true,
                    // text: ["高", "低"],
                    pieces: [
                        {
                            gte: 10000,
                            label: ">10000例",
                            color: "#B80909"
                        },
                        {
                            gt: 1000,
                            lte: 9999,
                            label: "1000-9999例",
                            color: "#E64546"
                        }, {
                            gte: 100,
                            lte: 999,
                            label: "100-999例",
                            color: "#F57567"
                        }, {
                            gte: 10,
                            lte: 99,
                            label: "10-99例",
                            color: "#FF9985"
                        }, {
                            gte: 1,
                            lte: 9,
                            label: "1-9例",
                            color: "#FFE5DB"
                        },
                        {
                            lte: 0,
                            label: "0例",
                            color: "#97DE5E"
                        }],
                    textStyle: {
                        color: "#585750"
                    },
                    showLabel: true
                },
                geo: {
                    map: "china",
                    roam: false,
                    emphasis: {
                        // areaColor: "#f4cccc",
                        // borderColor: "rgb(9, 54, 95)",
                        itemStyle: {

                            areaColor: "#FFDF33"
                        },

                    },
                    label: {
                        show: true
                    },
                    zoom: 1.15
                },
                series: [
                    // {
                    //     name: "现有确诊",
                    //     type: "scatter",
                    //     coordinateSystem: "geo",
                    //     data: mapCityToMap(props.optionData.mapValues),
                    //     symbolSize: 12,
                    //     emphasis: {
                    //         itemStyle: {
                    //             borderColor: "#fff",
                    //             borderWidth: 1
                    //         }
                    //     }
                    // },
                    {
                        type: "map",
                        map: "确诊病例统计",
                        geoIndex: 0,
                        aspectScale: 1,
                        data: mapProvinceToMap(props.optionData.mapValues),
                        tooltip: {
                            show: true
                        }
                    }
                ]
            };
        });
        return { option };
    }
});
</script>

<style lang="less" scoped>
</style>
