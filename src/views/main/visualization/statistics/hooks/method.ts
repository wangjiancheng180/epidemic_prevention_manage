import { Config } from '@/components/card/msi-card/hooks/type'
import { ResultData } from '@/components/echarts/echarts-page/hooks/pageChinaCharts';
import { Trail } from '@/service/university/trail/type';
/**
 * 格式化疫情信息
 */
export function getCardData(data: ResultData | undefined): Array<Config> {
    const result: Array<Config> = [];
    result.push({ title: "现有确诊", data: `${data?.curConfirmTotal}`, style: { color: "#FF6A57" } })
    result.push({ title: "累计治愈", data: `${data?.healTotal}`, style: { color: '#10B1C3' } })
    result.push({ title: "现有确诊", data: `${data?.curConfirmTotal}`, style: { color: "#FF6A57" } })
    result.push({ title: "累计治愈", data: `${data?.healTotal}`, style: { color: '#10B1C3' } })
    return result;
}


/**
 * 计算两个经纬度坐标点之间的距离
 * @param  {Point} pointA 起点坐标点
 * @param  {Point} pointB 终点坐标点
 * @return {Number} 计算后得出两点之间的距离
 */
function getDistance(pointA: Trail, pointB: Trail) {

    const radLat1 = getRad(pointA.lat);
    const radLat2 = getRad(pointB.lat);
    const a = radLat1 - radLat2;
    const b = getRad(pointA.lng) - getRad(pointB.lng);
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378137; // 地球半径(米);
    return s;
}

const getRad = (d: number): number => (d * Math.PI / 180.0); //经纬度转换成三角函数中度分表形式

/**
 * 获取多个点的中心坐标
 * @param points 
 * @returns 
 */
export function getPointsCenter(points: Array<Trail> | undefined): Trail {
    if (!points) {
        return { studentId: '0', lng: 0, lat: 0, createTime: "" };
    }
    // const point_num = points.length; //坐标点个数
    // let X = 0, Y = 0, Z = 0;
    // for (const point of points) {
    //     //   if (points[i] == '') {
    //     //     continue;
    //     //   }
    //     //   let point = points[i].split(',');
    //     let lat = 0, lng = 0, x = 0, y = 0, z = 0;
    //     lat = point.lat * Math.PI / 180;
    //     lng = point.lng * Math.PI / 180;
    //     x = Math.cos(lat) * Math.cos(lng);
    //     y = Math.cos(lat) * Math.sin(lng);
    //     z = Math.sin(lat);
    //     X += x;
    //     Y += y;
    //     Z += z;
    // }
    // X = X / point_num;
    // Y = Y / point_num;
    // Z = Z / point_num;

    // const tmp_lng = Math.atan2(Y, X);
    // const tmp_lat = Math.atan2(Z, Math.sqrt(X * X + Y * Y));

    // return { studentId: '0', lng: tmp_lng, lat: tmp_lat, createTime: "" };
    const total = points.length;
    let lat = 0, lng = 0;
    for (const point of points) {
        lat += point.lat;
        lng += point.lng;
    }
    lat /= total;
    lng /= total;

    lng = Number(lng.toFixed(6));
    lat = Number(lat.toFixed(6))
    return { studentId: '0', lng: lng, lat: lat, createTime: "" }
}

/**
 * 计算所有点到中心点的距离确定半径
 * @param center 
 * @param points 
 */
export function getRadius(center: Trail, points: Array<Trail> | undefined): number {

    let radius = 0
    if (points) {
        for (const point of points) {
            const distance = getDistance(center, point);
            if (distance < 100000 && distance > radius) {
                //如果距离小于100公里、并且大于已有的半径就选取该距离作为半径
                radius = distance;
            }
        }
    }
    return Math.floor(radius);
}