import React from "react";
import { message, Modal, Space, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { remove } from "lodash";

export default class extends React.Component {
    fileUrlList = []//存放路径
    state = {
        defaultFileList: this.props.defaultFileList.map((item, index) => {
            this.fileUrlList.push(item)
            return { uid: index, url: item }
        }) || [], 
        preViewModal: null
    }


    render() {
        const uploadProps = {
            headers: { Authorization: sessionStorage.token },
            action: '/api/upload',
            listType: 'picture-card',
            maxCount: this.props.maxCount || 1,
            defaultFileList: this.state.defaultFileList,
            onChange: (info) => {
                const { file, fileList } = info
                const { response } = file
                if (file.status == 'done') {
                    this.fileUrlList = []
                    //保存路径
                    fileList.map(item => {
                        this.fileUrlList.push(item.url || item.response.file.url)
                    })
                    this.props.onChange && this.props.onChange(this.fileUrlList.join(','))
                } else if (file.status == 'error') {
                    message.error('上传失败')
                }
            },
            onRemove: (file) => {
                //删除
                remove(this.fileUrlList, (item) => (file.url || file.response.file.url) == item)
                this.props.onChange && this.props.onChange(this.fileUrlList.join(','))
            },
            onPreview: (file) => {
                this.setState({
                    preViewModal: {
                        url: file.url || file.response.file.url
                    }
                })

            }
        }

        return <>
     
            <Upload {...uploadProps} style={{visibility:!this.props.readOnly,backgroundColor:'red'}}>
                <Space direction="vertical">
                    <PlusOutlined style={{ fontSize: '32px', color: '#08c' }} />
                    <div>
                        上传
                    </div>
                </Space>
            </Upload>

            {this.state.preViewModal &&
                <Modal title='预览'
                    onCancel={() => this.setState({ preViewModal: null })}
                    footer={null}
                    visible
                >
                    <img src={this.state.preViewModal.url} style={{ width: "100%", height: 500 }}></img>
                </Modal>
            }
        </>
    }
}