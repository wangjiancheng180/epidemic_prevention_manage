<template>
    <div id="container" style="height:500px;"></div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, PropType, shallowRef, watch } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader';
import { MapData } from '@/views/main/visualization/statistics/config/type';
import { computed } from '@vue/reactivity';

export default defineComponent({
    name: 'StatisticsMap',

    props: {
        mapData: {
            type: Object as PropType<MapData>
        }
    },
    setup(props) {

        let map: any = shallowRef(null);
        onMounted(() => {
            AMapLoader.load({
                key: "667337e5fdc90a0b19edc8560c6d2e54",             // 申请好的Web端开发者Key，首次调用 load 时必填
                version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: [],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            }).then((AMap) => {
                map.value = new AMap.Map("container", {  //设置地图容器id
                    // viewMode: "3D",    //是否为3D地图模式
                    zoom: 18,           //初始化地图级别
                    center: props.mapData?.center, //初始化地图中心点位置
                });
                // map.value.setMapStyle('amap://styles/macaron');
            }).catch(e => {
                console.log(e);
            })
        })

        watch(map, (val) => {
            if (val) {
                AMapLoader.load({
                    key: "667337e5fdc90a0b19edc8560c6d2e54",             // 申请好的Web端开发者Key，首次调用 load 时必填
                    version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                    plugins: [],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
                }).then((AMap) => {
                    const circle = new AMap.Circle({
                        center: new AMap.LngLat(props.mapData?.center[0], props.mapData?.center[1],),// 圆心位置
                        radius: props.mapData?.radius, //半径
                        strokeColor: "#FF33FF", //线颜色
                        strokeOpacity: 0.7, //线透明度
                        strokeWeight: 3,    //线宽
                        fillColor: "#1791fc", //填充色
                        fillOpacity: 0.5//填充透明度
                    });
                    circle.setMap(map.value);//显示圆圈
                    map.value.setFitView();//根据地图上添加的覆盖物分布情况，自动缩放地图到合适的视野级别
                })
            }
        }, { deep: true })
        return {
            map
        }
    },
})

</script>
<style scoped lang='less'>
#container {
    padding: 0px;
    margin: 0px;
    width: 100%;

}
</style>