/*
 * description 
 * @Author: liyan52 
 * @Date: 2020-08-14 18:59:15 
 * @Last Modified by: liyan52 
 * @Last Modified time: 2020-08-14 18:59:15 
 */
import React from 'react'
import { get } from 'lodash';

const CustomIcon = ({ type = {}, className = '', size = 'md', ...restProps }) => {
    let svgId = get(
        type, 'default.id', '',
    ) || get(
        type, 'id', '',
    );
    return (
        <svg
            className={`am-icon am-icon-${svgId} am-icon-${size} ${className}`}
            {...restProps}
        >
            <use xlinkHref={'#' + svgId} /> {/* svg-sprite-loader@0.3.x */}
            {/* <use xlinkHref={#${type.default.id}} /> */} {/* svg-sprite-loader@latest */}
        </svg>
    )
};
export default CustomIcon