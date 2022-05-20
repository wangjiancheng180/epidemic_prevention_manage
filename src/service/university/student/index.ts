import { myRequest, excelRequest } from "../../index";
import { ResultType } from "../../type";
import { StudentCreateBean, StudentPage, StudentDto, StudentQueryBean } from "./type";

enum StudentApi {
    QUERY_STUDENT_PAGE = '/student/queryStudentPage',
    QUERY_STUDENT_BY_ID = '/student/queryStudentById',
    CREATE_STUDENT = '/student/createStudent',
    UPDATE_STUDENT = '/student/updateStudent',
    DELETE_STUDENT = '/student/deleteStudent',
    EXPORT_STUDENT_LIST = '/easyExcel/exportStudentList'
}

export function queryStudentPage(bean: StudentQueryBean): Promise<ResultType<StudentPage>> {
    return myRequest.post<ResultType<StudentPage>>({
        url: StudentApi.QUERY_STUDENT_PAGE,
        data: bean
    })
}

export function queryStudentById(id: number): Promise<ResultType<StudentDto>> {
    return myRequest.get<ResultType<StudentDto>>({
        url: `${StudentApi.QUERY_STUDENT_BY_ID}?id=${id}`
    })
}

export function createStudent(bean: StudentCreateBean): Promise<ResultType<boolean>> {
    return myRequest.post<ResultType<boolean>>({
        url: StudentApi.CREATE_STUDENT,
        data: bean
    })
}

export function updateStudent(bean: StudentCreateBean): Promise<ResultType<boolean>> {
    return myRequest.post<ResultType<boolean>>({
        url: StudentApi.UPDATE_STUDENT,
        data: bean
    })
}

export function deleteStudent(id: number): Promise<ResultType<boolean>> {
    return myRequest.delete<ResultType<boolean>>({
        url: `${StudentApi.DELETE_STUDENT}?id=${id}`
    })
}

export function exportStudentList(bean: StudentQueryBean): Promise<any> {
    return excelRequest.post<any>({
        url: StudentApi.EXPORT_STUDENT_LIST,
        data: bean,
        responseType: 'blob'
    })
}