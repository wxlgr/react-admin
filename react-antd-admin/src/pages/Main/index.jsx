import React, { Component } from 'react'
import Slide from '../../layout/Slide/Slide';
import Header from '../../layout/Header/Header'

// 引入占位符
import { Outlet } from 'react-router-dom';

export default class Main extends Component {
  state = {
    menus: []
  }


  onRequestMenus = () => {
    global.service.get('/api/main/menuList').then(data => {

      this.setState({
        menus: data.records
      })
    })
  }

  componentDidMount() {
    this.onRequestMenus()
    
    //注册刷新侧边栏菜单的全局事件
    window.addEventListener('refreshMenus', () => {
      this.onRequestMenus()
    })
  }
  render() {
    return (
      <div className='app'>
        <div className="m-slide">
          <Slide menus={this.state.menus} />
        </div>
        <div className="m-content">
          <div className="top">
            <Header />
          </div>
          <div className="content">
            {/* {动态页面} */}
            <Outlet></Outlet>
          </div>

        </div>


      </div>
    )
  }
}
