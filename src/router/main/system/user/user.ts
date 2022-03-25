// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const user = () => import("@/views/main/system/user/User.vue");
export default {
    path: "/main/system/user",
    name: "User",
    component: user,
    children: []
};
