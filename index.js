import React from 'react';
import { render } from 'react-dom';
import Index from './containers/Index/Index';
import './statics/style/public.css';

window.CURR_UI_ID = 0; // 当前可编辑组件的ID

render(
    <Index />,
    document.getElementById('app')    
);