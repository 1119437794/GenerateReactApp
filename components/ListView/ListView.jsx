import React, { Component } from 'react';
import './ListView.scss';
import { AddSetEditable } from '../../mixins/index';

@AddSetEditable
class ListView extends Component {
    static defaultProps = {
        // 绑定输入源
        dataIn: '',
        // 表头信息
        column: JSON.stringify([
            {
                title: '序号',
                key: 'ID'
            },
            {
                title: '产品名称',
                key: 'proName'
            }
        ]),
        // 宽 高
        W: 200,
        H: 82,
    }

    constructor(props) {
        super(props);
        this.state = {
            rootClassName: 'list_root'
        }
    }

    render () {
        const { rootClassName } = this.state;
        const {style, dataIn, component_id, column} = this.props;
        let fixedCoumn = null;
        let fixedDataIn = dataIn;
        try {
            fixedCoumn = JSON.parse(column);
        } catch (err) {
            return false;
        }

        if (!Array.isArray(dataIn)) {
            fixedDataIn = [
                {
                    ID: 101010,
                    proName: 'CAMERA360'
                }
            ]
        }

        return (
            <ul 
                ref={ ref => this.rootDom = ref }
                className={rootClassName} 
                style={style}
            >
                <li className='list_item'>
                    {
                        fixedCoumn.map((item, index) => {
                            return <span key={index}>
                                {item.title}
                            </span>
                        })
                    }
                </li>
                {
                    fixedDataIn.map((rowItem, rowIndex) => {
                        return (
                            <li
                                key = {rowIndex}
                                className = 'list_item'
                            >
                                {
                                    fixedCoumn.map((colItem, colIndex) => {
                                        return (
                                            <span key = {colIndex}>{rowItem[colItem.key]}</span>
                                        )
                                    })
                                }
                            </li>
                        )
                    })
                }
                <span className="com_id"> {component_id} </span>
            </ul> 
        )
    }
}

export default ListView;