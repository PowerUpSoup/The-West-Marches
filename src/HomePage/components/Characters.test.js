  
import React from 'react';
import { shallow } from 'enzyme'
import { BrowserRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json'
import Characters from './Characters';

describe(`Characters component`, () => {

    it('renders a Characters', () => {
        const wrapper = shallow(
            <BrowserRouter>
                <Characters />
            </BrowserRouter>
        )
        expect(toJson(wrapper)).toMatchSnapshot()
    })

})