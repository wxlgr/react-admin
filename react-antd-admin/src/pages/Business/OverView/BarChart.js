import React, { useEffect } from 'react'
import * as echarts from 'echarts'

function BarChart(props) {
    const ref = React.createRef()
    useEffect(() => {
        const echart = echarts.init(ref.current)
        const options = {
            tooltip: {
                show: true,
            },
            grid: {//直角坐标系
                left: 10,
                bottom: 10,
                top: 20,
                containLabel: true

            },
            yAxis: {

            },
            xAxis: {
                type: 'category',//类目
            },
            series: [
                {
                    name: '销售额',
                    type: 'bar',//柱状图
                    itemStyle: {
                        color: '#73c0de'
                    },
                    label: {
                        show:true,
                        position:"top",
                    },
                }
            ]
        }
        echart.setOption(options)

        //自适应大小
        window.addEventListener('resize', () => {
            echart.resize()
        })

        global.service.get('/api/overview/volumetop10').then(res => {
            echart.setOption({
                dataset: { source: res.records }
            })
        })

    }, [])




    return (
        <div ref={ref} style={{ height: '100%' }}></div>
    )
}

export default BarChart
