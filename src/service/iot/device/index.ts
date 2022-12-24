import { myRequest } from "../../index";
import { ResultType } from "../../type";
import { Task, CarQueryBean, CarPage, Car } from "./type";

enum DeviceApi {
    ISSUE_TASK = "/device/issueTask",
    QUERY_CAR_PAGE = "/device/queryCarPage",
    CREATE_CAR = "/device/createCar",
    UPDATE_CAR = "/device/updateCar",
    QUERY_BY_Id = "/device/queryById",
    DELETE_DEVICE = "/device/deleteDevice",
    QUERY_DEVICE_LIST = "/device/queryDeviceList"

}


export function issueTask(task: Task): Promise<ResultType<boolean>> {
    return myRequest.post<ResultType<boolean>>({
        url: DeviceApi.ISSUE_TASK,
        data: task
    })
}

export function queryCarPage(bean: CarQueryBean): Promise<ResultType<CarPage>> {
    return myRequest.post<ResultType<CarPage>>({
        url: DeviceApi.QUERY_CAR_PAGE,
        data: bean
    })
}

export function createCar(bean: Car): Promise<ResultType<boolean>> {
    return myRequest.post<ResultType<boolean>>({
        url: DeviceApi.CREATE_CAR,
        data: bean
    })
}

export function updateCar(bean: Car): Promise<ResultType<boolean>> {
    return myRequest.post<ResultType<boolean>>({
        url: DeviceApi.UPDATE_CAR,
        data: bean
    })

}

export function queryById(id: number): Promise<ResultType<Car>> {
    return myRequest.get<ResultType<Car>>({
        url: `${DeviceApi.QUERY_BY_Id}?id=${id}`
    })
}

export function deleteDevice(id: number): Promise<ResultType<boolean>> {
    return myRequest.delete<ResultType<boolean>>({
        url: `${DeviceApi.DELETE_DEVICE}?id=${id}`
    })
}

export function queryDeviceList(bean: any): Promise<ResultType<any>> {
    return myRequest.post<ResultType<any>>({
        url: DeviceApi.QUERY_DEVICE_LIST,
        data: bean
    })
}