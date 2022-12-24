// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const device = () => import("@/views/main/iot/device/Device.vue");
export default {
    path: "/main/iot/device/",
    name: "Device",
    component: device,
    children: []
};