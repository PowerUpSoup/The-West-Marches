  
import React from 'react';
import { shallow } from 'enzyme'
import { BrowserRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json'
import NewNoticeForm from './NewNoticeForm';

describe(`New Notice Form component`, () => {

    it('renders a NewNoticeForm', () => {
        const wrapper = shallow(
            <BrowserRouter>
                <NewNoticeForm />
            </BrowserRouter>
        )
        expect(toJson(wrapper)).toMatchSnapshot()
    })

})