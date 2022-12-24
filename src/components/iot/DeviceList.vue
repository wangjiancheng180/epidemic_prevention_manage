<template>
    <div class="content-box">

        <el-row v-for="(item, index) of devices" :key="index" @click="changeDevice(item.deviceName)">
            <el-col :span="8">
                <el-image style="width: 80px; height: 80px" :src="url"></el-image>

            </el-col>
            <el-col :span="8">
                <div class="contioner">{{ item['deviceName'] }}</div>

            </el-col>
            <el-col :span="4" :offset="2">

                <el-tag effect="dark" round class="status" v-if="item.status === 'UNACTIVE'">未激活
                </el-tag>
                <el-tag effect="dark" round class="status" type="success" v-if="item.status === 'ONLINE'">
                    在线
                </el-tag>
                <el-tag effect="dark" round class="status" type="info" v-if="item.status === 'OFFLINE'">
                    离线
                </el-tag>
            </el-col>
        </el-row>

    </div>

</template>

<script lang='ts'>
import { defineComponent, toRef, onBeforeMount, onMounted } from 'vue'
export default defineComponent({
    name: '',
    props: ['deviceList', 'loading'],
    emits: ['changeDevice',],
    setup(props, ctx) {

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const url = require("@/assets/car.jpg");
        onBeforeMount(() => {
            //2.组件挂载页面之前执行----onBeforeMount
        })
        const devices = toRef(props, "deviceList");
        // const loading = toRef(props, 'loading');
        onMounted(() => {

            //3.组件挂载到页面之后执行-------onMounted
        })
        function changeDevice(deviceName: any) {
            // console.log(loading.value)
            // loading.value = true
            ctx.emit('changeDevice', deviceName)
        }
        return {
            devices,
            url,
            changeDevice
        }
    },
})

</script>
<style scoped lang='less'>
.content-box {
    max-height: 1500px;
    // border: 1px solid rebeccapurple;
}

.content-box:hover {
    overflow-y: scroll;
    overflow-x: hidden;

    &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 20px;
        /*高宽分别对应横竖滚动条的尺寸*/
        height: 20px;
    }

    &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 20px;
        background-color: rgb(25, 191, 247);
        background-image: -webkit-linear-gradient(45deg,
                rgba(255, 255, 255, 0.2) 25%,
                transparent 25%,
                transparent 50%,
                rgba(255, 255, 255, 0.2) 50%,
                rgba(255, 255, 255, 0.2) 75%,
                transparent 75%,
                transparent);
    }

    &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(13, 172, 235, 0.2);
        background: #ededed;
        border-radius: 20px;
    }
}

.el-row {
    border-bottom: 1px solid rgb(161, 159, 159);
    cursor: pointer
}

.contioner {
    font-weight: 600;
    position: relative;
    font-size: 50px;
    top: 50%;
    transform: translateY(-50%);
    // left: 50%;
    // transform: translateX(-50%);
    // border: solid 1px rebeccapurple
}

.status {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}
</style>