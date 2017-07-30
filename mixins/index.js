/**
 * 添加设置可编辑状态
 * TODO https://zhuanlan.zhihu.com/p/24776678?group_id=802649040843051008
 */

export const AddSetEditable = (WrappedComponent) => {
    return class extends WrappedComponent {

        // 设置可编辑状态
        setEditable = () => {
            const currClassName = this.state.rootClassName;

            if (!currClassName.includes('editable')){
                this.setState({
                    rootClassName: currClassName + ' editable'
                });
            }
        }

        // 取消可编辑状态
        removeEditable = () => {
            this.setState({
                rootClassName: this.state.rootClassName.replace(' editable', '')
            });
        }

        render () {
            return super.render();
        }

        componentDidMount () {
            this.setEditable();

            let flag = false;
            this.configDom = document.querySelector('.index_config');
            this.func1 = () => flag = true;
            this.func2 = () => flag ? (flag = false) : this.removeEditable();
            this.func3 = () => {
                this.setEditable();
                this.props.dbClick(this.props.id) // 设置当前编辑状态的组件ID;
            };

            this.rootDom.addEventListener('click', this.func1);
            this.configDom.addEventListener('click', this.func1);
            document.addEventListener('click', this.func2);
            this.rootDom.addEventListener('dblclick', this.func3);
        }

        // https://stackoverflow.com/questions/32903001/react-setstate-on-unmounted-component
        componentWillUnmount () {
            this.rootDom.removeEventListener('click', this.func1);
            this.configDom.removeEventListener('click', this.func1);
            document.removeEventListener('click', this.func2);
            this.configDom.removeEventListener('dblclick', this.func3);
        }
    }
}

/*export const AddSetEditable = (target) => {

    // 点击其他地方关闭
    const clickOthersCallback = function () {
        let flag = false;
        const configDom = document.querySelector('.index_config');

        this.rootDom.addEventListener('click', () => flag = true);
        configDom.addEventListener('click', () => flag = true);
        document.addEventListener('click', () => flag ? (flag = false) : this.removeEditable())
    };

    // 设置可编辑状态
    target.prototype.setEditable = function () {
        const currClassName = this.state.rootClassName;

        if (!currClassName.includes('editable')){
            this.setState({
                rootClassName: currClassName + ' editable'
            });
        }
    },

    // 取消可编辑状态
    target.prototype.removeEditable = function () {
        this.setState({
            rootClassName: this.state.rootClassName.replace(' editable', '')
        });
    }

    // 组件首次渲染完毕时 设置可编辑状态 并 监听点击其他地方关闭事件 
    target.prototype.componentDidMount = function () {
        this.setEditable();
        clickOthersCallback.call(this);
        this.rootDom.addEventListener('dblclick', () => {
            "use strict";
            this.setEditable();
            this.props.dbClick(this.props.id) // 设置当前编辑状态的组件ID;
        });
    }
}*/
