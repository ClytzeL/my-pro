var path = require('path')
var merge = require('webpack-merge')
const config = require('./webpack.config.js')
const baseConfig = config({
    isHash:false,
},false)
let devConfig = {
    mode:'development',
    module:{
        rules:[]
    },
    plugins:[],
    devServer:{
        port:8888,
        host:'0.0.0.0',
    }
}
devConfig = merge(baseConfig,devConfig)