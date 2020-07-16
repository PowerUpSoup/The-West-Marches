  
import React from 'react';
import { shallow } from 'enzyme'
import { BrowserRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json'
import Login from './Login';

describe(`Login component`, () => {

    it('renders a Login', () => {
        const wrapper = shallow(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        )
        expect(toJson(wrapper)).toMatchSnapshot()
    })

})