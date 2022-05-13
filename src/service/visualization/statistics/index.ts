import { myRequest } from "../../index";
import { ResultType } from "../../type";
import { ChinaEpidemicData } from "./type";

enum StatisticsApi {
    QUERY_CHINA_EPIDEMIC_DATA = "/statistics/queryChinaEpidemicData"
}

export function queryChinaEpidemicData(): Promise<ResultType<Array<ChinaEpidemicData>>> {
    return myRequest.get<ResultType<Array<ChinaEpidemicData>>>({
        url: StatisticsApi.QUERY_CHINA_EPIDEMIC_DATA
    })
}