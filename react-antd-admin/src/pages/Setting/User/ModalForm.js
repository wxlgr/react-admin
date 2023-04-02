import { Form, Input, message, Modal } from 'antd'
import React, { Component } from 'react'
import { AreaCascader, MyUpload } from '../../../components'

export default class ModalForm extends Component {

    formRef = React.createRef()

    formLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
    }

    componentDidMount() {
        const { data } = this.props
        this.formRef.current.setFieldsValue({ ...data});
    }

    onCancel = () => {
        this.props.dispatch({
            type: "hideModalForm"
        })
    }
    onSubmit = () => {
        this.formRef.current.submit()
    }


    onSave = (values) => {
        // console.log(values);
        if(this.props.title=='新增'){
            global.service.post('/api/user/add', { ...values, area: values.area.join(',') }).then(res => {
                console.log(res);
                message.success("新增成功")
            })
        }else{
            global.service.post('/api/user/update', { ...values, area: values.area.join(','),id:this.props.data.id }).then(res => {
                console.log(res);
                message.success("修改成功")
            })
        }

        this.onCancel()//关闭弹窗
        // 刷新列表
        this.props.reFreshList()

       
    }

    onAreaChange = (value) => {
        // console.log(value);
    }

    onPicChange = (url) => {
        console.log(url);
    }

    render() {
        const { data } = this.props
        const readOnly = this.props.title == '详情' ? true : false
        return <Modal visible width={600} title={this.props.title}
            onCancel={this.onCancel}
            onOk={this.onSubmit}
            className={readOnly ? 'm-readonly-modal' : ''}
        >
            <Form {...this.formLayout}
                ref={this.formRef}
                onFinish={this.onSave}
            >
                <Form.Item label='用户名' name='name' rules={[{ required: true, message: "请填写" }]}>
                    <Input />
                </Form.Item>
                <Form.Item label='账号' name='account' rules={[{ required: true, message: "请填写" }]}>
                    <Input />
                </Form.Item>
                <Form.Item label='所在地区' name='area' rules={[{ required: true, message: "请填写" }]}>
                    <AreaCascader onChange={this.onAreaChange} 
                    defaultValue={data.area}/>
                </Form.Item>
                <Form.Item label='联系方式' name='tel'
                    rules={[
                        { required: true, message: "请填写" },
                        {
                            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
                            message: "手机号格式不正确"

                        }
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item label='邮箱' name='email'
                    rules={[
                        { required: true, message: "请填写" },
                        {
                            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                            message: '邮箱格式不正确'

                        }
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item label='上传头像' name='pic'>
                    <MyUpload onChange={this.onPicChange}
                    readOnly={readOnly}
                        defaultFileList={data.pic?data.pic.split(','):[]} />
                </Form.Item>
            </Form>
        </Modal>
    }
}
