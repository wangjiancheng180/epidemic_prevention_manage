import { RouteRecordRaw } from 'vue-router'

const routerList: Array<RouteRecordRaw> = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function importAll(routeFiles: any) {
    routeFiles.keys().forEach((filePath: string) => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const routeModule = require("@/router/main" + filePath.split(".")[1]);
        routerList.push(routeModule.default);
    });
}
importAll(require.context("@/router/main", true, /\.ts$/));// 这里自定义为.ts 结尾的文件
export default routerList



