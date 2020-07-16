  
import React from 'react';
import { shallow } from 'enzyme'
import { BrowserRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json'
import Notice from './Notice';

describe(`Notice component`, () => {

    it('renders a Notice', () => {
        const wrapper = shallow(
            <BrowserRouter>
                <Notice />
            </BrowserRouter>
        )
        expect(toJson(wrapper)).toMatchSnapshot()
    })

})