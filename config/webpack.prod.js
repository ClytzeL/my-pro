const path = require('path')
const merge = require('webpack-merge')
const config = require('./webpack.config.js')
const git = require('git-rev-sync');
// 版本管理
const params ={
    git_tag:git.tag(),
    git_hash: git.long().substring(0, 8),
    git_branch:git.branch(),
    git_message: git.message(),
    app_name_en: 'wxReadApp',
}
// version.addVersion(params) //封装版本控制系统，提供强制更新，可选更新
const baseConfig=config({
    isHash:true,
    publicPath: publicPath,
    outPath: './dist/',
    publicLibPath: publicPath + 'lib/min',
    outLibPath: 'lib/min',
    clean: 'dist',
},false)
let prodConfig = {
    mode:'production',
    module:{
        rules:[]
    },
    plugins:[],
    optimization:{
        splitChunks:{
            chunks:'all'
        }
    }
}
prodConfig = merge(baseConfig,prodConfig)
module.exports = prodConfig