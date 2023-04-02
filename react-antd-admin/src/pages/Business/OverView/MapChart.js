import React, { useEffect, useState } from 'react'
import * as echarts from 'echarts'
import chinaJson from '../../../assets/geoJson/china.json'

function MapChart(props) {
    const ref = React.createRef()
    useEffect(() => {

        echarts.registerMap('china', chinaJson)
        const echart = echarts.init(ref.current)
        const options = {
            visualMap: {
                show: false,
                dimension: 'value',
                min: 1000,
                max: 10000,
                inRange: {
                    color: ['#ffd768', '#7f1100'],
                    symbolSize: [8, 16]
                },
                outOfRange: {
                    color: 'red'
                }
            },
            geo: {
                show: true,
                map: 'china',
                zoom: 1.6,
                top: 100,
                itemStyle: {
                    areaColor: '#84bada',
                    borderColor: '#fff',
                    borderWidth: 0.5
                },
                emphassis: {//高亮
                    itemStyle: {
                        areaColor: '#84bada',
                        opacity: 0.6
                    },
                }

            },
            tooltip: { show: true },

            series: [
                {
                    type: 'scatter',//散点
                    coordinateSystem: 'geo',
                    encode: {
                        //数据到视觉的映射
                        lng: 'lng',
                        lat: 'lat',
                        tooltip: ['name', 'value']

                    }
                }
            ]
        }
        echart.setOption(options)

        //自适应大小
        window.addEventListener('resize', () =>  {
            echart.resize()
        })

        global.service.get('/api/overview/mapsales').then(res => {
            echart.setOption({
                dataset: {//维度
                    dimensions: ['name', 'lng', 'lat', 'value'],
                    source: res.records
                }
            })
        })

    }, [])




    return (
        <div ref={ref} style={{ height: '100%' }}></div>
    )
}

export default MapChart
