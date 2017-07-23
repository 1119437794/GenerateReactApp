import React, { Component } from 'react';
import './ConfigCom.scss';

class ConfigCom extends Component {
    constructor (props) {
        super(props);

        this.configInfo = {}; // 组件的所有配置项信息

        this.tmpInputCallback = (obj) => {
            Object.assign(this.configInfo, obj);
        }
    }

    render () {
        const configItem = this.props.configItem;
        const configItemKeys = Object.keys(configItem);
        this.configInfo = configItem;

        return (
            <div className='config_root'>
                {
                    configItemKeys.map((item) => {
                        return (
                            <TmpInput 
                                key = {`${item}_${window.CURR_UI_ID}`}
                                title = {item}
                                value = {configItem[item]}
                                handleChange = {this.tmpInputCallback}
                            ></TmpInput>
                        )
                    })
                }

                {
                    configItemKeys.length ?
                    <button 
                        className='config_btn'
                        onClick={() => this.props.callback(this.configInfo)}
                    >确定</button>
                    : null
                }
            </div>
        )
    }
}

export default ConfigCom;

/**
 * 临时输入域组件
 * @param props { Obj }
 */
const TmpInput = (props) => {
    const { title, value, handleChange} = props;

    return (
        <div className='config_input'>
            <span className='config_inputTitle'>{title}</span>
            <input
                className = 'config_inputField'
                type = 'text'
                defaultValue = {value}
                onChange = {(e) => handleChange({[title]: e.target.value})}
            />
        </div>
    )
}