import React, { Component } from 'react';
import './Input.scss';
import { AddSetEditable } from '../../mixins/index';

@AddSetEditable
class Input extends Component {
    static defaultProps = {
        title: '标题',
        placeholder: '请输入',
        changeCallback: () => console.log('默认填充的事件')
    }

    constructor (props) {
        super(props);

        this.state = {
            rootClassName: 'input_root'
        }
      
        this.inputId = (() => {
            const timeStamp = +new Date();
            const fourRandomNum = Number.parseInt(Math.random() * 9999) + 1;
            return `${timeStamp}${fourRandomNum}`;
        })();
    }

    render () {
        const { inputId } = this;
        const { title, placeholder, style, changeCallback} = this.props;
        const { rootClassName } = this.state;

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
                    placeholder={placeholder}
                    onChange={(e) => changeCallback(e.target.value)}
                />
            </div>
        )
    }
}

export default Input;