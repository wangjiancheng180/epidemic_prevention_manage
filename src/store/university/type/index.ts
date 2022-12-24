import { CollegeDto } from '@/service/university/college/type'
import { BaseEnetity } from '@/store/type'

interface CollegeTree extends BaseEnetity {
    id: number,
    name: string,
    /**
     * 学院地址
     */
    address: string,
    /**
     * 联系号码
     */
    telephone: string,

    /**
     * 学院层级（1级学院。二级学院）
     */
    level: number,
    /**
     * 排序
     */

    sort: number,
    /*
    *子节点
    */
    children: Array<CollegeTree>,

    clazzes: Array<Clazz>

}

interface collegeFormData {
    id?: number,

    parentId: number,

    parentIds?: Array<number>

    name: string,
    /**
     * 学院地址
     */
    address: string,
    /**
     * 联系号码
     */
    telephone: string,

    /**
     * 学院层级（1级学院。二级学院）
     */
    level: number,
    /**
     * 排序
     */

    sort: number,

}
interface Clazz {
    id: number,
    name: string,
    sort: number
}

interface ClazzDto {
    id: number,
    name: string,
    sort: number,
    collegeDtos?: Array<collegeFormData>,
    collegeIds: Array<number>
}
interface ClazzFormData {
    id?: number,
    name: string,
    sort: number,
    collegeIds: Array<number>
}

interface StudentDto {
    id: number,
    studentNo: string,
    name: string,
    sex: string,
    age: number,
    //健康码
    healthCode: string,
    //疫苗接种记录
    vaccination: string,
    //行程码
    traveCard: string,
    //疫苗接种清况，0：未接种，1：已接种但为接种完
    vaccinationTimes: number,
    //现居地址
    temporaryHome: string,
    //家乡
    hometown: string,
    //学生端用来登录
    account: string,
    //登录用的密码
    password: string,
    //入学日期
    entrance: string,
    //出生日期
    birthday: string,
    //班级信息
    clazzDto: ClazzDto
    //所属院校信息
    collegeDtos: Array<CollegeDto>
}

interface StudentFormData {
    id: number,
    studentNo: string,
    name: string,
    sex: string,
    age: number,
    //健康码
    // healthCode: string,
    // //疫苗接种记录
    // vaccination: string,
    // //行程码
    // traveCard: string,
    //疫苗接种清况，0：未接种，1：已接种但为接种完
    vaccinationTimes: any,
    //现居地址
    temporaryHome: string,
    //家乡
    hometown: string,
    //学生端用来登录
    account: string,
    //登录用的密码
    password: string,
    //入学日期
    entrance: string,
    //出生日期
    birthday: string,
    //关联班级
    clazzId: any
}

interface Device extends BaseEnetity {
    id: string,
    carNumber: string,
    deviceName: string,
    productKey: string,
    deviceSecret: string,
    type: string,
    accessNetwork: number
    disabled: number
}
export interface UniversityState {
    collegeTrees: Array<CollegeTree>,
    collegeFormData: collegeFormData,
    clazzList: Array<ClazzDto>,
    clazzFormData: ClazzFormData,
    studentList: Array<StudentDto>,
    studentFormData: StudentFormData
    deviceList: Array<Device>,
    deviceFormData: Device
}