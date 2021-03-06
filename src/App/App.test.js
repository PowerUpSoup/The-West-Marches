  
import React from 'react';
import { shallow } from 'enzyme'
import { BrowserRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json'
import App from './App';

describe(`App component`, () => {

    it('renders a App', () => {
        const wrapper = shallow(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        )
        expect(toJson(wrapper)).toMatchSnapshot()
    })

})