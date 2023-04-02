const initState = {
    modalForm: null,
    relateModalForm: null//关联菜单的弹窗控制
}

export default function(state = initState, action){
    const { type, data } = action;
    switch (type) {
        case 'showModalForm':
            return { ...state, modalForm: data }
        case 'hideModalForm':
            return { ...state, modalForm: null }
        case 'showRelateModalForm':
            return { ...state, relateModalForm: data }
        case 'hideRelateModalForm':
            return { ...state, relateModalForm: null }
        default:
            return state;
    }
}