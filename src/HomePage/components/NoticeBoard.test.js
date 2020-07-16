  
import React from 'react';
import { shallow } from 'enzyme'
import { BrowserRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json'
import NoticeBoard from './NoticeBoard';

describe(`NoticeBoard component`, () => {

    it('renders a NoticeBoard', () => {
        const wrapper = shallow(
            <BrowserRouter>
                <NoticeBoard />
            </BrowserRouter>
        )
        expect(toJson(wrapper)).toMatchSnapshot()
    })

})