  
import React from 'react';
import { shallow } from 'enzyme'
import { BrowserRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json'
import HomePage from './HomePage';

describe(`HomePage component`, () => {

    it('renders a Homepage', () => {
        const wrapper = shallow(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        )
        expect(toJson(wrapper)).toMatchSnapshot()
    })

})