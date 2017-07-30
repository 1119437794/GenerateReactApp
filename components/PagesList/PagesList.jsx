import React, { Component } from 'react';
import './PagesList.scss';

class PagesList extends Component {
    state = {
        activeIndex: 0
    }

    handleClick = (index) => {
        const prevIndex= this.state.activeIndex;
        if (index === prevIndex) return;
        const nextIndex= index;
        this.setState({
            activeIndex: nextIndex
        })
        this.props.addNewPageCB(prevIndex, nextIndex);
    }

    render () {
        const {pageList} = this.props;
        const className = (index) =>
                          this.state.activeIndex === index ? 'pageList_item-active' : 'pageList_item';
        return (
            <ul className="pageList_root">
                {
                    pageList.map((item, index) => {
                        return <li
                            key={index}
                            className={className(index)}
                            onClick={(() => this.handleClick(index))}
                        >{item}</li>
                    })
                }
            </ul>
        )
    }
}

export default PagesList;