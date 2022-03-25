// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
                view: "@/view",
                router: "@/router",
                components: "@/components",
                assets: "@/assets"
            }
        }
    },
    devServer: {
        port: 9997
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, './public/rem.less')]
        }
    }
}


