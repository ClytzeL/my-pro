/*
 * description 
 * @Author: liyan52 
 * @Date: 2020-07-09 19:27:26 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-07-15 17:52:57
 */

import { createStore,combineReducers,applyMiddleware,compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import * as reducers from './reducers'
import { createHashHistory } from 'history'
// Redux DevTools扩展
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||compose
// Redux 应用只有一个单一的 store,严格的单向数据流是 Redux 架构的设计核心
// reducer是纯函数，不处理异步操作。使用 middleware 在 异步 action 到达 reducer 前处理它们。
// 全局注入history
const history = createHashHistory()
window.history = history
history.listen((location,action) => {
    // 监听路由变化
    console.log(location,action)
})

// 合并reducers,支持异步注入reducer
const createReducers = (asyncReducers) => combineReducers({
    ...reducers,
    ...asyncReducers
})
// 动态注入reducer,结合路由能做到按需加载reducers
const injectAsyncReducer = (key,asyncReducer) => {
    if(Object.hasOwnProperty.call(store.asyncReducers,key))return;
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducers(store.asyncReducers))
}

// 减少样板代码
// reducer生成器
const makeReducers = (initialState,ACTION_HANDLES) => (
    (state = initialState,action) => {
        const handler = ACTION_HANDLES[action.type]
        return handler ? handler(state,action) : state
    }
)
// action生成器, 某些工具库redux-act 和 redux-actions 也可以帮助生成action creator
const makeActions = (type,...argNames) => {
    let action = { type }
    return function(...args){
        argNames.forEach((arg,index) => {
            action[argNames[index]] = args[index]
        })
        return action
    }
}

// 中间件是 dispatch 一个 action 到触发 reducer 之间做的一个额外操作
// 中间件 让你在每个 action 对象 dispatch 出去之前，注入一个自定义的逻辑来解释你的 action 对象,异步action是中间件的常见用例
// “Thunk” 中间件让你可以把 action creators 写成 “thunks”，也就是返回函数的函数。
// 这使得控制被反转了： 你会像一个参数一样取得 dispatch ，所以你也能写一个多次分发的 action creator 。
// 记录日志
const logger = store => next => action => {
    console.log("dispatching action:",action)
    let result = next(action)//next为下一个dispatch；
    console.log("next state:",store.getState())
    return result
}
// 崩溃报告
const crashReport = store => next => action =>{
    try{
        return next(action)
    }catch(err){
        Raven.captureException(err,{extra:{
            action,
            state:store.getState()
        }})
        throw err
    }
}
// 模拟thunk，执行异步action,允许dispatch 函数
const thunk = extraArgument => store => next => action =>{
    return typeof action === 'function'? action(store.dispatch,store.getState(),extraArgument) : next(action)
}

const store =createStore(createReducers(),composeEnhancer(applyMiddleware(thunkMiddleware,logger)))
window.store = store
export { store, history, injectAsyncReducer, makeReducers, makeActions }