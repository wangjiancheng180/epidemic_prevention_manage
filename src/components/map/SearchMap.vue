<template>
    <div class="search">
        <el-form label-position="right" label-width="80px" :model="formData" inline="true" style="max-width: 100%"
            ref="elForm">
            <el-form-item label="作业名称">
                <el-input v-model="formData.name" style="width: 200px;" />
            </el-form-item>
            <el-form-item label="目的地址">
                <el-input v-model="formData.address" id="tipinput" style="width:200px" />
                <!-- <el-button type="primary" @click="commit" style="margin:0 0 0 20px">派单</el-button> -->
            </el-form-item>
            <el-form-item label="目标经度">
                <el-input v-model="formData.lng" style="width: 200px;" disabled />
            </el-form-item>

            <el-form-item label="目的纬度">
                <el-input v-model="formData.lat" style="width:200px" disabled />
                <el-button type="primary" @click="commit" style="margin:0 0 0 20px">派单</el-button>
            </el-form-item>
            <!-- </el-form-item> -->
        </el-form>
    </div>
    <div id="cot"></div>
</template>

<script lang='ts'>
import { defineComponent, onBeforeMount, ref, toRef, onMounted, shallowRef } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader';
import { issueTask } from '@/service/iot/device';
export default defineComponent({
    name: 'SearchMap',

    props: ["deviceName"],
    setup(props) {
        // let tipinput: any = ref(null);

        onBeforeMount(() => {
            //2.组件挂载页面之前执行----onBeforeMount


        })
        let map: any = shallowRef(null);
        const placeSearch: any = ref(null)
        onMounted(() => {
            AMapLoader.load({
                key: "667337e5fdc90a0b19edc8560c6d2e54",             // 申请好的Web端开发者Key，首次调用 load 时必填
                version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: ['AMap.PlaceSearch', 'AMap.AutoComplete'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            }).then((AMap) => {
                map.value = new AMap.Map("cot", {  //设置地图容器id
                    // viewMode: "3D",    //是否为3D地图模式
                    zoom: 13,           //初始化地图级别
                    center: [120.436931, 30.447302], //初始化地图中心点位置
                    resizeEnable: true,
                    layers: [//只显示默认图层的时候，layers可以缺省
                        AMap.createDefaultLayer()//高德默认标准图层
                    ],
                });

                map.value.on('click', function (e: any) {
                    formData.value.lng = e.lnglat.getLng();
                    formData.value.lat = e.lnglat.getLat();
                });
                // console.log(tipinput.value)
                const autoOptions = { input: "tipinput" }

                const auto = new AMap.AutoComplete(autoOptions);
                console.log(auto)
                placeSearch.value = new AMap.PlaceSearch({
                    map: map.value,
                    // panel: "panel", // 结果列表将在此容器中进行展示。
                    // city: "0574", // 兴趣点城市
                    autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                    extensions: 'base' //返回基本地址信息
                });  //构造地点查询类
                auto.on("select", select);//注册监听，当选中某条记录时会触发
                function select(e: any) {
                    console.log("监听", e)
                    placeSearch.value?.setCity(e.poi.adcode);
                    placeSearch.value?.search(e.poi.name, (status: any, result: any) => {
                        /** 默认返回第一个符合地坐标*/
                        formData.value.lng = result.poiList.pois[0].entr_location.lng;
                        formData.value.lat = result.poiList.pois[0].entr_location.lat;
                    });  //关键字查询查询
                }
                // map.value.setMapStyle('amap://styles/macaron');
            }).catch(e => {
                console.log(e);
            })
        })
        const formData = ref({ address: "", name: "", deviceName: "", lng: "", lat: "" })
        const deviceName = toRef(props, "deviceName")
        const commit = () => {
            // console.log(placeSearch.value)
            // placeSearch.value.search("北京大学")
            formData.value.deviceName = deviceName.value
            issueTask(formData.value)
        }
        return {
            formData,
            commit
        }
    },
})

</script>
<style scoped lang='less'>
#cot {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 1000px;
}
</style>