import { ChinaEpidemicData } from '@/service/visualization/statistics/type'


//echarts的map数据
interface MapValue {
    name: string,
    value: number
}
//结果集
export interface ResultData {
    //全国累计当前确诊病例
    curConfirmTotal?: number,
    //全国累计无症状病例
    asymptomaticTotal?: number
    //图标填充数据
    mapValues?: Array<MapValue>,
    //累计治愈
    healTotal?: number
}
export function transformData(datas: Array<ChinaEpidemicData> | undefined): ResultData {
    let curConfirmTotal = 0;
    let asymptomaticTotal = 0;
    let healTotal = 0;
    const mapValues: Array<MapValue> = [];
    if (datas) {
        for (const data of datas) {
            curConfirmTotal += data.curConfirm;
            asymptomaticTotal += data.asymptomatic
            healTotal += data.heal
            mapValues.push({ name: data.xarea, value: data.curConfirm })
            // for (const children of data.subList) {
            //     mapValues.push({ name: children.city, value: children.curConfirm });
            // }

        }
    }

    return { curConfirmTotal: curConfirmTotal, asymptomaticTotal: asymptomaticTotal, mapValues: mapValues, healTotal: healTotal }
}