import React, { Component } from 'react'
import {Navigate} from 'react-router-dom'
import { Button, Form, Input, message} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import CryptoJs from 'crypto-js'
import './style/index.css'

export default class Login extends Component {
    state={
        logined:false
    }
    onLogin = (values) => {
        // 加密重写password属性,'12345678'签名
        const password = CryptoJs.AES.encrypt(values.password, '12345678').toString()
        global.service.post('/api/login', { ...values, password }).then(res => {
            // console.log(res);
            if(res.code='00000'){
                this.setState({logined:true})
                message.success(res.message)

                sessionStorage.setItem('account',values.account)
                sessionStorage.setItem('token',res.token)
            }else{
                message.error(res.message)
            }
        })
    }
    render() {
        return (
            <div className='m-login'>
                <Form onFinish={this.onLogin}>
                    <h4>欢迎登录</h4>
                    <Form.Item name='account' rules={[{ required: true, message: `账号不能为空` }]}>
                        <Input prefix={<UserOutlined />} placeholder='请输入账号' />
                    </Form.Item>
                    <Form.Item name='password' rules={[{ required: true, message: `密码不能为空` }]}>
                        <Input type={'password'} prefix={<LockOutlined />} placeholder='请输入密码' />
                    </Form.Item>
                    <Form.Item>
                        <Button block type='primary' htmlType='submit'>登录</Button>
                    </Form.Item>
                </Form>
                {/* 登陆成功，跳至首页 */}
                {this.state.logined&&<Navigate to='/'/>}
            </div>
        )
    }
}
