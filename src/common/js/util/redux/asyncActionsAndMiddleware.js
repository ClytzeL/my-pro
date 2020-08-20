/*
 * 减少样板代码
 * 异步action及泛化异步action及处理泛化异步action的middleware
 * @Author: liyan52 
 * @Date: 2020-07-14 17:24:04 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-07-14 17:28:20
 */
// 异步action
export function loadPosts(userId) {
    // 用 thunk 中间件解释：
    return function (dispatch, getState) {
      let { posts } = getState();
      if (posts[userId]) {
        // 这里是数据缓存！啥也不做。
        return;
      }
  
      dispatch({
        type: 'LOAD_POSTS_REQUEST',
        userId
      });
  
      // 异步分发原味 action
      fetch(`http://myapi.com/users/${userId}/posts`).then(
        response => dispatch({
          type: 'LOAD_POSTS_SUCCESS',
          userId,
          response
        }),
        error => dispatch({
          type: 'LOAD_POSTS_FAILURE',
          userId,
          error
        })
      );
    }
  }
// 泛化异步action
export function loadPosts2(userId) {
    return {
      // 要在之前和之后发送的 action types
      types: ['LOAD_POSTS_REQUEST', 'LOAD_POSTS_SUCCESS', 'LOAD_POSTS_FAILURE'],
      // 检查缓存 (可选):
      shouldCallAPI: (state) => !state.users[userId],
      // 进行取：
      callAPI: () => fetch(`http://myapi.com/users/${userId}/posts`),
      // 在 actions 的开始和结束注入的参数
      payload: { userId }
    };
  }
// 解释泛化异步action的中间件
function callAPIMiddleware({ dispatch, getState }) {
    return next => action => {
      const {
        types,
        callAPI,
        shouldCallAPI = () => true,
        payload = {}
      } = action
  
      if (!types) {
        // Normal action: pass it on
        return next(action)
      }
  
      if (
        !Array.isArray(types) ||
        types.length !== 3 ||
        !types.every(type => typeof type === 'string')
      ) {
        throw new Error('Expected an array of three string types.')
      }
  
      if (typeof callAPI !== 'function') {
        throw new Error('Expected callAPI to be a function.')
      }
  
      if (!shouldCallAPI(getState())) {
        return
      }
  
      const [ requestType, successType, failureType ] = types
  
      dispatch(Object.assign({}, payload, {
        type: requestType
      }))
  
      return callAPI().then(
        response => dispatch(Object.assign({}, payload, {
          response,
          type: successType
        })),
        error => dispatch(Object.assign({}, payload, {
          error,
          type: failureType
        }))
      )
    }
  }