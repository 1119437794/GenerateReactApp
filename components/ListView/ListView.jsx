import React, { Component } from 'react';
import './ListView.scss';
import { AddSetEditable } from '../../mixins/index';

@AddSetEditable
class ListView extends Component {
    static defaultProps = {
        // TODO 注意代码健壮性
        // TODO 有的字段是可以写死的 但有些是引用store里数据 注意区分
        listBindStore: []
    }

    constructor(props) {
        super(props);
        this.state = {
            rootClassName: 'list_root'
        }
    }

    render () {
        const { style, listBindStore } = this.props;
        const { rootClassName } = this.state;

        return (
            <ul 
                ref={ ref => this.rootDom = ref }
                className={rootClassName} 
                style={style}
            >
                <li className='list_item'>
                    <span>标题1</span>
                    <span>标题2</span>
                    <span>标题3</span>
                    <span>标题4</span>
                </li>
                {
                    listBindStore.map((item, index) => {
                        const tmpItem = Array.isArray(item) ? item : [];
                        return (
                            <li
                                key = {index}
                                className = 'list_item'
                            >
                                {
                                    tmpItem.map((item, index) => {
                                        return (
                                            <span key = {index}>{item}</span>
                                        )
                                    })
                                }
                            </li>
                        )
                    })
                }

            </ul> 
        )
    }
}

export default ListView;