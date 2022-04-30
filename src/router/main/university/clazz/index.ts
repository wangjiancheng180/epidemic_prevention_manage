// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const clazz = () => import("@/views/main/university/clazz/Clazz.vue");
export default {
    path: "/main/university/clazz",
    name: "Clazz",
    component: clazz,
    children: []
};