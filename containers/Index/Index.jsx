/**
 * 首页容器组件
 */ 
import React, { Component } from 'react';
import './Index.scss';
import ConfigCom from '../../components/ConfigCom/ConfigCom';
import EditPage from '../../components/EditPage/EditPage';
import BasicUI from '../../components/BasicUI/BasicUI';
import UIInfo from '../../statics/config/UIInfo.js'; // 组件库配置
import Tool from '../../components/Tool/Tool';
import PagesList from '../../components/PagesList/PagesList';

const mockData = {
    0: [
        {
            ID: 1010,
            proName: 'MIX10'
        },
        {
            ID: 1011,
            proName: 'MIX11'
        },
        {
            ID: 2010,
            proName: 'MIX20'
        },
        {
            ID: 2011,
            proName: 'MIX22'
        },
    ],
    1: [
        {
            ID: 3010,
            proName: 'MIX10'
        },
        {
            ID: 3011,
            proName: 'MIX11'
        },
        {
            ID: 4010,
            proName: 'MIX20'
        },
        {
            ID: 4011,
            proName: 'MIX22'
        },
    ],
};

class Index extends Component {
    constructor (props) {
        super(props);

        /*
        * 整个项目配置
        * 每个数组项包括 ui 和 config
        * */
        this.allConfig = [];

        this.state = {
            comCurrId: 0, // 当前组件的ID
            previewUrl: '', // 预览地址
            pageList: ['第1个页面'], // 配置的页面
            ui: [], // 所有添加的UI组件
            config: {}, // 所有添加的UI组件的配置信息
        };

        /**
         * 组件库回调
         * @param UIItemInfo { Obj } 添加的某个组件信息
         */
        this.basicUICallback = (UIItemInfo) => {
            const ui = this.state.ui;
            ui.push(UIItemInfo);
            const comCurrId = ui.length - 1;
            this.state.comCurrId = comCurrId;
            this.state[`${UIItemInfo.name}_${comCurrId}`] = {}; // 为每一个组件绑定一个全局store 以便组件数据通信
            this.setState({ui});
        };

        /**
         * 按需加载组件
         * @param componentName { Str } 组件名
         */
        this.loadComponent = (componentName) => {
            return require(`../../components/${componentName}/${componentName}.jsx`).default;
        }

        /**
         * 设置组件默认配置项参数
         * @param component { Func } 组件
         */
        this.setConfigItem = (component) => {
            return Object.assign(component.defaultProps, {
                // 默认设置组件 X/Y 坐标
                X: 100,
                Y: 100
            });
        }

        /**
         * 配置组件回调
         * @param config { Obj } 某个组件的配置信息
         */
        this.configComCallback = (config) => {
            this.state.config[this.state.comCurrId] = Object.assign({}, config); // 这里浅拷贝
            this.setState({
                config: this.state.config
            })
        }

        // dbClick
        this.dbClick = (uiId) => {
            this.setState({
                comCurrId: uiId
            })
        }

        // 预览
        this.handlePublish = () => {
            const headers = new Headers();
            const {ui, config} = this.state;
            headers.append('Content-Type', 'application/json'); // 必须设置Content-Type 否则Node接收不到
            headers.append('Access-Control-Allow-Origin', '*'); // 必须设置Content-Type 否则Node接收不到
            const req = new Request('/postPageConfig', {
                headers: headers,
                method: 'post',
                body: JSON.stringify({
                    ui,
                    config
                })
            });

            fetch(req)
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        previewUrl: res.url
                    })
                })
        }

        // 切换页面
        this.handleChangePage = (prevIndex, nextIndex) => {
            const {ui, config, pageList} = this.state;
            const tmpConfig = this.allConfig[nextIndex];
            this.allConfig[prevIndex] = { ui, config };

            if (tmpConfig) {
                this.setState({
                    ui: tmpConfig.ui,
                    config: tmpConfig.config
                });
            } else {
                pageList.push(`第${nextIndex + 1}个页面`);
                this.setState({
                    ui: [],
                    config: {},
                    pageList
                });
            }
        }
    }

    render () {
        let curConfigItem = {}; // 当前组件配置项
        const { previewUrl, pageList, ui, config } = this.state;
        const tmpPageList = [...pageList];
        tmpPageList.push('新增页面');

        // 设置页面编辑界面
        const EditPageChildren = ui.map((item, index) => {
            const comName = item.name; // 组件名称
            const comNo = `${comName}_${index}`; // 组件编号
            let Child = this.loadComponent(comName); // 根据组件名称加载组件
            let configItem = config[index] || this.setConfigItem(Child); // 获取相应配置信息
            let tmpConfigItem = Object.assign({}, configItem);

            // 当前可编辑组件的配置信息获取，以便配置模块组件获取到数据
            this.state.comCurrId === index && (curConfigItem = Object.assign(configItem, {comNo}));

            // 样式信息
            const style = {
                minWidth: configItem.W + 'px',
                minHeight: configItem.H + 'px',
                transform: `translate(${configItem.X}px, ${configItem.Y}px)`
            }

            // 删除不必要的props
            delete tmpConfigItem.X;
            delete tmpConfigItem.Y;
            delete tmpConfigItem.W;
            delete tmpConfigItem.H;

            // 针对dataIn dataOutput做转换处理，绑定到store上去
            const { dataIn, dataOutput } = tmpConfigItem;
            if (dataIn) {
                if (dataIn.includes(',')) {
                    const tmpDataIn = {};
                    dataIn.split(',').map((item) => {
                        tmpDataIn[item] = this.state[item];
                    });

                    this.state[comNo] = tmpDataIn;
                    tmpConfigItem.dataIn = tmpDataIn;
                } else {
                    this.state[comNo] = this.state[dataIn];
                    tmpConfigItem.dataIn = this.state[comNo];
                }
            }

            if (dataOutput) {
                tmpConfigItem.dataOutput = (val) => {
                    if (tmpConfigItem.API) {
                        // TODO 发一个请求
                        console.log('comNo', this.state[comNo]);
                        this.setState({
                            [dataOutput]: mockData[this.state[comNo]] // 根据输入参数请求接口，然后返回对应数据
                        })
                    } else {
                        this.setState({
                            [dataOutput]: val
                        })
                    }
                };
            }

            return (
                <Child
                    key = {index}
                    id = {index} // 用于标记当前编辑状态组件的ID
                    style = {style}
                    {...tmpConfigItem}
                    component_id = {comNo} // 用于显示当前组件编号
                    dbClick={this.dbClick} // 双击回调
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

                    <div className="index_tool">
                        <Tool
                            previewUrl={previewUrl}
                            publishCB={this.handlePublish}
                        />
                    </div>

                    <div className="index_page">
                        <PagesList
                            pageList={tmpPageList}
                            addNewPageCB={this.handleChangePage}
                        />
                    </div>
                </div>
            </div>     
        )
    }
}

export default Index;

