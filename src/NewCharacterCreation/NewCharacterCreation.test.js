  
import React from 'react';
import { shallow } from 'enzyme'
import { BrowserRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json'
import NewCharacterCreation from './NewCharacterCreation';

describe(`New Character Creation component`, () => {

    it('renders a NewCharacterCreation', () => {
        const wrapper = shallow(
            <BrowserRouter>
                <NewCharacterCreation />
            </BrowserRouter>
        )
        expect(toJson(wrapper)).toMatchSnapshot()
    })

})