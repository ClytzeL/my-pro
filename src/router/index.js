/*
 * description 
 * @Author: liyan52 
 * @Date: 2020-07-01 17:08:53 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-07-14 16:31:06
 */
import React,{ Component,lazy,Suspense } from 'react'
import { Router,Route } from 'react-router'
import PropTypes from 'prop-types'
import ErrorBoundary from 'common/components/ErrorBoundary'
import Loading from 'common/components/Loading'
// React.lazy 与 bundle-loader?lazy,按需加载
/*  
解决：首屏渲染慢
1、bundle-loader?lazy使用辅助HOC实现组件懒加载
利用require.ensure来实现代码的按需加载JS、CSS文件，待请求到文件内容后再使用HOC来进行渲染。
2、React.lazy
React 在16.6版本时正式发布了React.lazy方法与Suspense（实验阶段）组件
React.lazy 接受一个函数，这个函数需要动态调用 import()。
它必须返回一个 Promise，该 Promise 需要 resolve 一个 default export 的 React 组件。
*/
const routeArr = [
    {
        path:'/',
        component:lazy(() => import('views/WorkDesk/index'))
    },
    {
        path:'/find',
        component:lazy(() => import(''))
    },
    {
        path:'/bookshelf',
        component:lazy(() => import(''))
    },
    {
        path:'/idea',
        component:lazy(() => import(''))
    },
    {
        path:'/account',
        component:lazy(() => import(''))
    },
]
class Root extends Component{
    constructor(props){
        super(props)
    }
    render(){
        // const routeProps = this.props
        return (
            <Router {...this.props}>
                <ErrorBoundary>
                    <Suspense fallback={() => <Loading/>}>
                        {
                            routeArr.map((item,key) =><Route exact path={ item.path } component={item.component } key={ key }/>)
                        }
                    </Suspense>
                </ErrorBoundary>
            </Router>
        )
    }

}
Root.propTypes = {
    history : PropTypes.object.isRequired
}
export default Root