import React from 'react'
import renderer from 'react-test-renderer'
import {Button} from '../components/button/button.component'
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import toJson from "enzyme-to-json";

configure({adapter: new Adapter()});

/*test('Check Button Title', () => {
    console.log(React.version)
    const mockCallBack = jest.fn();

    const button = shallow((<button onClick={mockCallBack} title={"hi"}/>));
    button.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
})*/
//const mockCallBack = jest.fn();
//button.find('MButton').simulate('click');


describe('Button Title Check', () => {
    it('Buttons text should match the text that was given', () => {
        const wrapper = shallow((<Button title={"hi"}/>));
        expect(wrapper.props().children).toBe("hi")
    });
});
