import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import routes from './routes'
import rootReduces from './reduces'


// 目前的默认文案是英文，如果需要使用其他语言，可以参考下面的方案。
// 用于全局配置国际化文案
import { ConfigProvider, message } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN';

//配置为全局变量
import service from './service'
import './global.css'
global.service=service

const store = createStore(rootReduces, composeWithDevTools(applyMiddleware(thunk)))


const root = ReactDOM.createRoot(document.getElementById('root'));

//监听错误
window.addEventListener('unhandledrejection',(e)=>{
    console.log(e);
    const {response={},reason={}}=e
    const {code}=reason
    message.error(reason.message||response.data)
    if(code=='102'){
        window.location='/login'
        return
    }
    
})


root.render(
    <ConfigProvider locale={zhCN}>
        <Provider store={store}>
            {routes}
        </Provider>
    </ConfigProvider>
)

