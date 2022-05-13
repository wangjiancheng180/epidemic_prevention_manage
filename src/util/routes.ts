import { RouteRecordRaw } from 'vue-router'
import { SysResourceTree } from '@/service/system/resource/type';
import localCache from '@/util/cache'
//所有的路由配置
export const allRouteList: Array<RouteRecordRaw> = [];
//将所有的路由配置先加进去
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function importAll(routeFiles: any) {
    routeFiles.keys().forEach((filePath: string) => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const routeModule = require("@/router/main" + filePath.split(".")[1]);
        allRouteList.push(routeModule.default);
    });
}
importAll(require.context("@/router/main", true, /\.ts$/))


//动态添加路由
export function dynamicAddRoute(): Array<RouteRecordRaw> {
    if (allRouteList.length == 0) {
        importAll(require.context("@/router/main", true, /\.ts$/));// 这里自定义为.ts 结尾的文件
    }
    const routeList: Set<RouteRecordRaw> = new Set();
    const user = localCache.getCache('user')
    //筛选路由
    findRouteFun(user.resourceTrees, routeList)
    let routes = Array.from(routeList);
    const mainRoute = {
        path: '/main',
        name: 'Main',
        component: () => import("../views/main/Main.vue"),
        children: [...routes]
    }
    routes = [];
    routes.push(mainRoute)
    return routes;
}

function findRouteFun(resourceTrees: Array<SysResourceTree>, routeList: Set<RouteRecordRaw>): void {
    for (const resource of resourceTrees) {
        for (const route of allRouteList) {
            //这里比对资源名和route的名称是否一致
            if (resource.sourceKey.toLowerCase == route.name?.toString().toLowerCase) {

                //将用户拥有的路由权限加入
                routeList.add(route)
            }
        }
        if (resource.children.length != 0 && resource.children[0].type != 2) {
            findRouteFun(resource.children, routeList)
        }
    }
}




