import React, { useEffect, useState } from 'react'
import * as echarts from 'echarts'

function PieChart(props) {
    const ref = React.createRef()
    useEffect(() => {
        const echart = echarts.init(ref.current)
        const options = {
            tooltip:{show:true},
            series: [
                {
                    type: 'pie',
                    radius: '50%',
                    label: {
                        formatter: '{b}:{d}%' //b:数据名，d：数据值
                    },
                    data: [
                        { name: '图书', value: 100 },
                        { name: '数码', value: 50 },
                    ]
                }
            ]
        }
        echart.setOption(options)

        //自适应大小
        window.addEventListener('resize', () => {
            echart.resize()
        })

        global.service.get('/api/overview/producttypesales').then(res=>{
            echart.setOption({
                series:{data:res.records}
            })
        })

    }, [])




    return (
        <div ref={ref} style={{height:'100%'}}></div>
    )
}

export default PieChart
