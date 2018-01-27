var HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

module.exports = {
    entry: './src/main.js', //打包的入口文件
    module: { //配置loader
        rules: [{
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader'
                }]
            },
            {
                test: /\.css$/,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.(ttf|eot|svg|woff|jpg|png)$/,
                use: [{
                    loader: 'url-loader'
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.vue', '.js', '.json', '*']
    },
    plugins: [ //插件中的内容都是new出来的
        new HtmlWebpackPlugin({
            template: './template.html', //参照文件的路径
            filename: 'index.html' //最后发布到node服务器上面的名称
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
}