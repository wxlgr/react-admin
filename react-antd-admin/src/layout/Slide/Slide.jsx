import { Menu } from 'antd';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import icons from '../../components/Icons'

export default class Slide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: this.props.menus || []
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      menus: nextProps.menus
    })

  }


  onRenderMenu = (menus) => {
    return menus.map((item) => {
      if (item.children && item.children.length) {
        return (
          <Menu.SubMenu key={item.id} title={item.name}
            icon={React.createElement(
              (_.find(icons, (icon) => icon.name == item.icon) || {}).renderFn
              || 'span'
            )}>
            {this.onRenderMenu(item.children)}
          </Menu.SubMenu>
        )
      }
      return (
        <Menu.Item key={item.id} icon={React.createElement(
          (_.find(icons, (icon) => icon.name == item.icon) || {}).renderFn
          || 'span'
        )}>
          {/* 打开方式 */}
          {item.openType ==1 ? <Link to={item.linkUrl} >{item.name}</Link>:
            <a onClick={()=>window.open(item.linkUrl)}>{item.name}</a>
          }
        </Menu.Item>
      )
    })

  }

  render() {
    return (
      <Menu theme='dark' mode='inline'>
        {this.onRenderMenu(this.state.menus)}
      </Menu>
    )
  }
}
