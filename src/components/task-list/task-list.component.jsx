import React from "react";
import { Task } from "../task/task.component";

export function TaskList(props) {
    return (
        <div>
             {props.tasks.map((task) => (
                 <Task
                    name={task.name}
                    expired={task.expired}
                    expires={task.expires}
                    deadline={task.deadline}
                    id={task.id}
                    removeHandler={props.RemoveTasks}
                />
             ))}
        </div>
    )
}

