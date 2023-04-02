import React, { useEffect } from 'react'
import * as echarts from 'echarts'

export default function (props) {
    const ref = React.createRef()
    useEffect(() => {
        const echart = echarts.init(ref.current)
        const options = {
            tooltip: {
                show: true,
                trigger: 'axis'
            },
            grid: {//直角坐标系
                left: 10,
                bottom: 10,
                top: 40,
                containLabel: true

            },
            yAxis: [
                { name: '成交量' },
                { name: '成交额' },
            ],
            xAxis: {
                type: 'category',//类目
            },
            series: [
                {
                    name: '成交量',
                    type: 'line',//折线图
                    smooth: true,//折线平滑
                    showSymbol:false,//不显示关键点
                    itemStyle: {
                        color: '#73c0de'
                    },

                },
                {
                    name: '成交额',
                    type: 'line',//折线图
                    smooth: true,//折线平滑
                    showSymbol:false,//不显示关键点
                    itemStyle: {
                        color: 'red'
                    },
                    yAxisIndex: 1,
                    datasetIndex:1
                },
            ]
        }
        echart.setOption(options)

        //自适应大小
        window.addEventListener('resize', () => {
            echart.resize()
        })

        //
        Promise.all([
            global.service.get('/api/overview/salestrend', { type: 1 }),
            global.service.get('/api/overview/salestrend', { type: 2 })
        ]).then(res => {
            echart.setOption({
                dataset: [
                    { source: res[0].records },
                    { source: res[1].records }
                ]
            })
        })

    }, [])




    return (
        <div ref={ref} style={{ height: '100%' }}></div>
    )
}


