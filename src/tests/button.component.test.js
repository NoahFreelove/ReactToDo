import React from 'react'
import {Button} from '../components/button/button.component'
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

configure({adapter: new Adapter()});

describe('Button Component', () => {
    it('Buttons text should match the text that was given', () => {
        let wrapper = shallow((<Button title={"test-title"}/>));
        expect(wrapper.props().children).toBe("test-title")
    });

    it('Buttons color should match the color that was given', () => {
        let wrapper = shallow((<Button backgroundColor={"#FFFFFF"}/>));
        expect(wrapper.props().style.backgroundColor).toBe("#FFFFFF")
    });

    it('Button onClick should run when clicked', () => {
        const mockCallBack = jest.fn();
        let wrapper = shallow((<Button onClick={mockCallBack}/>));
        wrapper.props().onClick();
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

});
