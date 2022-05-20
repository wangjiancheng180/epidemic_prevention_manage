import { BaseEnetity } from '@/store/type';
import { Page } from '../../type'
import { ClazzDto } from '../clazz/type';
import { CollegeDto } from '../college/type';

export interface StudentDto extends BaseEnetity {
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
    clazzDto: ClazzDto,

    collegeDtos: CollegeDto
}
export interface StudentPage extends Page {
    records: Array<StudentDto>
}

export interface StudentQueryBean {
    studentNo: string,
    name: string,
    sex: string,
    age?: number,
    clazzId: number | null,
    collegeId: number | null,
    page: number,
    size: number
}

export interface StudentCreateBean {
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
    // //疫苗接种清况，0：未接种，1：已接种但为接种完
    // vaccinationTimes: number,
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
    clazzId: number
}
