import React from 'react'
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import {Task} from "../components/task/task.component";
import {TaskListContainer} from "../components/task-list/task-list-container";

configure({adapter: new Adapter()});

describe('Task List Component', () => {
    let taskArray = [
        <Task name={"name"}
              expires={false}
              removeHandler={()=>{}}
              expired={false}
              deadline={""}
              id={0.0001}/>,
    ]
    let wrapper = shallow((<TaskListContainer tasks={taskArray}/>));

    it("Task list has a 1 task", () => {
        expect(wrapper.props().tasks.length).toBe(1)
    });

    it('Task List can access the tasks props', () => {
        expect(wrapper.props().tasks[0].props.name).toBe("name")
        expect(wrapper.props().tasks[0].props.expires).toBe(false)
        expect(wrapper.props().tasks[0].props.expired).toBe(false)
        expect(wrapper.props().tasks[0].props.deadline).toBe("")
        expect(wrapper.props().tasks[0].props.id).toBe(0.0001)
    });

});
