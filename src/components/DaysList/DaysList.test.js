import React from 'react';
import { render, mount, shallow } from 'enzyme';
import { DayList } from './DaysList';
import { Col } from 'antd';

import data from './data.json'


describe('<DayList />', () => {

    let wraper;
    beforeEach(() => {
        wraper = shallow(<DayList />);
    });

    it('it sloud return null if no arguments are passed', () => {
        expect(wraper.type()).toEqual(null);
    });

    it('It Should return null if city is empty', () => {
        wraper.setProps({ forecast: { city: '' } });
        expect(wraper.type()).toEqual(null);
    });


    it('It Should return only 5 days forecast even if its more data to render 6 days', () => {
        wraper.setProps({ forecast: data });
        expect(wraper.find(Col)).toHaveLength(5);
    });

})