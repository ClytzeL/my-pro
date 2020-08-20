/*
 * 错误边界 
 * @Author: liyan52 
 * @Date: 2020-07-07 16:00:15 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-07-07 16:40:18
 */

import React,{ Component } from 'react'

class ErrorBoundary extends Component{
    constructor(props){
        super(props)
        this.state={
            hasError:false
        }
    }

    static getDerivedStateFromError(error){
        return { hasError:true }
    }
    
    componentDidCatch(error,errorInfo){
        console.log(error,errorInfo)
    }

    render(){
        const { hasError } = this.state
        if(hasError){
            return(
                <div className="error-boundary">Something went wrong!</div>
            )
        }
        return this.props.children
    }
}
export default ErrorBoundary