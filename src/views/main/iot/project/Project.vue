<template>
    <div class="device">
        <div id="container">
        </div>
        <div class="left">
            <el-card shadow="always">
                <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" :stretch="true">
                    <el-tab-pane label="在线" name="ONLINE">
                        <template #default>
                            <device-list :device-list="list" v-if="list != null" :loading="loading"
                                @change-device="changeDevice"></device-list>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="离线" name="OFFLINE">
                        <template #default>
                            <device-list :device-list="list" v-if="list != null" :loading="loading"
                                @change-device="changeDevice"></device-list>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="未入网" name="UNACTIVE">
                        <template #default>
                            <device-list :device-list="list" v-if="list != null" :loading="loading"
                                @change-device="changeDevice"></device-list>
                        </template>
                    </el-tab-pane>


                </el-tabs>
            </el-card>

        </div>
        <div class="right">
            <el-card shadow="always" class="card" v-loading="loading">
                <template #header>
                    <div class="card-header">
                        <span>{{ deviceName }}</span>
                        <!-- <el-button class="button" type="text">Operation button</el-button> -->
                    </div>
                    <i class="iconfont config" @click="isConfig = true">&#xe916;</i>
                    <el-dialog v-model="isConfig" title="车辆派单" center :close-on-click-modal="false" destroy-on-close
                        width="50%">
                        <search-map :device-name="deviceName"></search-map>
                    </el-dialog>
                </template>
                <div class="card-body">
                    <!-- 这里可以是摄像头视频流 -->
                    <!-- <el-image style="width: 300px; height: 150px" :src="url"></el-image> https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4-->
                    <video width="300" height="150" controls>
                        <source src="http://localhost:9001/api/device/show" type="video/mp4" />
                        您的浏览器不支持 video 标签。
                    </video>
                    <div class="card-body-content">
                        <el-row justify="space-between" class="row">
                            <el-col :span="10">

                                <div> <i class="iconfont">&#xe603;</i>发动机：{{ upInfo.flameout.value == 0 ? '未熄火' : '熄火'
                                }}</div>
                            </el-col>
                            <el-col :span="10">
                                <div class="lufe"><i class="iconfont">&#xe615;</i>油量：{{ upInfo.fuel.value }}L</div>
                            </el-col>
                        </el-row>
                        <el-row justify="space-between" class="row">
                            <el-col :span="10">
                                <div><i class="iconfont">&#xe66c;</i>温度：{{ upInfo.temperature.value }}℃</div>
                            </el-col>
                            <el-col :span="10">
                                <div class="lufe"><i class="iconfont">&#xe620;</i>湿度：{{ upInfo.humidity.value }}%RH
                                </div>
                            </el-col>
                        </el-row>
                        <el-row justify="space-between" class="row">
                            <el-col :span="12">
                                <div><i class="iconfont">&#xe625;</i>速度：{{ upInfo.speed.value }}km/h</div>
                            </el-col>
                            <el-col :span="12">
                                <div class="lufe"><i class="iconfont">&#xe647;</i>里程数：{{ upInfo.mileage.value }}km</div>
                            </el-col>
                        </el-row>
                    </div>
                </div>

            </el-card>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watch, shallowRef, onMounted } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import AMapLoader from '@amap/amap-jsapi-loader';
import { sendWebSocket, creatWebSocket } from '@/util/websocket'
import SearchMap from '@/components/map/SearchMap.vue';
import DeviceList from '@/components/iot/DeviceList.vue';
import { queryDeviceList } from '@/service/iot/device'
// import { ElMessage } from 'element-plus'

export default defineComponent({
    name: '',
    components: {
        SearchMap,
        DeviceList
    },
    setup() {
        // 上报的数据信息
        const upInfo: any = ref({ flameout: "", fuel: "", temperature: "", humidity: "", speed: "", mileage: "", latitude: "", longitude: "" });
        let map: any = shallowRef(null);
        const deviceName = ref("暂未连接")
        let websocket: any = null;
        watch(deviceName, () => {
            // ElMessage.closeAll()
            loading.value = false;


        })
        //用来存放地图加载的AMap
        let myAmap: any = null;
        onMounted(() => {
            AMapLoader.load({
                key: "667337e5fdc90a0b19edc8560c6d2e54",             // 申请好的Web端开发者Key，首次调用 load 时必填
                version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: ['AMap.Geolocation', 'AMap.MoveAnimation'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            }).then((AMap) => {
                myAmap = AMap
                map.value = new AMap.Map("container", {  //设置地图容器id
                    // viewMode: "3D",    //是否为3D地图模式
                    zoom: 13,           //初始化地图级别
                    center: [120.436931, 30.447302], //初始化地图中心点位置
                });
                // map.value.setMapStyle('amap://styles/macaron');
            }).catch(e => {
                console.log(e);
            })
            websocket = creatWebSocket("ws://127.0.0.1:9001/api/websocket/1")

            websocket.onmessage = function (message: any) {
                // console.log(message.data)
                let data = JSON.parse(message.data)
                upInfo.value = data.items;
                let nDeviceName = data.deviceName
                // console.log(data)
                let point = {
                    lng: data.items.longitude.value,
                    lat: data.items.latitude.value
                }
                if (deviceName.value != nDeviceName) {
                    //如果后端数据不属于当前设备的就新增
                    console.log("marerMap", makerMap[nDeviceName])
                    if (makerMap[nDeviceName] === undefined) {
                        console.log("进来了")
                        createMarker(point, nDeviceName)
                    }
                    deviceName.value = nDeviceName;
                }
                //移动车辆
                moveCar(point, nDeviceName)
                // console.log(upInfo.value)
                // moveCar()
            };
            //加载设备列表
            queryDevices({ status: activeName.value })
        })

        //定义一个MAP用来存放maker
        const makerMap = new Map();

        //创建Maker
        const createMarker = (point: any, markeName: any) => {
            map.value.setZoomAndCenter(15, [point.lng, point.lat], false, 1000)
            const animationMarker = new myAmap.Marker({
                position: new myAmap.LngLat(point.lng, point.lat),
                icon: "https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png",
                offset: new myAmap.Pixel(-13, -26),
            });
            // console.log(animationMarker)
            map.value.add(animationMarker)
            //创建好后需要添加makerMap中
            makerMap[markeName] = animationMarker;
            console.log(makerMap)
        }
        //移动车辆
        const moveCar = (point: any, markeName: any) => {
            map.value.setZoomAndCenter(15, [point.lng, point.lat], false, 1000)
            if (makerMap[markeName] !== undefined) {
                makerMap[markeName].moveTo([point.lng, point.lat], {
                    duration: 5000,
                    delay: 500,
                });
            }
        }




        const activeName = ref('ONLINE');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const url = require("@/assets/car.jpg");

        const handleClick = (tab: TabsPaneContext, event: Event) => {
            queryDevices({ status: activeName.value })
        }
        //位置信息dialog是否开启
        let isConfig = ref(false);
        const list = ref(null);
        const queryDevices = async (queryBean: any) => {
            let res = await queryDeviceList(queryBean)
            let alres = JSON.parse(res.data)
            list.value = alres.data
            // console.log(list.value)
        }
        //改变设备
        const changeDevice = (nDeviceName: any) => {
            if (deviceName.value != nDeviceName && activeName.value === 'ONLINE') {
                loading.value = true;
                sendWebSocket(nDeviceName);
            }


        }
        const loading = ref(true);
        return {
            activeName,
            handleClick,
            url,
            list,
            upInfo,
            isConfig,
            deviceName,
            changeDevice,
            loading
        }
    },
})

</script>
<style scoped lang='less'>
#container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 2200px;

}

.device {
    position: relative;
}

.left {
    position: absolute;
    top: 0;

}

.row {
    margin-bottom: 30px;
}

.right {
    position: absolute;
    top: 0;
    right: 0;
}

.config {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 80px;
    cursor: pointer
}

.card {
    width: 1200px;
    font-size: 50px;
    font-weight: bolder;
}

.card-header {
    height: 50px;
    text-align: center;

}

.card-body {
    font-size: 50px;
}

.lufe {
    text-align: right;
}

.demo-tabs {
    width: 1000px;
    background-color: white;

}
</style>