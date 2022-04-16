// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const resource = () => import("@/views/main/system/resource/Resource.vue");
export default {
    path: "/main/system/resource",
    name: "Resource",
    component: resource,
    children: []
};