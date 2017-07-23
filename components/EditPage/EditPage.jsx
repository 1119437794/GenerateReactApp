import React, { Component } from 'react';
import './EditPage.scss';

class EditPage extends Component {
    render () {
        return (
            <div className='edit_root'>
                {this.props.children}
            </div>
        )
    }
}

export default EditPage;