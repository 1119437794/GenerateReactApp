/**
 * 首页容器组件
 */ 
import React, { Component } from 'react';
import './Index.scss';
import ConfigCom from '../../components/ConfigCom/ConfigCom';
import EditPage from '../../components/EditPage/EditPage';
import BasicUI from '../../components/BasicUI/BasicUI';
import UIInfo from '../../statics/config/UIInfo.js';

const mockData = {
    0: [
        [101, 20, 30, 40],
        [10, 20, 30, 40]
    ],
    1: [
        [11, 21, 31, 41],
        [11, 21, 31, 41]
    ],
    2: [
        [102, 22, 32, 42],
        [12, 22, 32, 42]
    ]
};

const mockFunc = {
    '0': function (val) {
        this.state.editData[0] = val;
    },

    '1': function () {
    },
    
    '2': function () {
        const index = this.state.editData[0];
        this.state.editData[1] = mockData[index];
        this.setState({
            editData: this.state.editData
        })

    }
}

class Index extends Component {
    constructor (props) {
        super(props);

        this.state = {
            ui: [], // 所有添加的UI组件
            uiId: 0, // 当前UI的ID
            config: {}, // 所有添加的UI组件的配置信息

            editData: {
                0: {
                    value: 1010
                },
                1: []
            } //
        };

        // () => console.log(1010)

        /**
         * 组件库回调
         * @param UIItemInfo { Obj } 添加的某个组件信息
         */ 
        this.basicUICallback = (UIItemInfo) => {
            const ui = this.state.ui;
            ui.push(UIItemInfo);
            window.CURR_UI_ID = ui.length - 1;
            this.setState({ ui });
        };

        /**
         * 按需加载组件
         * @param componentName { Str } 组件名
         */ 
        this.loadComponent = (componentName) => {
            return require(`../../components/${componentName}/${componentName}.jsx`).default;
        }

        /**
         * 设置组件配置项参数
         * @param component { Func } 组件
         */ 
        this.setConfigItem = (component) => {
            // 针对每个组件设置坐标以及宽高的表现方面的信息
            const faceInfo = {
                X: 100,
                Y: 100,
                W: 100,
                H: 100
            };
            return Object.assign(component.defaultProps || {}, faceInfo);
        }

        /**
         * 配置组件回调
         * @param config { Obj } 某个组件的配置信息
         */ 
        this.configComCallback = (config) => {
            this.state.config[window.CURR_UI_ID] = Object.assign({}, config); // 这里浅拷贝
            this.setState({
                config: this.state.config
            });
        }

        this.editPageDbClick = (uiId) => {
            this.setState({
                uiId
            })
        }
    }

    render () {
        const { ui, config } = this.state;
        let curConfigItem = {};

       // 设置编辑界面
        const EditPageChildren = ui.map((item, index) => {
            let Child = this.loadComponent(item.name);
            let configItem = config[index] || this.setConfigItem(Child);
            let tmpConfigItem = Object.assign({}, configItem);

            for (let key in tmpConfigItem) {
                const tmpVal = tmpConfigItem[key];
                // 绑定回调
                if (/.*?Callback$/.test(key) && mockFunc[tmpVal]) {
                    tmpConfigItem[key] = mockFunc[tmpVal].bind(this);
                } else if (/.*?BindStore$/.test(key)) {
                    // 绑定store
                    tmpConfigItem[key] = this.state.editData[tmpVal];
                }
            }

            window.CURR_UI_ID === index && (curConfigItem = configItem);
            const style = {
                width: configItem.W + 'px',
                height: configItem.H + 'px',
                transform: `translate(${configItem.X}px, ${configItem.Y}px)`
            }

            return (
                <Child 
                    {...tmpConfigItem}
                    style = {style}
                    key = {index}
                    id = {index}
                    dbClick = {this.editPageDbClick}
                >
                </Child>
            )
        })

        return (
            <div className='index_root'>
                <div className='index_config'>
                    <ConfigCom 
                        configItem={curConfigItem}
                        callback={this.configComCallback}
                    /> 
                </div>

                <div className='index_edit'>
                    <EditPage>
                        { EditPageChildren }
                    </EditPage>
                </div>

                <div className='index_coms'>
                    <BasicUI
                        list = {UIInfo}
                        handleClick = {this.basicUICallback}
                    ></BasicUI>
                </div>
            </div>     
        )
    }
}

export default Index;

