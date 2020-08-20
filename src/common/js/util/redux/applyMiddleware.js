/*
 * 模拟实现applyMiddleware 
 * @Author: liyan52 
 * @Date: 2020-07-14 15:24:02 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-07-15 16:14:26
 */
// 中间件的执行是顺序的，每个中间件的dispatch生成其实是反序的
// 链式执行：将当前中间件的dispatch传递给下一个中间件，即参数next
// 由于store.getState()比较常用，一般中间件将store作为顶层参数，每个 middleware 接受 Store 的 dispatch 和 getState 函数作为命名参数
// 最后一个中间件中不应该调用 next 函数，因为没有下一个中间件了，同理要是中间某个中间件没有调用 next(action)，那么后面所有的中间件将不会被调用。（logger 中间件要放在最后一个的原因）
export function applyMiddleware(store,middlewares){
    let middlewares = middlewares.slice()
    middlewares.reverse()
    /**
        由于是依次执行中间件，那么当前中间件执行完成肯定得执行下一个中间件，做到链式调用；
        之所以将列表反序的目的是为了在遍历的时候，让上一个中间件知道下一个中间件的dispatch是什么
    **/
    let dispatch = store.dispatch
    middlewares.forEach(middleware => {
        dispatch = middleware(store)(dispatch)
    });
    return Object.assign({},store,{dispatch})
}
// 源码实现
// 实现逻辑是通过next(action) 处理和传递 action 直到 redux 原生的 dispatch 接收处理。
export function applyMiddleware(...middlewares){
  return createStore => (...args) => {
    // 初始化store
    // args:reducer,preloadedState,enhancer等
    const store = createStore(...args)
    let dispatch = () => {
      throw new Error('dispatch正在改造中，当前不允许调用')
    }
    // 记录原始store
    const middlewareApi={
      getState:store.getState,
      dispatch: (...args) => dispatch(...args)// args:action
    }
    // 将store传入，等待 middleware(store) 返回的 next => action => next(action)
    // 通过闭包，每个中间件得到的都是同一个store即middlewareAPI。这样就保证了数据的迭代变化
    // 每个middleware改造的store，等待compose
    const chain = middlewares.forEach(middleware => middleware(middlewareApi))
    /* 每次middleware(middlewareAPI) 应用中间件，都相当于 logger(store)一次，store也随之改变，返回两个next形参函数
    * [next => action => { console.log(store); next(action) },// logger
    *  next => action => { console.log(store); next(action) }] // handlerPrice
    * 随之两个中间件等待被compose, 每个都可以单独访问next/dispatch前后的store
    */
    // 通过next => action => next(action) 处理和传递 action 直到 redux 原生的 dispatch 接收处理。
    // store.dispatch 就是一次 middleWare Loop
    dispatch = compose(...chain)(store.dispatch)
    // 先将所有的中间件compose合并，然后将store.dispatch作为next形数传入，得到每个action => store.dispatch(action)
    // 也就行上文的 next(action) === store.dispatch(action)
    // 最终抛出一个compose后的增强dispatch与store
    // 返回改造后的store
    return {
      ...store,
      dispatch
    }
  }
}
/**
 * ...middlewares (arguments): 遵循 Redux middleware API 的函数。
 * 每个 middleware 接受 Store 的 dispatch 和 getState 函数作为命名参数，并返回一个函数。
 * 该函数会被传入 被称为 next 的下一个 middleware 的 dispatch 方法，并返回一个接收 action 的新函数;
 * 这个函数可以直接调用 next(action)，或者在其他需要的时刻调用，甚至根本不去调用它。
 * 调用链中最后一个 middleware 会接受真实的 store 的 dispatch 方法作为 next 参数，并借此结束调用链。
 * 所以，middleware 的函数签名是 ({ getState, dispatch }) => next => action。
 * 
 * Redux middleware 就像一个链表。每个 middleware 方法既能调用 next(action) 传递 action 到下一个 middleware，
 * 也可以调用 dispatch(action) 重新开始处理，或者什么都不做而仅仅终止 action 的处理进程。
 */
// 高阶函数应用：传入reducers，返回reducers，是一种enhance
export function combineReducers(reducers) {
    return function (state = {}, action) {
      return Object.keys(reducers).reduce((nextState, key) => {
        // 调用每一个 reducer 并将其管理的部分 state 传给它
        nextState[key] = reducers[key](state[key], action)
        return nextState
      }, {})
    }
  }
  