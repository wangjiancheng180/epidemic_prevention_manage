import type { App } from "vue";
//按需使用elementPlus
import {
    ElAside,
    ElButton,
    ElCheckbox,
    ElCol,
    ElContainer,
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
    ElForm,
    ElFormItem,
    ElHeader,
    ElInput,
    ElLink,
    ElMain,
    ElMenu,
    ElMenuItem,

    ElTabPane,
    ElTabs,
    ElRow,
    ElSelect,
    ElDatePicker,
    ElOption,
    ElBreadcrumbItem,
    ElBreadcrumb,
    ElTable,
    ElTableColumn,
    ElPagination,
    ElImage,
    ElDialog,
    ElTree,
    ElAvatar,
    ElUpload,
    ElCard,
    ElCascader,
    ElTooltip,
    ElCollapse,
    ElCollapseItem,
    ElDescriptions,
    ElDescriptionsItem,
    ElTag
} from "element-plus";

// import "element-plus/lib/theme-chalk/base.css";

const components = [
    ElButton,
    ElTabs,
    ElTabPane,
    ElForm,
    ElFormItem,
    ElInput,
    ElCheckbox,
    ElLink,
    ElContainer,
    ElAside,
    ElHeader,
    ElMain,
    ElMenu,
    ElCol,
    ElMenuItem,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElRow,
    ElSelect,
    ElOption,
    ElDatePicker,
    ElBreadcrumb,
    ElBreadcrumbItem,
    ElTable,
    ElTableColumn,
    ElPagination,
    ElImage,
    ElDialog,
    ElTree,
    ElAvatar,
    ElUpload,
    ElCard,
    ElCascader,
    ElTooltip,
    ElCollapse,
    ElCollapseItem,
    ElDescriptions,
    ElDescriptionsItem,
    ElTag
];

export default function (app: App): void {
    for (const cpn of components) {
        app.component(cpn.name, cpn);
    }
}
