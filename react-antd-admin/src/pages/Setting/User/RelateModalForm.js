import React, { Component } from 'react'
import { message, Modal, Table } from 'antd'


export default class RelateModalForm extends Component {
    state = {
        dataSource: [],
        selectedKeys:[]
    }


    componentDidMount(){
        global.service.get(`/api/user/relateMenus`).then(res=>{
            // console.log(res);
            this.setState({dataSource:res.records})
        })
    }


    // 取消
    onCancel = () => {
        this.props.dispatch({
            type: 'hideRelateModalForm'
        })
    }
    // 确定
    onSave = () => {
        global.service.post('/api/user/updateRelatedMenus',{
            relatedMenus:this.state.selectedKeys.join(','),
            id:this.props.data.id
        }).then(res=>{
            message.success("配置成功");
            // 关闭弹窗
            this.onCancel();

            this.props.reFreshList();

        })

    }
    getTableProps = () => ({
        rowKey:'id',
        columns: [
            {
                title: `菜单`,
                dataIndex: `name`
            },
            {
                title: `访问路径`,
                dataIndex: `linkUrl`
            },
        ],
        dataSource: this.state.dataSource,
        pagination: false,//不分页
        rowSelection:{
            // 已配置的菜单默认选上，map(item=>item<<0)转为数字
            defaultSelectedRowKeys:this.props.data.relatedMenus?this.props.data.relatedMenus.split(',').map(item=>item<<0):[],
            checkStrictly:false,
            onChange:(selectedRowKeys)=>{
                this.setState({selectedKeys:selectedRowKeys})
            }
        }

    })

    render() {
        console.log(this.props);
        return <Modal width={600} visible
            title={this.props.title}
            onCancel={this.onCancel}
            onOk={this.onSave}
        >
            <Table {...this.getTableProps()}/>
        </Modal>
    }
}
