import React, { useEffect, useState, Fragment } from 'react'
import { Row, Col, Slider, Card } from 'antd';
import { connect } from 'react-redux';
var _ = require('lodash');

export const DayList = ({ forecast = {} }) => {
    const { city = '', days = {} } = forecast;

    if (!city)
        return null

    return (
        <Fragment>
            <h2 style={{ textAlign: "center", marginTop: 10 }}>{city}</h2>
            <Row style={{ marginTop: 50 }}>
                {Object.keys(days).map((key, i) => 
                i < 5 ?  <Col key={key} span={4} className='days'>
                    <Card title={(new Date(key)).toLocaleDateString('en-US', { weekday: 'long' })} bodyStyle={{ padding: 5 }} style={{ textAlign: 'center' }}>
                        {key}
                        <img src={`https://openweathermap.org/img/w/${days[key][0].weather[0].icon}.png`} />
                        <p>{days[key][0].main.temp_min}°C / {days[key][0].main.temp_max}°C <br /> Humidity: {days[key][0].main.humidity}%</p>
                    </Card>
                </Col>:null
                )}
            </Row>
        </Fragment>
    )
}
const mapStateToProps = state => ({ forecast: state.forecast });
export default connect(mapStateToProps)(DayList);

