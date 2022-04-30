// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const college = () => import("@/views/main/university/college/College.vue");
export default {
    path: "/main/university/college",
    name: "College",
    component: college,
    children: []
};