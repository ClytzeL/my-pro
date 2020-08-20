/*
 * 进入可视区域才进行操作封装 
 * @Author: liyan52 
 * @Date: 2020-07-09 17:37:27 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-07-23 10:35:34
 */
/**
 * 使用示例
 *  <IntersectionObserver
                targetId="example"
                threshold={0.2}
                callback={getData}
            >
                <div id="example">
                    ...
                </div>
            </IntersectionObserver>
 */
import React,{ Component } from 'react'
/**
 * @param {* 进入可视区比例} threshold
 * @param {* 需要被监听的元素ID} targetDomId
 * @param {*进行下一步操作的回调} callback
 */
class IntersectionObserve extends Component{
    componentDidMount(){
        const { options,threshold = 0.1, targetDomId, callback} = this.props
        if(!targetDomId)return
        let isOptions = {
            ...options,
            // 表示重叠面积占被观察者的比例，从 0 - 1 取值，1 表示完全被包含
            threshold:threshold
        }
        let ioCallBack = (entries,observer) => {
            entries.forEach(entry => {
                let radio = entry.intersectionRatio
                let rect = entry.boundingClientRect
                if(radio >= threshold && rect.y > 0){
                    callback && callback()
                }
            });
        }
        this.observer = new IntersectionObserve(ioCallBack,isOptions)

        this.observer.observer(document.getElementById(targetDomId))
    }
    componentWillUnmount(){
        // 卸载的时候停止观察 底层是通过实践监听来实现 如果不停止观察 每次渲染都会重新注册监听 导致较大的性能开销
        this.observer && this.observer.unobserve && this.observer.unobserve(this.target)
    }
}

export default IntersectionObserve
