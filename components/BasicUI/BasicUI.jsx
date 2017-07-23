/**
 * 提供基础组件库的组件
 */ 
import React from 'react';
import './BasicUI.scss';

export default (props) => {
    const {list, handleClick} = props;

    return (
        <div className='basic_root'>
                {
                    list.map((item, index) => {
                        return (
                            <button 
                                key={index}
                                className='basic_ui'
                                onClick={() => handleClick(item)}
                            >{item.desc}</button>
                        )
                    })
                }
            </div>
    )
}