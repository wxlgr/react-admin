
import React, { Component } from 'react'

// 富文本编辑器
import wangeditor from 'wangeditor'

export default class index extends Component {
    ref = React.createRef()
    componentDidMount(){
        const editor=new wangeditor(this.ref.current)//父容器
        editor.config.excludeMenus=['emotion','video','image']
        editor.config.showLinkImg=false//不可上传网图
        editor.config.onchange=(html)=>{
            this.props.onChange&& this.props.onChange(html)
        }
    
        editor.create()
        this.props.defaultValue&&editor.txt.html(this.props.defaultValue)
    }
    render() {
        return (
            <div ref={this.ref}>
            </div>
        )
    }
}
