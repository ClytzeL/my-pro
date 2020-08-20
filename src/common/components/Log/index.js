/*
 * 打点上报 
 * 用于当元素进入可视区域时，就上报数据
 * @Author: liyan52 
 * @Date: 2020-07-09 18:00:38 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-07-09 18:14:05
 */
/* 使用示例：被Log组件包裹的元素，进入可视区域后，就向后台发送{ appid: 1234, type: 'news'}数据
<Log
  className="container"
  log={{ appid: 1234, type: 'news'}}
  style={{ marginTop: '1400px' }}
  onClick={() => console.log('log')}
>
  <div className="news" onClick={() => console.log('news')}>
    <p>其他内容</p>
  </div>
</Log> */
import React,{ Component } from 'react'
import PropTypes from 'prop-types'

class Log extends Component{
    constructor(props){
        super(props)
        this.ref = React.createRef()
        this.io=null

    }
    componentDidMount(){
        const { options,log } = this.props
        const ioOptions={
            ...options,
        }
        this.io = new IntersectionObserver(([entry]) => {
            if(entry.isIntersecting){
                console.log('进入可视区域，将要发送log数据', log)
                // sendLog(log)
                this.io.disconnect()
            }
        },ioOptions)
        this.io.observe(this.ref.current)
    }
    componentWillUnmount(){
        this.io && this.io.disconnect()
    }
    render(){
        // 把log属性去掉，否则log属性也会渲染在div上 
        const { log, ...props } = this.props;
        return (
            <div className="log" ref={ this.ref} { ...props}>
                { this.props.children}
            </div>
        )
    }
}