/*
 * redux实现撤销重做，可使用包redux-undo
 * @Author: liyan52 
 * @Date: 2020-07-14 18:47:37 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-07-14 18:49:07
 */
/**
 * 无论何种特定的数据类型，重做历史记录的 state 结构始终一致
 * {
  past: Array<T>,
  present: T,
  future: Array<T>
} 
 */
// 对reducer的增强
function undoable(reducer) {
    // 以一个空的 action 调用 reducer 来产生初始的 state
    const initialState = {
      past: [],
      present: reducer(undefined, {}),
      future: []
    }
  
    // 返回一个可以执行撤销和重做的新的reducer
    return function (state = initialState, action) {
      const { past, present, future } = state;
  
      switch (action.type) {
        case 'UNDO':
          const previous = past[past.length - 1]
          const newPast = past.slice(0, past.length - 1)
          return {
            past: newPast,
            present: previous,
            future: [ present, ...future ]
          }
        case 'REDO':
          const next = future[0]
          const newFuture = future.slice(1)
          return {
            past: [ ...past, present ],
            present: next,
            future: newFuture
          }
        default:
          // 将其他 action 委托给原始的 reducer 处理
          const newPresent = reducer(present, action);
          if (present === newPresent) {
            return state
          }
          return {
            past: [ ...past, present ],
            present: newPresent,
            future: []
          }
      }
    }
  }