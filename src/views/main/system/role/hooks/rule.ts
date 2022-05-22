export const rules = {
    name: [
        {
            required: true,
            message: "名称不能为空~",
            trigger: "blur"
        },
        {
            pattern: /^([\u4E00-\u9FA5]|[a-z]|[A-Z]){1,10}$/,
            message: "名称1~10位,只能以汉字字母开头~",
            trigger: "blur"
        }
    ],
    roleKey: [
        {
            required: true,
            message: "key值不能为空~",
            trigger: "blur"
        },
        {
            pattern: /^([a-z]|[A-Z]|_){2,15}$/,
            message: 'key只能是字母且2~15位~',
            tigger: 'blur'
        }

    ],
    description: [
        {
            pattern: /.\w{0,200}/,
            message: "描述不能超过200个字符",
            tigger: "blur"
        }
    ],
    sort: [
        {
            pattern: /^[1-9]\d?$/,
            message: '排序只能是[1-99]的整数~',
            tigger: 'blur'
        }
    ]
}