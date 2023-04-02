import React, { useEffect } from 'react'
import * as echarts from 'echarts'

function TopChart(props) {
    const ref = React.createRef()
    useEffect(() => {
        const echart = echarts.init(ref.current)
        const options = {
            tooltip:{show:true},
            grid:{//直角坐标系
                left:10,
                bottom:10,
                top:10,
                containLabel:true

            },
            yAxis:{
                type:'category',//类目
                axisTick:{show:false},//刻度
                axisLine:{show:false},
                inverse: true,//由大到小
            },
            xAxis:{
                // splitLine:{show:false}
            },
            series: [
                {
                    name:'销售量',
                    type: 'bar',//柱状图
                    itemStyle:{
                        color:'#73c0de'
                    },
                    label: {
                        show:true,
                        position:"right",
                    },
                }
            ]
        }
        echart.setOption(options)

        //自适应大小
        window.addEventListener('resize', () => {
            echart.resize()
        })

        global.service.get('/api/overview/salestop10').then(res=>{
            echart.setOption({
                dataset:{source:res.records}
            })
        })

    }, [])




    return (
        <div ref={ref} style={{height:'100%'}}></div>
    )
}

export default TopChart
