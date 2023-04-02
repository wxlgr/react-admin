import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, message, Modal, Radio, Select, Space } from 'antd'
import React, { useState, Component, useEffect } from 'react'
import { MyUpload, Editor } from '../../../components'

export default function ModalForm(props) {

    const [form] = Form.useForm()

    const formLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
    }


    useEffect(() => {
        form.setFieldsValue({ ...props.data });
    }, [])



    const onCancel = () => {
        props.dispatch({
            type: "hideModalForm"
        })
    }
    const onSubmit = () => {
        form.current.submit()
    }


    const onSave = (values) => {
        if (props.title == '新增') {
            global.service.post('/api/product/add', { ...values, attrs: JSON.stringify(values.attrs) }).then(res => {
                message.success("新增成功")
            })
        } else {
            global.service.post('/api/product/update', { ...values, attrs: JSON.stringify(values.attrs), id: props.data.id }).then(res => {
                message.success("修改成功")
            })
        }
        onCancel()//关闭弹窗
        // 刷新列表
        props.reFreshList()


    }

    const onMainPicChange = (url) => {
        console.log(url);
    }
    const onMorePicChange = (url) => {
        console.log(url);
    }

    const onDescChange = (html) => {
        form.current.setFieldsValue({ desc: html })
    }


    //render
    const { data } = props
    const readOnly = props.title == '详情' ? true : false

    return <Modal visible width={600} title={props.title}
        onCancel={onCancel}
        onOk={onSubmit}
        className={readOnly ? 'm-readonly-modal' : ''}
    >
        <Form {...formLayout}
            ref={form}
            onFinish={onSave}
        >
            <Form.Item label='商品名称' name='name' rules={[{ required: true, message: "请填写" }]}>
                <Input />
            </Form.Item>
            <Form.Item label='所属类型' name='type' rules={[{ required: true, message: "请填写" }]}>
                <Select style={{ width: 200 }} allowClear>
                    <Select.Option value='0'>图书</Select.Option>
                    <Select.Option value='1'>服装</Select.Option>
                    <Select.Option value='2'>电器</Select.Option>
                    <Select.Option value='3'>家具</Select.Option>
                    <Select.Option value='4'>数码</Select.Option>
                    <Select.Option value='5'>食品</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item label='属性' name='attrs' required>
                <Form.List name='attrs' rules={[{ required: true, message: "请填写" }]}>
                    {(fields, { add, remove }, { errors }) => {
                        return <>
                            {fields.map(({ name }) => {
                                return <Space align='baseline'>
                                    <Form.Item name={[name, 'key']} rules={[{ required: true, message: "请填写" }]}>
                                        <Input placeholder='颜色/大小/版本' />
                                    </Form.Item>
                                    <Form.Item name={[name, 'value']} rules={[{ required: true, message: "请填写" }]}>
                                        <Input placeholder='属性值' />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            })}
                            <Form.Item>
                                <Button type='dashed' block
                                    icon={<PlusOutlined />}
                                    onClick={() => add()}
                                >添加属性</Button>
                            </Form.Item>
                            <Form.ErrorList errors={errors} />
                        </>
                    }}
                </Form.List>
            </Form.Item>

            <Form.Item label='商品主图' name='mainPic'>
                <MyUpload onChange={onMainPicChange}
                    readOnly={readOnly}
                    defaultFileList={data.mainPic ? data.mainPic.split(',') : []} />
            </Form.Item>

            <Form.Item label='商品详情图' name='morePic'>
                <MyUpload onChange={onMorePicChange}
                    readOnly={readOnly}
                    maxCount={5}
                    defaultFileList={data.morePic ? data.morePic.split(',') : []} />
            </Form.Item>

            <Form.Item label='上架' name='isOnShelf' required rules={[{ required: true, message: "请填写" }]}>
                <Radio.Group>
                    <Radio value='1'>是</Radio>
                    <Radio value='0'>否</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item label='价格' name='price'
                rules={[{
                    validator: (rule, value) => {
                        const isOnShelf = form.current.getFieldValue('isOnShelf')
                        if (isOnShelf == '1' && !value) {//上架又无价格填写
                            return Promise.reject(new Error('请输入价格'))
                        }
                        return Promise.resolve()
                    }
                }]}>
                <InputNumber />
            </Form.Item>

            <Form.Item label='商品详情' name='desc'
                rules={[{
                    required: true
                }]}>
                {readOnly ? <div dangerouslySetInnerHTML={{ __html: data.desc }}></div>
                    : <Editor onChange={onDescChange} defaultValue={data.desc} />}
            </Form.Item>

        </Form>
    </Modal>
}

