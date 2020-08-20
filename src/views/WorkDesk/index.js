/*
 * 工作台 
 * @Author: liyan52 
 * @Date: 2020-07-01 17:03:34 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-08-14 19:03:07
 */
import React,{ Component } from './node_modules/react'
import CustomIcon from 'common/components/CustomIcon'
class WorkDesk extends Component{
    render(){
        return(
            <div className="work-desk">微信读书app
                <CustomIcon type={require('common/img/svg/info@2x.svg')} size="xxs" />  
            </div>
        )
    }
}
export default WorkDesk