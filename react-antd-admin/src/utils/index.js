// import _ from 'lodash'

// 数字三位加一逗号
const numToThousand = (num = 10020) => {//10020

    return num.toString().replace(/\d{1,3}(?=(\d{3})+$)/g,function(s){
        return s+','
    }) 
}
export default numToThousand