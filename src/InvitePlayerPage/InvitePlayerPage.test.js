  
import React from 'react';
import { shallow } from 'enzyme'
import { BrowserRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json'
import InvitePlayerPage from './InvitePlayerPage';

describe(`Invite Player Page component`, () => {

    it('renders an InvitePlayerPage', () => {
        const wrapper = shallow(
            <BrowserRouter>
                <InvitePlayerPage />
            </BrowserRouter>
        )
        expect(toJson(wrapper)).toMatchSnapshot()
    })

})