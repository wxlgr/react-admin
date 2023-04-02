
import axios from "axios";
const DoAxios = (url, method, params) => {
    return axios({
        headers:{Authorization:sessionStorage.getItem('token')},
        url,
        method,
        params: method === 'get' ? params : undefined,
        data: method === 'post' ? params : undefined
    }).then(res => {
        // console.log(res);
        if (res.status === 200) {
            const { data } = res
            if (data.code !== '00000') {
                return Promise.reject(res.data)
            }
            return data
        }
    })
}


export default {
    get: (url, params) => {
        return DoAxios(url, 'get', params)
    },
    post: (url, params) => {
        return DoAxios(url, 'post', params)
    }
}