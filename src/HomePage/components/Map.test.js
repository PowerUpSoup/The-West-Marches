  
import React from 'react';
import { shallow } from 'enzyme'
import { BrowserRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json'
import Map from './Map';

describe(`Map component`, () => {

    it('renders a Map', () => {
        const wrapper = shallow(
            <BrowserRouter>
                <Map />
            </BrowserRouter>
        )
        expect(toJson(wrapper)).toMatchSnapshot()
    })

})