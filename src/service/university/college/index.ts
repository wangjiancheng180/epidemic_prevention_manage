import { myRequest } from "../../index";
import { ResultType } from "../../type";
import { CollegeTree, CollegeDto, CollegeCreateBean } from './type'


enum CollegeApi {
    QUERY_COLLEGE_TREE = "/college/queryCollegeTree",
    QUERY_COLLEGE_BY_ID = "/college/queryCollegeById",
    CRETE_COLLEGE = "/college/createCollege",
    UPDATE_COLLEGE = "/college/updateCollege",
    DELETE_COLLEGE = "/college/deleteCollege"
}

export function queryCollegeTree(): Promise<ResultType<CollegeTree>> {
    return myRequest.get<ResultType<CollegeTree>>({
        url: CollegeApi.QUERY_COLLEGE_TREE
    })
}

export function queryCollegeById(id: number): Promise<ResultType<CollegeDto>> {
    return myRequest.get<ResultType<CollegeDto>>({
        url: `${CollegeApi.QUERY_COLLEGE_BY_ID}?id=${id}`
    })
}

export function createCollege(bean: CollegeCreateBean): Promise<ResultType<number>> {
    return myRequest.post<ResultType<number>>({
        url: CollegeApi.CRETE_COLLEGE,
        data: bean
    })
}

export function updateCollege(bean: CollegeCreateBean): Promise<ResultType<boolean>> {
    return myRequest.post<ResultType<boolean>>({
        url: CollegeApi.UPDATE_COLLEGE,
        data: bean
    })
}

export function deleteCollege(id: number): Promise<ResultType<boolean>> {
    return myRequest.delete<ResultType<boolean>>({
        url: `${CollegeApi.DELETE_COLLEGE}?id=${id}`
    })
}
