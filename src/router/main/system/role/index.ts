// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const role = () => import("@/views/main/system/role/Role.vue");
export default {
    path: "/main/system/role",
    name: "Role",
    component: role,
    children: []
};