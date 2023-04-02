import React, { useEffect, useState } from 'react'
import { Panel } from '../../../components'
import { Avatar, Button, Card, Form, Input, List, message, Modal, Select, Space, Table } from 'antd'
import { PlusSquareOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'

import { UserOutlined } from '@ant-design/icons';

import ModalForm from './ModalForm'

function Product(props) {
    const [dataSource, setDataSource] = useState([])
    const [pagination, setPagination] = useState({})
    const [filters, setFilters] = useState({})

    const onGetList = (params = {}) => {
        global.service.get('/api/product/list', params).then(res => {
            // setState({ dataSource: res.records, pagination: res.pagination })
            setDataSource(res.records)
            setPagination(res.pagination)
        })
    }

    useEffect(() => {
        onGetList()
    }, [])

    const onSearch = (values) => {
        // setState({ filters: values })//记录过滤条件
        setFilters(values)
        onGetList(values)
    }

    const onAdd = () => {
        //新增弹窗
        return () => {
            props.dispatch({
                type: 'showModalForm',
                data: {
                    title: '新增',   //弹窗标题
                    data: {},         //表单数据
                    reFreshList: onGetList
                }
            })
        }
    }

    const onView = (record) => {
        return () => {
            props.dispatch({
                type: 'showModalForm',
                data: {
                    title: '详情',
                    data: { ...record, attrs: JSON.parse(record.attrs) },
                }
            })
        }
    }
    const onEdit = (record) => {
        return () => {
            props.dispatch({
                type: 'showModalForm',
                data: {
                    title: '编辑',
                    data: { ...record, attrs: JSON.parse(record.attrs) },
                    reFreshList: onGetList
                }
            })
        }
    }


    const onRemove = (record) => {

        return () => {
            if (window.confirm('确认删除吗')) {
                global.service.post('/api/product/delete', { id: record.id })
                    .then((data) => {
                        // console.log(data);
                        message.success(`删除成功`)
                        onGetList()//刷新list
                    })
            }

        }
    }

    const { modalForm } = props.productState;

    //render
    return <Panel title='商品管理'>
        <Card className='m-filter'>
            <Form layout='inline' onFinish={onSearch}>
                <Form.Item label='商品名称' name='name'>
                    <Input />
                </Form.Item>
                <Form.Item label='商品类型' name='type'>
                    <Select style={{ width: 200 }} allowClear>
                        <Select.Option value='0'>图书</Select.Option>
                        <Select.Option value='1'>服装</Select.Option>
                        <Select.Option value='2'>电器</Select.Option>
                        <Select.Option value='3'>家具</Select.Option>
                        <Select.Option value='4'>数码</Select.Option>
                        <Select.Option value='5'>食品</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>搜索</Button>
                </Form.Item>
            </Form>
        </Card>

        <Card>
            <div className='m-operator'>
                <Button type='primary' icon={<PlusSquareOutlined />}
                    onClick={onAdd()}>新增</Button>
            </div>
            {/* <Table {...getTableProps()}/> */}
            <List
                dataSource={dataSource}
                pagination={{
                    ...pagination,
                    showTitle: (total) => (`共${total}条数据`),
                    onChange: (current) => {
                        return onGetList({ ...filters, current })
                    }
                }}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <a onClick={onView(item)}>查看</a>,
                            <a onClick={onEdit(item)}>编辑</a>,
                            <a onClick={onRemove(item)}>删除</a>
                        ]}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.mainPic} />}
                            title={item.name}
                            description={[`图书`, `服装`, `电器`, `家具`, `数码`, `图书`, `食品`][item.type]}
                        />
                        <Space>
                            {item.price ? <span style={{ color: 'red' }}>
                                {`￥${item.price}`}
                            </span> : null}

                            <span>{JSON.parse(item.attrs).map(attr =>
                                <> <Space style={{ color: '#aaa', fontSize: '12px' }}>{attr.key + ':'}</Space>
                                    <Space>{attr.value}</Space>
                                </>
                            )}
                            </span>
                        </Space>
                    </List.Item>
                )
                }
            ></List>


        </Card>

        {modalForm && <ModalForm {...modalForm} dispatch={props.dispatch}></ModalForm>}


    </Panel >
}


const mapStateToProps = (store) => ({ productState: store.product })
const mapDisPatchToProps = (dispatch) => ({ dispatch: dispatch })
export default connect(mapStateToProps, mapDisPatchToProps)(Product)