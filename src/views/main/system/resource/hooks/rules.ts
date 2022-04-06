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
    sourceKey: [
        {
            required: true,
            message: "key值不能为空~",
            trigger: "blur"
        },
        {
            pattern: /^([a-z]|[A-Z]){4,20}$/,
            message: 'key只能是字母且4~20位~',
            tigger: 'blur'
        }
    ],
    sourceUrl: [
        // {
        //     required: false,
        //     message: "资源路径不能为空~",
        //     tigger: 'blur'
        // },
        {
            pattern: /^\/(([a-z]|[A-Z])|(\/))+$/,
            message: '路径只能以‘/’开头,只能是英文~',
            tigger: 'blur'
        }
    ],

    sort: [
        // {
        //     required: false,
        //     message: "排序不能为空~",
        //     tigger: 'blur'
        // },
        {
            pattern: /^[1-9]\d?$/,
            message: '排序只能是[1-99]的整数~',
            tigger: 'blur'
        }
    ]
}