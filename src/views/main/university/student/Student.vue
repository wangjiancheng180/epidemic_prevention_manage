<template>
    <div>
        <div class="query">
            <query-form :form-item-types="queryFormTypes" :query-bean="queryBean" :config="queryFormConfig"
                @search-data="searchData" @reset-form="resetForm">
                <template #sex>
                    <el-radio-group v-model="queryBean.sex">
                        <el-radio :label="'002'">男</el-radio>
                        <el-radio :label="'003'">女</el-radio>
                    </el-radio-group>
                </template>
                <template v-slot:collegeIds>
                    <el-cascader ref="cascader" :options="options"
                        :props="{ checkStrictly: true, value: 'id', label: 'name' }" clearable size="large"
                        @change="cascaderChange" placeholder="选择院校" style="min-width: 350px;" />
                </template>
                <template #clazzId>
                    <el-select v-model="queryBean.clazzId" clearable placeholder="选择班级">
                        <template #empty>
                            <div class="select-empty">请先选择院校！</div>
                        </template>
                        <el-option v-for="item in clazzOptions" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </template>
                <template #vaccinationTimes>
                    <el-select v-model="queryBean.vaccinationTimes" clearable placeholder="请选择">
                        <el-option v-for="item in vaccinationOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </template>
            </query-form>
        </div>
        <common-table :config="config" :table-types="tableTypes" @delete-data="deleteData">
            <template #excel>
                <el-button type="warning" class="exportExcel" plain @click="exportFormData()">导出</el-button>
                <el-upload action="http://localhost:9001/api/easyExcel/importStudentexcel" :headers="headers"
                    :on-success="onSuceess" :on-error="onError"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                    <el-button type="primary" plain>导入</el-button>
                </el-upload>
            </template>

            <template #collegeDtos="{ item }">
                <span v-for="(college, index) in item" :key="index">
                    {{ '/' + college.name }}
                </span>
            </template>
            <template #clazzDto="{ item }">
                <span>
                    {{ item.name }}
                </span>
            </template>
            <template #sex="{ item }">
                <span>{{ item == '002' ? '男' : '女' }}</span>
            </template>
            <template #vaccinationTimes="{ item }">
                <el-tag v-if="item == 0" type='danger' effect="dark">
                    尚未接种
                </el-tag>
                <el-tag v-if="item == 1" type='warning' effect="dark">
                    接种1针次
                </el-tag>
                <el-tag v-if="item == 2" type='success' effect="plain">
                    全部接种
                </el-tag>
                <el-tag v-if="item == 3" type='success' effect="dark">
                    完成加强针
                </el-tag>
            </template>
            <template #default>
                <base-form :config="config" :form-item-types="formTypes" @commit-data="commitData">
                    <template #sex>
                        <el-radio-group v-model="formData.sex">
                            <el-radio :label="'002'">男</el-radio>
                            <el-radio :label="'003'">女</el-radio>
                        </el-radio-group>
                    </template>
                    <template #collegeIds>
                        <el-cascader ref="bCascader" :options="options" v-model="formData.collegeIds"
                            :props="{ checkStrictly: true, value: 'id', label: 'name' }" clearable
                            @change="bCascaderChange" placeholder="选择院校" />
                    </template>
                    <template #clazzId>
                        <el-select v-model="formData.clazzId" clearable placeholder="选择班级">
                            <template #empty>
                                <div class="select-empty">请先选择院校！</div>
                            </template>
                            <el-option v-for="item in bClazzOptions" :key="item.id" :label="item.name"
                                :value="item.id" />
                        </el-select>
                    </template>
                    <template #vaccinationTimes>
                        <el-select v-model="formData.vaccinationTimes" clearable placeholder="请选择">
                            <el-option v-for="item in vaccinationOptions" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </template>
                    <template #entrance>
                        <el-date-picker v-model="formData.entrance" type="date" placeholder="选择入学日期" />
                    </template>
                    <template #birthday>
                        <el-date-picker v-model="formData.birthday" type="date" placeholder="选择出生日期" />
                    </template>
                </base-form>
            </template>
            <template #trail="{ item }">
                <el-button type="text" @click="searcPosition(item)"><i class="iconfont">&#xe60d;</i></el-button>
                <el-button type="text" @click="playback(item)"><i class="iconfont">&#xe600;</i></el-button>
            </template>
            <template #page>
                <page-help :page-info="pageInfo"></page-help>
            </template>
        </common-table>
        <el-dialog v-model="isPosition" :title="`${positionTitle}位置信息`" center :close-on-click-modal="false"
            width="80%">
            <position-map ref="positionMap" />
        </el-dialog>
    </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRef, ref, watch, onMounted } from 'vue'
import CommonTable from '@/components/table/CommonTable.vue'
import QueryForm from '@/components/from/QueryForm.vue'
import BaseForm from '@/components/from/BaseForm.vue'
import PageHelp from '@/components/ipage/PageHelp.vue'
import PositionMap from '@/components/map/PositionMap.vue'
import { tableTypes, queryFormTypes, formTypes } from './config/type';
import { ElCascader, ElMessage, UploadFile } from 'element-plus'
import { useStore } from '@/store'
import { createStudent, updateStudent, deleteStudent, exportStudentList } from '@/service/university/student'
import { dateFormat } from '@/util/tool'
import { StudentDto } from '@/service/university/student/type'
import localCache from '@/util/cache'
interface ClazzOption {
    id: 0,
    name: ''
}
export default defineComponent({
    name: 'Student',
    components: {
        CommonTable,
        QueryForm,
        PageHelp,
        BaseForm,
        PositionMap
    },
    setup() {
        //表格和新建表单的配置
        const config = reactive({
            title: '学生列表', //标题
            formTitle: "学生",//新建学生的表单title
            tableHeight: 400,//表格高度
            dialogFormVisible: false, //控制dialog
            tableDataName: 'studentList',//表格数据源
            formDataName: 'studentFormData',//store中的新建表格的属性名
            storeModule: 'university',//store中的模块名
            source: 'student',//路径标识父组件
            isUpdate: false,//是否是更新操作
            isTrail: true//显示轨迹操作
        });

        //位置信息dialog是否开启
        let isPosition = ref(false);

        //搜索列表的配置
        const queryFormConfig = reactive({
            style: { height: "150px" },
            isResetForm: true
        })
        //分页信息
        const pageInfo = reactive({
            total: 100,
            page: 1,
            size: 5,
            pageOptions: [{ label: "5条/页", value: 5 }, { label: "10条/页", value: 10 }, { label: "15条/页", value: 15 }]
        })
        //搜索条件
        const queryBean = reactive({
            studentNo: '',
            name: '',
            sex: '',
            collegeId: 0,
            clazzId: null,
            vaccinationTimes: null,
            page: 1,
            size: 5,

        })
        watch(() => pageInfo,
            (val, preVal) => {
                if (preVal) {
                    queryBean.page = val.page;
                    queryBean.size = val.size
                    store.dispatch(`${config.storeModule}/changeTableData`, payload)
                }
            },

            { deep: true })


        const store = useStore();
        //填充表格数据
        const payload = { dataName: config.tableDataName, source: config.source, queryBean: queryBean, pageInfo: pageInfo }
        //这里先要拿到学院资源
        const collegePayload = { dataName: "collegeTrees", source: "college" }
        store.dispatch(`${config.storeModule}/changeTableData`, collegePayload)
        store.dispatch(`${config.storeModule}/changeTableData`, payload)

        const options = toRef(store.state.university, "collegeTrees");

        const clazzOptions: Array<ClazzOption> = reactive([])
        //获取el-cascader组件的实例
        const cascader = ref<typeof ElCascader>();
        const cascaderChange = (value: any) => {
            //这里返回Cascader中选择的节点
            if (value) {
                const nodes = cascader.value?.getCheckedNodes()
                if (nodes[0]) {
                    clazzOptions.length = 0
                    queryBean.clazzId = null
                    for (let item of nodes[0].data.clazzes) {
                        clazzOptions.push(item)
                    }
                }
                queryBean.collegeId = value.at(-1)
            } else {
                queryBean.clazzId = null
            }

        }

        const bCascader = ref<typeof ElCascader>();
        const bClazzOptions: Array<ClazzOption> = reactive([])
        const bCascaderChange = (value: any) => {
            //这里返回Cascader中选择的节点
            if (value) {
                const nodes = bCascader.value?.getCheckedNodes()
                if (nodes[0]) {
                    bClazzOptions.length = 0
                    formData.value.clazzId = null
                    for (let item of nodes[0].data.clazzes) {
                        bClazzOptions.push(item)
                    }
                }
            } else {
                formData.value.clzzId = null
            }

        }

        const vaccinationOptions = reactive([{ label: "尚未接种", value: 0 }, { label: "接种1针次", value: 1 }, { label: "全部接种", value: 2 }, { label: "完成加强针", value: 3 }])

        const resetForm = () => {
            //清空选中的节点
            cascader.value?.panel.clearCheckedNodes()
            clazzOptions.length = 0
            queryBean.collegeId = 0
            queryBean.clazzId = null
            queryBean.vaccinationTimes = null
            queryBean.sex = ''
        }
        //条件搜索
        const searchData = () => {
            store.dispatch(`${config.storeModule}/changeTableData`, payload)
        }
        //拿到表单数据
        const formData = toRef(store.state[config.storeModule], config.formDataName)
        // watch(() => formData.value.entrance, (val) => {
        //     if (val) {
        //         const date = dateFormat(val)
        //         formData.value.entrance
        //     }
        // })
        watch(() => config.isUpdate, (val) => {
            if (val) {
                if (bCascader.value) {
                    const nodes = bCascader.value.getCheckedNodes()
                    if (nodes[0]) {
                        bClazzOptions.length = 0
                        for (let item of nodes[0].data.clazzes) {
                            bClazzOptions.push(item)
                        }
                    }
                } else {
                    //这里要定义一个延时器不然bCascader可能是个空对象
                    setTimeout(() => {
                        const nodes = bCascader.value?.getCheckedNodes()
                        if (nodes[0]) {
                            bClazzOptions.length = 0
                            for (let item of nodes[0].data.clazzes) {
                                bClazzOptions.push(item)
                            }
                        }
                    }, 100)
                }
            } else {
                //这里是在新键的时候将班级的可选项清空
                bClazzOptions.length = 0
            }
        })
        const commitData = async () => {
            if (formData.value.entrance) {
                formData.value.entrance = dateFormat(formData.value.entrance)
            }
            if (formData.value.birthday) {
                formData.value.birthday = dateFormat(formData.value.birthday)
            }
            if (config.isUpdate) {

                const result = await updateStudent(formData.value)
                if (result.data) {
                    //更新表格数据
                    await store.dispatch(`${config.storeModule}/changeTableData`, payload)
                    //关闭dialog
                    config.dialogFormVisible = false;
                    //将更新标识重置为false
                    config.isUpdate = false;
                } else {
                    ElMessage.error("系统繁忙~修改失败~")
                }

            } else {
                const result = await createStudent(formData.value);
                //将数据发送到后台完成添加操作
                if (result.data) {
                    //更新表格数据
                    await store.dispatch(`${config.storeModule}/changeTableData`, payload)
                    //关闭dialog
                    config.dialogFormVisible = false;

                } else {
                    ElMessage.error("系统繁忙~添加失败~")
                }
            }

        }

        //删除数据
        const deleteData = async (id: number) => {
            const result = await deleteStudent(id);
            if (result.data) {
                //更新表格数据
                await store.dispatch(`${config.storeModule}/changeTableData`, payload)
                //提示删除成功
                ElMessage.success("删除成功~")
            } else {
                ElMessage.error(result.message)
            }
        }

        //这里最好还是能给子组件定义一个描述接口，下次再补，typescript还是少用any，不然就失去了它的特性了
        const positionMap: any = ref(null)
        let positionTitle = ref('');
        //实时位置，后期可以根据websocket改进
        const searcPosition = (student: StudentDto): void => {
            positionTitle.value = student.name
            isPosition.value = true
            //这里加定时器是因为在组件刚渲染完成是不允许访问内部方法，所以延时访问防止positionMap.value为null
            setTimeout(() => { positionMap.value.addMarker(student) }, 100)

        }
        //轨迹回放
        const playback = (student: StudentDto): void => {
            positionTitle.value = student.name
            isPosition.value = true
            setTimeout(() => { positionMap.value.playback(student) }, 100)
        }

        function exportFormData() {
            exportStudentList(queryBean);
        }

        //文件上传设置响应头
        let headers = ref({});
        onMounted(() => {
            const token = localCache.getCache("token")
            headers.value = { Authorization: `Bearer ${token}` }
        })
        //上传成功钩子
        function onSuceess(response: any, uploadFile: UploadFile) {
            if (response) {
                if (response.code) {
                    ElMessage.error(response.message)
                } else {
                    store.dispatch(`${config.storeModule}/changeTableData`, payload).then(() => {
                        ElMessage.success(`${uploadFile.name}上传成功！`)
                    })

                }

            } else {
                ElMessage.error(`${uploadFile.name}上传失败！`)
            }
        }

        function onError(response: any, uploadFile: UploadFile) {
            ElMessage.error(`${uploadFile.name}上传失败！`)
        }

        return {
            config,
            tableTypes,
            queryBean,
            queryFormConfig,
            queryFormTypes,
            searchData,
            resetForm,
            formData,
            cascader,
            cascaderChange,
            options,
            clazzOptions,
            pageInfo,
            vaccinationOptions,
            formTypes,
            bCascader,
            bCascaderChange,
            bClazzOptions,
            commitData,
            deleteData,
            isPosition,
            searcPosition,
            positionMap,
            playback,
            positionTitle,
            exportFormData,
            headers,
            onSuceess,
            onError
        }
    },
})

</script>
<style scoped lang='less'>
.query {

    height: 100%;
    margin: 0 0 20px 0;
}

.select-empty {
    color: #808080;
    font-size: 50px;
    text-align: center;
    height: 200px;
}

.el-select {
    width: 735px;
}

.exportExcel {
    margin: 0 20px 0 0;
}
</style>