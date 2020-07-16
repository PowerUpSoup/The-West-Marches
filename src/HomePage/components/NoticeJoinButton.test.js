  
import React from 'react';
import { shallow } from 'enzyme'
import { BrowserRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json'
import NoticeJoinButton from './NoticeJoinButton';

describe(`NoticeJoinButton component`, () => {

    it('renders a NoticeJoinButton', () => {
        const wrapper = shallow(
            <BrowserRouter>
                <NoticeJoinButton />
            </BrowserRouter>
        )
        expect(toJson(wrapper)).toMatchSnapshot()
    })

})