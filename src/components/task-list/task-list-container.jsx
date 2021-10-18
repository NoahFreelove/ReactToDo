import {TaskList} from "./task-list.component";
import React from 'react'
export function TaskListContainer(props) {
    return(
        <TaskList tasks={props.tasks}/>
    )
}
