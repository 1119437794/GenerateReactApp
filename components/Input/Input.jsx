import React, { Component } from 'react';
import './Input.scss';
import { AddSetEditable } from '../../mixins/index';

@AddSetEditable
class Input extends Component {
    static defaultProps = {
        title: '昵称',
        placeholder: 'CAMERA360',
        dataIn: '', // 输入源绑定
        dataOutput: '', // 输出源绑定
        W: 100,
        H: 40
    }

    constructor (props) {
        super(props);

        this.state = {
            rootClassName: 'input_root'
        }

        // 给每个label 与 input 获取唯一id
        this.inputId = (() => {
            const timeStamp = +new Date();
            const fourRandomNum = Number.parseInt(Math.random() * 9999) + 1;
            return `${timeStamp}${fourRandomNum}`;
        })();
    }

    render () {
        const { inputId } = this;
        const {
            title,
            placeholder,
            style,
            dataIn,
            dataOutput,
            component_id
        } = this.props;
        const { rootClassName } = this.state;

        let fixedDataOutput = typeof dataOutput === 'function' ? dataOutput : () => console.log('默认事件回调');

        return (
            <div 
                ref={ ref => this.rootDom = ref }
                className={rootClassName} 
                style={style}
            >
                <label className='input_title' htmlFor={inputId}>{title}</label>
                <input
                    className='input_input'
                    id={inputId}
                    type="text"
                    defaultValue={dataIn}
                    placeholder={placeholder}
                    onChange={(e) => fixedDataOutput(e.target.value)}
                />
                <span className="com_id">
                    {component_id}
                </span>
            </div>
        )
    }
}

export default Input;