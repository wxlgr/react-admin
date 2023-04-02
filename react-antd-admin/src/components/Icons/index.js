import  * as icons from '@ant-design/icons'
import _ from 'lodash'

//获取所有图标
function getAllIcons(){
    const allIcons=[]
    _.mapValues(icons,(value,key)=>{
        if(typeof value ==='object'&&key!='default'){
            allIcons.push({
                name:key,
                renderFn:value
            })
        }
    })
    return allIcons
}
export default getAllIcons()