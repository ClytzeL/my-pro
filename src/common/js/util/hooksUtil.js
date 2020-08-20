/*
 * 自定义钩子 
 * @Author: liyan52 
 * @Date: 2020-07-08 14:13:12 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-08-06 17:57:41
 */
import { useEffect,useState,useMemo } from 'react'
import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { Toast } from 'crm-design-mobile'
import axios2 from 'commob/js/axios'

/**
 * 请求后台接口钩子函数
 * 使用该函数不要使用 {...a,...b}方式扩展param，可以使用Object.assign
 * @param url api请求url
 * @param params 参数内容
 * @param method 请求方式
 */
export function useRequest(
    url = '',params = {},method = 'get',
){
    const [loading,setLoading] =useState(false)
    const [error,setError] = useState('')
    const [response,setResponse] = useState({})

    const request = () => {
        // 定义cancel标志位
        let cancel =false
        setLoading(true)

        const request = method == 'post'? axios2.post : axios2.get
        request(url,params)
        .then((response) => {
            if(!cancel){
                if(response.code == 0){
                    setResponse(response)
                }else{
                    Toast(response.message)
                }
            }else{
                // 在请求成功取消掉后，打印测试文本。
                console.log('cancel request',url,params)
            }
        })
        .catch(error => {
            if(!cancel){
                setError(error)
                window.releaseEvents.captureException(JSON.stringify({ error: 'requestError', message: '请求失败', error }))
            }
        })
        .finally(() => {
            if(!cancel){
                setLoading(false)
            }
        })
        // 请求的方法返回一个 取消掉这次请求的方法
        return () =>{
            cancel = true
        }
    }
    // 在useEffect传入的函数，返回一个取消请求的函数
    // 这样在下一次调用这个useEffect时，会先取消掉上一次的请求。
    useEffect(() => {
        const cancelRequest = request()
        return () => {
            cancelRequest()
        }
    },[url,JSON.stringify(params),method])
    return { response,loading,error }
}
/**
 * 将action creators转化成拥有同名keys的对象，使用dispatch把每个action creator包围起来
 * 这样可以直接调用，组件不会觉察redux的存在
 * @param {*} actions 
 * @param {*} dependencies 
 */
export function useActions(actions,dependencies){
    const dispatch = useDispatch()
    return useMemo(() => {
        if(Array.isArray(actions)){
            return actions.map(action => bindActionCreators(action,dispatch))
        }
        return bindActionCreators(actions,dispatch)
    },dependencies ? [dispatch,...dependencies] : [dispatch])
}

/**
 * useReducer 的polyfill(自己实现的,仅供参考)
 * 相当于动态注入reducer
 * @param {*} reducer   用户的reducer函数  （state,action）=> newState
 * @param {*} initialArg  初始state或者init函数的入参
 * @param {*} init  处理initialArg的函数，返回值为初始state
 */
export function useReducer(reducer,initialArg,init){
    const initialState =init ? init(initialArg) : initialArg
    const [state,setState] = useState(initialState)
    function dispatch(action){
        setState(reducer(state,action))
    }
    return [state,dispatch]
}