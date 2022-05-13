<template>
    <div id="container"></div>
</template>

<script lang='ts'>
import { defineComponent, shallowRef, onMounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader';
import { queryPosition, queryLine } from '@/service/university/trail';
import { StudentDto } from '@/service/university/student/type'
export default defineComponent({
    name: 'PositionMap',

    setup() {
        let map: any = shallowRef(null);
        onMounted(() => {
            AMapLoader.load({
                key: "667337e5fdc90a0b19edc8560c6d2e54",             // 申请好的Web端开发者Key，首次调用 load 时必填
                version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: ['AMap.Geolocation'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            }).then((AMap) => {
                map.value = new AMap.Map("container", {  //设置地图容器id
                    // viewMode: "3D",    //是否为3D地图模式
                    zoom: 13,           //初始化地图级别
                    center: [120.436931, 30.447302], //初始化地图中心点位置
                });
                // map.value.setMapStyle('amap://styles/macaron');
            }).catch(e => {
                console.log(e);
            })
        })

        const addMarker = async (student: StudentDto) => {
            // console.log(id)
            const reslut = await queryPosition(student.id)
            if (reslut.data?.length && reslut.data.length > 0) {
                //更改图标
                let imageurl = changeImage(student.sex)
                AMapLoader.load({
                    key: "667337e5fdc90a0b19edc8560c6d2e54",             // 申请好的Web端开发者Key，首次调用 load 时必填
                    version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                    plugins: [],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等 //a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png
                }).then((AMap) => {
                    let endIcon = new AMap.Icon({
                        size: new AMap.Size(50, 40),
                        image: imageurl,
                        imageSize: new AMap.Size(50, 40),
                        // imageOffset: new AMap.Pixel(-100, -3)
                    });
                    let endMarker = new AMap.Marker({
                        position: new AMap.LngLat(reslut.data?.[0].lng, reslut.data?.[0].lat),
                        icon: endIcon,
                        // offset: new AMap.Pixel(-13, -30)
                    });
                    //这里需要先将地图清空
                    map.value.clearMap()
                    //加入标记物
                    map.value.add(endMarker)
                    map.value.setZoomAndCenter(15, [reslut.data?.[0].lng, reslut.data?.[0].lat], false, 1000)
                }).catch(e => {
                    console.log(e);
                })
            } else {
                setTimeout(() => {
                    //这里需要先将地图清空
                    map.value.clearMap()
                    map.value.setZoomAndCenter(15, [120.436931, 30.447302], true)
                }, 100)
            }


        }

        const playback = async (student: StudentDto) => {
            const result = await queryLine(student.id)
            if (result.data?.length && result.data.length > 0) {
                const lineArr: Array<Array<number>> = []
                let arr: Array<number> = []
                if (result.data) {
                    for (let item of result.data) {
                        // console.log(item)
                        arr = [item.lng, item.lat]
                        lineArr.push(arr)
                    }
                }
                // console.log(lineArr)
                //更改图标
                let imageurl = changeImage(student.sex)
                AMapLoader.load({
                    key: "667337e5fdc90a0b19edc8560c6d2e54",             // 申请好的Web端开发者Key，首次调用 load 时必填
                    version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                    plugins: ['AMap.MoveAnimation'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等 //a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png
                }).then((AMap) => {

                    AMap.plugin('AMap.MoveAnimation', function () {
                        //这里需要先将地图清空
                        map.value.clearMap()
                        map.value.setZoomAndCenter(15, lineArr[0], false, 1000)
                        let endIcon = new AMap.Icon({
                            size: new AMap.Size(50, 40),
                            image: imageurl,
                            imageSize: new AMap.Size(50, 40),
                            // imageOffset: new AMap.Pixel(-100, -3)
                        });
                        const marker = new AMap.Marker({
                            map: map.value,
                            position: lineArr[0],
                            icon: endIcon,
                            offset: new AMap.Pixel(-25, -20),
                        });

                        // 绘制轨迹
                        const polyline = new AMap.Polyline({
                            map: map.value,
                            path: lineArr,
                            showDir: true,
                            strokeColor: "#28F",  //线颜色
                            // strokeOpacity: 1,     //线透明度
                            strokeWeight: 6,      //线宽
                            // strokeStyle: "solid"  //线样式
                        });
                        const passedPolyline = new AMap.Polyline({
                            map: map.value,
                            strokeColor: "#AF5",  //线颜色
                            strokeWeight: 6,      //线宽
                        });


                        marker.on('moving', function (e: any) {
                            passedPolyline.setPath(e.passedPath);
                            map.value.setCenter(e.target.getPosition(), true)
                        });
                        map.value.setFitView();

                        setTimeout(() => {
                            marker.moveAlong(lineArr, {
                                // 每一段的时长
                                duration: 1000,//可根据实际采集时间间隔设置
                                // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
                                autoRotation: true,
                            });

                        }, 2000)

                    })

                }).catch(e => {
                    console.log(e);
                })
            } else {
                setTimeout(() => {
                    //这里需要先将地图清空
                    map.value.clearMap()
                    map.value.setZoomAndCenter(15, [120.436931, 30.447302], true)
                }, 100)
            }

        }

        const changeImage = (sex: string): any => {
            //默认官方图标
            let imageurl = '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png'
            if (sex === '002') {
                //图标男生
                imageurl = require('/src/assets/studentM.png')
            } else {
                //图标女生
                imageurl = require('/src/assets/studentW.png')
            }
            return imageurl
        }
        return {
            map,
            addMarker,
            playback,
        }

    },

})

</script>
<style scoped lang='less'>
#container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 1500px;
}


.amap-logo {

    display: none;

    opacity: 0 !important;

}

.amap-copyright {

    opacity: 0 !important;

}
</style>