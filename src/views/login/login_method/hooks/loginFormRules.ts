export const loginFormRules = {
    username: [
        {
            required: true,
            message: "用户名不能为空~",
            trigger: "blur"
        },
        {
            pattern: /^\w{4,11}$/,
            message: "账号不能少于4位，不能超过11位~",
            trigger: "blur"
        }
    ],
    password: [
        {
            required: true,
            message: "密码不能为空~",
            trigger: "blur"
        },
        {
            min: 6,
            message: "密码不能少于6位~",
            trigger: "blur"
        }
    ]
    // code: [
    //     {
    //         required: true,
    //         message: "验证码不能为空~",
    //         trigger: "blur"
    //     },
    //     {
    //         min: 4,
    //         max: 4,
    //         message: "验证码四位~",
    //         trigger: "blur"
    //     }
    // ]
}