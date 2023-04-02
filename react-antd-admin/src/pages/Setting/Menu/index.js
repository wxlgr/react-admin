import React, { Component } from 'react'
import { Button, Card, Table, Space, message, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Panel } from '../../../components'

import { connect } from 'react-redux'
import ModalForm from './ModalForm'

class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: []
        }
    }

    getTableProps = () => {
        return {
            columns: [
                { title: '菜单', dataIndex: 'name' },
                { title: '访问地址', dataIndex: 'linkUrl' },
                {
                    title: '操作',
                    render: (record) => {
                        // console.log("recode", record);
                        return (
                            <Space>
                                <a onClick={this.onView(record)}>查看</a>
                                <a onClick={this.onEdit(record)}>编辑</a>
                                <a onClick={this.onRemove(record)}>删除</a>
                                <a onClick={this.onAdd(record)}>新增</a>
                            </Space>
                        )
                    }
                }
            ],
            dataSource: this.state.dataSource || [],
            rowKey: 'id',
            pagination: false
        }
    }

    onGetList = () => {
        global.service.get('/api/menu/list').then(res => {
            // console.log(res);
            this.setState({
                dataSource: res.records
            })
        })
    }

    componentDidMount() {
        this.onGetList()
    }


    onAdd = (record) => {

        // 新增弹窗
        return () => {
            this.props.dispatch({
                type: 'showModalForm',
                data: {
                    title: '新增',   //弹窗标题
                    data: record ? { pid: record.id } : {},         //表单数据
                    reFreshList: this.onGetList
                }
            })
        }
    }

    onView = (record) => {
        // console.log('详情弹窗',record);
        //详情弹窗
        return () => {
            this.props.dispatch({
                type: 'showModalForm',
                data: {
                    title: '详情',   //弹窗标题
                    data: record ? record : {}//表单数据
                }
            })

        }
    }

    onEdit = (record) => {
        // console.log('编辑弹窗',record);
        //编辑弹窗
        return () => {
            this.props.dispatch({
                type: 'showModalForm',
                data: {
                    title: '编辑',   //弹窗标题
                    data: record ? record : {},//表单数据
                    reFreshList: this.onGetList
                }
            })
        }
    }

    onRemove = (record) => {
        return () => {
            if (window.confirm('确认删除吗')) {
                global.service.post('/api/menu/delete', { id: record.id })
                    .then((data) => {
                        message.success(`删除成功`)
                        this.onGetList()//刷新list
                        //侧边栏更新
                        window.dispatchEvent(new Event('refreshMenus'))
                    })
            }

        }
    }


    render() {
        const { modalForm } = this.props.menuState;
        return (
            <Panel title='菜单管理'>
                <div className="m-operator">
                    <Button type='primary' icon={<PlusOutlined />} onClick={this.onAdd()}>新增</Button>
                </div>
                <Card>
                    <Table {...this.getTableProps()} />
                </Card>

                {/* 控制弹窗 */}
                {modalForm && <ModalForm {...modalForm} {...this.props}></ModalForm>}
            </Panel>
        )

    }
}

const mapStateToProps = (store) => ({ menuState: store.menu })
const mapDispatchToProps = (dispatch) => ({ dispatch: dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
