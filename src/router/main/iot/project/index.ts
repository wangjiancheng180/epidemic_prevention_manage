// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const project = () => import("@/views/main/iot/project/Project.vue");
export default {
    path: "/main/iot/project/",
    name: "Project",
    component: project,
    children: []
};