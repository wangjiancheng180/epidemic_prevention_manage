import { myRequest } from "../../index";
import { ResultType } from "../../type";
import { Trail } from "./type";

enum TrailApi {
    QUERY_POSITION = "/trail/queryPosition",
    QUERY_LINE = "/trail/queryLine",
    QUERY_ALL_Points = "/trail/queryAllPoints"
}

export function queryPosition(studentId: number): Promise<ResultType<Array<Trail>>> {
    return myRequest.get<ResultType<Array<Trail>>>({
        url: `${TrailApi.QUERY_POSITION}?studentId=${studentId}`
    })
}

export function queryLine(studentId: number): Promise<ResultType<Array<Trail>>> {
    return myRequest.get<ResultType<Array<Trail>>>({
        url: `${TrailApi.QUERY_LINE}?studentId=${studentId}`
    })
}

export function queryAllPoints(): Promise<ResultType<Array<Trail>>> {
    return myRequest.get<ResultType<Array<Trail>>>({
        url: TrailApi.QUERY_ALL_Points
    })
}