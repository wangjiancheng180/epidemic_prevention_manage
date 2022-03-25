module.exports = {
    plugins: {
        autoprefixer: {},
        "postcss-px2rem-exclude": {
            remUnit: 192,//这个参数是通过psd设计稿的  宽度 / 10 来计算,这里以1920为标准
            exclude: /node_modules/i, //完美解决第三方ui库样式变小问题
            "selectorBlackList": ["van-"] //排除vant框架相关组件 或者某样式不受rem的影响 }) ] }
        }
    }
}