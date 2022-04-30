// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const student = () => import("@/views/main/university/student/Student.vue");
export default {
    path: "/main/university/student",
    name: "Student",
    component: student,
    children: []
};