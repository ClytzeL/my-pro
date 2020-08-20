/*
 * description 
 * @Author: liyan52 
 * @Date: 2020-07-01 15:53:58 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-07-14 16:36:01
 */
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import RavenReact from 'react-raven'
import { store,history } from 'store'
import codeMonitor from 'common/js/util/codeMonitor';
import 'intersection-observer'
import Root from '../router'
// 埋点统计封装
// 全局js性能检测封装
// vconsole配置
// 注册native返回到window
// 注册网络连接变化native
// 监听地址变化发送各页面埋点
// 版本更新轮询检测checkVersion
const ravenConfig = codeMonitor('https//mySentrySeivice.corp.com/id')// sentry服务项目所在地址
// Provider作用：使容器组件（connect包裹的展示组件）访问redux store
render(<Provider store={store}>
    <div className="root">
        <Root history={ history }></Root>
        <RavenReact dns={ ravenConfig.dns } config={ ravenConfig }></RavenReact>
    </div>
</Provider>,document.getElementById('app'))