import React, { Component } from 'react'
import { Cascader } from 'antd'
import _ from 'lodash'

export default class index extends Component {
    state = {
        options: [],
        defaultValue: this.props.defaultValue
    }
    componentDidMount() {
        global.service.get('/api/area/province').then(data => {
            const { records } = data
            records.map(item => item.isLeaf = false)
            // console.log(records);
            this.setState({
                options: records
            })

            //查看详情时
            const { defaultValue } = this.state
            if (defaultValue && defaultValue.length) {
                const province = _.find(records, (item) => item.value == defaultValue[0] || {})
                this.onRequestCityOrRegion(province)//市
                    .then(data => {
                        const city = _.find(data, (item) => item.value == defaultValue[1] || {})
                        this.onRequestCityOrRegion(city)
                    })
            }
        })
    }

    onRequestCityOrRegion = (parent) => {
        // console.log(parent);
        const isLeaf = String(parent.id).length == 2 ? true : false
        return global.service.get(`/api/area/${isLeaf ? 'region' : 'city'}`, { pid: parent.id }).then(data => {
            const { records } = data
            records.map(item => item.isLeaf = isLeaf)
            parent.children = records
            this.setState({
                options: [...this.state.options]
            })
            return data.records
        })
    }

    loadData = (selectedOptions = []) => {
        const selectedOption = selectedOptions[selectedOptions.length - 1]
        // console.log(selectedOption);
        this.onRequestCityOrRegion(selectedOption)
    }

    render() {
        return <Cascader placeholder='省/市/区'
            options={this.state.options || this.state.defaultValue}
            loadData={this.loadData}
            onChange={this.props.onChange} 
            defaultValue={this.state.defaultValue}/>
    }
}
