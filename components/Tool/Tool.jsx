import React, { Component } from 'react';
import './Tool.scss';

class Tool extends Component {
    render () {
        const {previewUrl, publishCB} = this.props;
        return (
            <div className="tool_root">
                <button
                    className="tool_publish"
                    onClick={publishCB}
                >发布</button>
                <a
                    target="blank"
                    href={previewUrl}
                    className="tool_preview"
                >预览</a>
            </div>
        )
    }
}

export default Tool;