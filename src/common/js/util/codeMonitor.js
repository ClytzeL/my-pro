/*
 * 代码监控，上传sentry 
 * 使用：window.Raven.captureException(JSON.stringify({ message: error.message, stack: error.stack, error}))
 * @Author: liyan52 
 * @Date: 2020-07-07 18:57:27 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-07-09 17:29:51
 */

import Raven from 'raven-js'
// 白名单
const whiteListUrls = [/my\.com/,/example\.com/]

function codeMonitor(dns){
    const config ={
        env:process.env.NODE_ENV,
        debug:process.env.NODE_ENV !='production',
        release:process.app.VERSION,
        whiteListUrls:whiteListUrls
    }
    Raven.config(url, config).install()
    Raven.setUserContext({
        // user info
    })
    return {
        dns:url,
        options:config
    }
}