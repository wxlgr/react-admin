import React, { Component } from 'react'
import { Modal, Space } from 'antd'
import jwt_decode from 'jwt-decode'
import './index.css'

export default class Header extends Component {
  state = {
    nickName: 'XXX'
  }

  onLogout = () => {

    Modal.confirm({
      content: '确认退出登录吗',
      onCancel: () => {
        return
      },
      onOk: () => {
        sessionStorage.removeItem('token');
        window.location = '/login'
      }
    })

  }
  render() {
    try {
      const { nickName } = jwt_decode(sessionStorage.token)
      this.setState({ nickName })
    } catch (error) {
      this.setState({ nickName: "" })
    }

    return (
      <div className="m-header">
        <Space>
          <span><Space>Hi,{this.state.nickName}</Space></span>
          <a href="javascript:;" onClick={this.onLogout}>退出登录</a>
        </Space>
      </div>
    )
  }
}
