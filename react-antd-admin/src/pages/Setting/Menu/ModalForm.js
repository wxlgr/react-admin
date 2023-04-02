
import React, { Component } from 'react'
import { Modal, Form, Input, Select, Radio, Dropdown, Space, Pagination, message } from 'antd'
import _ from 'lodash'

// 图标组件库
import { icons } from '../../../components'

export default class ModalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allIcons: icons,
      currentIcons: icons.slice(0, 10),
      pName: '',
      icon: ''//输入框icon
    }
  }

  formRef = React.createRef()


  componentDidMount() {

    // console.log('componentDidMount', this.props);
    const { data } = this.props

    //设置表单数据
    this.formRef.current.setFieldsValue(data)
    //icon
    this.setState({
      icon: data.icon
    })

    //根据pid获取父级菜单名称
    data.pid && data.pid != -1 && global.service.get('/api/menu/getMenuName', { id: data.pid })
      .then(res => {
        // console.log(res);
        this.setState({
          pName: res.record.name
        })
      })
  }

  //表单布局
  layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
  }

  onCancel = () => {
    this.props.dispatch({
      type: "hideModalForm"
    })
  }
  //点确定触发提交
  onOk = () => {
    this.formRef.current.submit();
  }

  // 提交
  onSave = (values) => {
    // console.log(this.props);
    const { title } = this.props
    if (title == '新增') {
      global.service.post('/api/menu/add', { ...values, pid: this.props.data.pid || -1 })
        .then((data) => {
          message.success(`${title}成功`)
          this.onCancel()//关闭弹窗
          // console.log(this.props);
          this.props.reFreshList()//刷新list

          //侧边栏更新
          window.dispatchEvent(new Event('refreshMenus'))
        })
        return
    }

    //编辑提交
    global.service.post('/api/menu/update', { ...values,id:this.props.data.id})
        .then((data) => {
          // console.log(data);
          message.success(`${title}成功`)
          this.onCancel()//关闭弹窗
          // console.log(this.props);
          this.props.reFreshList()//刷新list

          //侧边栏更新
          window.dispatchEvent(new Event('refreshMenus'))
        })


  }



  //输入框输入过滤名称
  onIconFilter = (e) => {
    const value = _.trim(e.target.value)
    //存放过滤后图标
    const newIcons = []
    if (value) {
      icons.map(item => {
        if (_.lowerCase(item.name).indexOf(_.lowerCase(value)) !== -1) {
          newIcons.push(item)
        }
      })
      this.setState({ icon: value, allIcons: newIcons, currentIcons: newIcons.slice(0, 10) })
      return
    }
    //无值时初始化
    this.setState({ icon: value, allIcons: icons, currentIcons: icons.slice(0, 10) })

  }

  onIconChange = (e) => {
    const { value } = e.target
    this.setState({
      icon: value
    })

    //手动设置
    this.formRef.current.setFieldsValue({ icon: value })

  }




  render() {
    // console.log('render',this.props);
    const { title } = this.props
    let readOnly = title == '详情' ? true : false

    return (
      <div>
        <Modal visible width={"600px"} title={title}
          onCancel={this.onCancel}
          onOk={this.onOk}
          className={readOnly ? "m-readonly-modal" : ""}>
          <Form {...this.layout} ref={this.formRef}
            onFinish={this.onSave}
          >

            <Form.Item label='父菜单'>
              {this.state.pName || '无'}
            </Form.Item>
            <Form.Item label='菜单名称' name='name' rules={[{ required: true, message: "请输入菜单名称" }]}>
              <Input />
            </Form.Item>
            <Form.Item label='访问路径' name='linkUrl' rules={[{ required: true, message: "请输入访问路径" }]}>
              <Input />
            </Form.Item>
            <Form.Item label='打开方式' name='openType' rules={[{ required: true, message: "请输入打开方式" }]}>
              <Select>
                <Select.Option value='1'>当前窗口</Select.Option>
                <Select.Option value='2'>新窗口</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label='图标' name='icon' rules={[{ required: true, message: "请输入图标" }]}>

              <Dropdown trigger={['click']}
                placement='bottomCenter'
                overlayStyle={{ backgroundColor: '#bfa', padding: 10 }}
                overlay={
                  <>
                    <Radio.Group onChange={this.onIconChange}>
                      <Space direction='vertical'>
                        {
                          this.state.currentIcons.map(item => {
                            return <Radio value={item.name}>
                              {React.createElement(item.renderFn)}
                              <span style={{ margin: 5 }}>{item.name}</span>
                            </Radio>
                          })
                        }
                      </Space>

                    </Radio.Group>
                    <div style={{ textAlign: 'right', padding: 10 }}>
                      <Pagination showSizeChanger={false} size='small'
                        total={this.state.allIcons.length}
                        onChange={(page, pageSize) => {
                          this.setState({
                            currentIcons: this.state.allIcons.slice(pageSize * (page - 1), pageSize * page)
                          })
                        }}>

                      </Pagination>
                    </div>
                  </>
                }>

                {/* prefix前缀 */}
                <Input prefix={React.createElement(
                  (_.find(this.state.allIcons, (item) => item.name == this.state.icon) || {}).renderFn
                  || 'span'
                )
                }
                  onChange={this.onIconFilter} value={this.state.icon} />
              </Dropdown>

            </Form.Item>
            <Form.Item label='权限' name='isOfAdmin' rules={[{ required: true, message: "请输入权限" }]}>
              <Radio.Group>
                <Radio value='1'>仅超管可见</Radio>
                <Radio value='2'>不限</Radio>
              </Radio.Group>
            </Form.Item>

          </Form>
        </Modal>
      </div>
    )
  }
}
