import React, { Component } from 'react';
import './Btn.scss';
import { AddSetEditable } from '../../mixins/index';

@AddSetEditable
class Btn extends Component {
    static defaultProps = {
        name: '按钮',
        clickCallback: () => console.log('默认事件')
    }

    constructor(props) {
        super(props);
        this.state = {
            rootClassName: 'btn_root'
        }
    }

    render () {
        const { name, clickCallback, style} = this.props;
        const { rootClassName } = this.state;

        return (
            <button 
                ref={ ref => this.rootDom = ref }
                className={rootClassName}
                style={style}
                onClick={clickCallback}
            >{name}</button>
        )
    }
}

export default Btn;