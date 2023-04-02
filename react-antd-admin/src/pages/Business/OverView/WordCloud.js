import React, { useEffect } from 'react'
import * as echarts from 'echarts'
import 'echarts-wordcloud'

export default function WordCloud(props) {
    const ref = React.createRef()
    useEffect(() => {
        const echart = echarts.init(ref.current)
        const options = {
            tooltip: {
                show: true
            },
            series: [
                {
                    type: 'wordCloud',//词云图
                    sizeRange: [12, 48],
                    gridSize: 20,
                    textStyle: {
                        fontWeight: 'bold',
                        fontFamily: 'sans-serif',
                        color: () => `rgb(${[
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                        ].join(',')
                            })`
                    },
                   data:[]

                }
            ]
        }
        echart.setOption(options)

        //自适应大小
        window.addEventListener('resize', () => {
            echart.resize()
        })

        //
        global.service.get('/api/overview/hotwords').then(res => {
            echart.setOption({
                series:[{data:res.records}]
            })
        })

    }, [])

    return (
        <div ref={ref} style={{ height: '100%' }}></div>
    )

}
