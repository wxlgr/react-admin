import React, { useEffect, useState } from 'react'
import { Panel } from '../../../components'
import { Row, Col, Card } from 'antd'
import { MoneyCollectOutlined, FileDoneOutlined, FundViewOutlined, StarOutlined } from '@ant-design/icons'
import numToThousand from '../../../utils'
import PieChart from './PieChart'
import MapChart from './MapChart'
import TopChart from './TopChart'
import BarChart from './BarChart'
import LineChart from './LineChart'
import WordCloud from './WordCloud'
import './style/index.css'
export default function OverView() {

    const [statistic, setStatistic] = useState({})

    useEffect(() => {
        global.service.get('/api/overview/statistic').then((res) => {
            setStatistic(res.record)
        })
    }, [])


    //render
    const { totalTurnover, turnoverGrowth, totalQuantity, quantityGrowth, totalVisited, visitedGrowth, totalStars, starGrowth } = statistic
    return (<Panel title='业务概览'>
        <div className='m-overview'>
            <Row gutter={10}>
                <Col span={6}>
                    <Card>
                        <div className='header'>
                            <div className='content'>
                                <span>总销售量（个）</span>
                                <span className='count'>{numToThousand(totalTurnover)}</span>
                            </div>
                            <div className='icon'>
                                <MoneyCollectOutlined />
                            </div>
                        </div>

                        <div className='footer'>
                            同比增长：{turnoverGrowth}
                        </div>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <div className='header'>
                            <div className='content'>
                                <span>总访问量（个）</span>
                                <span className='count'>{numToThousand(totalQuantity)}</span>
                            </div>
                            <div className='icon' style={{ backgroundColor: 'rgba(110,169,191,0.68)' }}>
                                <FileDoneOutlined />
                            </div>
                        </div>

                        <div className='footer'>
                            同比增长：{quantityGrowth}
                        </div>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <div className='header'>
                            <div className='content'>
                                <span>总收藏量（个）</span>
                                <span className='count'>{numToThousand(totalVisited)}</span>
                            </div>
                            <div className='icon' style={{ backgroundColor: 'rgba(179,165,99,0.68)' }}>
                                < FundViewOutlined />
                            </div>
                        </div>

                        <div className='footer'>
                            同比增长：{visitedGrowth}
                        </div>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <div className='header'>
                            <div className='content'>
                                <span>总销售额（元）</span>
                                <span className='count'>{numToThousand(totalStars)}</span>
                            </div>
                            <div className='icon' style={{ backgroundColor: 'rgba(88,96,154,0.68)' }}>
                                <StarOutlined spin />
                            </div>
                        </div>

                        <div className='footer'>
                            同比增长：{starGrowth}
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row gutter={10} style={{ marginTop: 10 }}>
                <Col span={7}>
                    <Card className='chart-card' title='不同类型商品销售额占比'>
                        <PieChart />
                    </Card>

                </Col>
                <Col span={10}>
                    <Card className='chart-card' title='全国销售量分布'>
                        <MapChart />
                    </Card>

                </Col>
                <Col span={7}>
                    <Card className='chart-card' title='销售量排名 TOP 10'>
                        <TopChart />
                    </Card>
                </Col>

            </Row>
            <Row gutter={10} style={{ marginTop: 10 }}>
                <Col span={7}>
                    <Card className='chart-card' title='销售额排名 TOP 10'>
                        <BarChart />
                    </Card>

                </Col>
                <Col span={10}>
                    <Card className='chart-card' title='销售额增长趋势'>
                        <LineChart />
                    </Card>

                </Col>
                <Col span={7}>
                    <Card className='chart-card' title='热搜词'>
                        <WordCloud />
                    </Card>
                </Col>

            </Row>

        </div>

    </Panel>)
}
