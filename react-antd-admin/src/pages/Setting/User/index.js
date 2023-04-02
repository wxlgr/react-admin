import React from 'react'
import { Panel } from '../../../components'
import { Avatar, Button, Card, Form, Input, message, Modal, Space, Table } from 'antd'
import { PlusSquareOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'

import { UserOutlined } from '@ant-design/icons';

import ModalForm from './ModalForm'
import RelateModalForm from './RelateModalForm'

class User extends React.Component {
    state = {
        dataSource: [],
        pagination: {},
        filters: {}
    }
    onGetList = (params = {}) => {
        global.service.get('/api/user/list', params).then(res => {
            // console.log(res);
            this.setState({ dataSource: res.records, pagination: res.pagination })
        })
    }
    componentDidMount() {
        this.onGetList()
    }

    onSearch = (values) => {
        console.log(values);
        this.setState({ filters: values })//记录过滤条件
        this.onGetList(values)
    }

    onAdd = () => {
        //新增弹窗
        return () => {
            this.props.dispatch({
                type: 'showModalForm',
                data: {
                    title: '新增',   //弹窗标题
                    data: {},         //表单数据
                    reFreshList: this.onGetList
                }
            })
        }
    }

    onView = (record) => {
        return () => {
            this.props.dispatch({
                type: 'showModalForm',
                data: {
                    title: '详情',
                    data: { ...record, area: record.area.split(',') },
                }
            })
        }
    }
    onEdit = (record) => {
        return () => {
            this.props.dispatch({
                type: 'showModalForm',
                data: {
                    title: '编辑',
                    data: { ...record, area: record.area.split(',') },
                    reFreshList: this.onGetList
                }
            })
        }
    }


    onRemove = (record) => {
      
        return () => {
            if (window.confirm('确认删除吗')) {
                global.service.post('/api/user/delete', { id: record.id })
                .then((data) => {
                    // console.log(data);
                    message.success(`删除成功`)
                    this.onGetList()//刷新list
                    //侧边栏更新
                    window.dispatchEvent(new Event('refreshMenus'))
                })
            }
       
        }
    }

    //关联菜单
    onRelateMenu=(record)=>{
        return () => {
            this.props.dispatch({
                type: 'showRelateModalForm',
                data: {
                    title: '关联菜单',
                    data: { ...record, area: record.area.split(',') },
                    reFreshList: this.onGetList
                }
            })
        }
    }


    //表头
    getTableProps = () => ({
        onChange: (pagination) => {
            const { current, pageSize } = pagination
            this.onGetList({ current, pageSize, ...this.state.filters })
        },
        // 分页器
        pagination: {
            ...this.state.pagination,
            showTotal: (total) => `共${total}条数据`
        },
        columns: [
            {
                title: "用户名",
                dataIndex: 'name',
                render: (text, record) => {


                    return <Space>
                        {record.pic ?
                            <Avatar src={record.pic} /> :
                            <Avatar icon={<UserOutlined />} />
                        }
                        {text}
                    </Space>
                }
            },
            {
                title: "账号",
                dataIndex: 'account'
            },
            {
                title: "联系方式",
                dataIndex: 'tel'
            },
            {
                title: "邮箱",
                dataIndex: 'email'
            },
            {
                title: "操作",
                render: (record) => {
                    return <Space>
                        <a onClick={this.onView(record)}>查看</a>
                        <a onClick={this.onEdit(record)}>编辑</a>
                        <a onClick={this.onRemove(record)}>删除</a>
                        <a onClick={this.onRelateMenu(record)}>关联菜单</a>
                    </Space>
                }
            }
        ],

        dataSource: this.state.dataSource
    })


    render() {
        const { modalForm,relateModalForm} = this.props.userState;

        // console.log('用户管理', this.props);
        return <Panel title='用户管理'>
            <Card className='m-filter'>
                <Form layout='inline' onFinish={this.onSearch}>
                    <Form.Item label='用户名' name='name'>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>搜索</Button>
                    </Form.Item>
                </Form>
            </Card>

            <Card>
                <div className='m-operator'>
                    <Button type='primary' icon={<PlusSquareOutlined />}
                        onClick={this.onAdd()}>新增</Button>
                </div>
                <Table {...this.getTableProps()}>

                </Table>
            </Card>

            {/* 用户信息弹窗 */}
            {modalForm && <ModalForm {...modalForm} dispatch={this.props.dispatch}></ModalForm>}

            {/* 用户关联菜单弹窗 */}
            {relateModalForm && <RelateModalForm {...relateModalForm} dispatch={this.props.dispatch}></RelateModalForm>}

        </Panel>
    }
}

const mapStateToProps = (store) => ({ userState: store.user })
const mapDisPatchToProps = (dispatch) => ({ dispatch: dispatch })
export default connect(mapStateToProps, mapDisPatchToProps)(User)