
export interface ChinaEpidemicData {
    //区域 省份
    xarea: string,
    //城市
    city: string,
    //无症状
    asymptomatic: number,
    //累计确诊
    confirm: number,
    //当前确诊
    curConfirm: number,
    //死亡人数
    died: number,
    //治愈人数
    heal: number,
    //查询时间
    relativeTime: string,
    //子集---城市数据
    subList: Array<ChinaEpidemicData>
}