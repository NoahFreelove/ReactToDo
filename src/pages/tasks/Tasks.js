import React from 'react';
import { SearchBox } from '../../components/search-box/search-box.component';
import { Clock } from '../../components/clock/clock.component';
import { TaskList } from '../../components/task-list/task-list.component';
import './Tasks.css';
import {Typography} from "@mui/material";
import {AddTaskDialog} from "../../components/add-task/add-task-dialog.component";


class Tasks extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        tasks: [],
        newTaskTitle: "",
        newTaskDeadline: "",
        newExpires:false,
        searchValue:"",
        date: (new Date()).toLocaleTimeString(),
        loadedData: false,
        username: "User"
    }

      this.timerID = setInterval(
        () => this.tick(),
        1000
    );
  }

  loadTasks=()=>{
      this.setState({username: window.location.href.split("=")[1]})

  }

  checkTaskExpiration = () => {
    let currDay = new Date();

    let tmpT = this.state.tasks.slice(0)
    //console.log(tmpT)

    tmpT.map((task)=>{
        if(task.expires)
        {
            return task;
        }
        let newDate = new Date()
        newDate.setHours(parseInt(task.deadline.split(":")[0]))
        newDate.setMinutes(parseInt(task.deadline.split(":")[1]))
        newDate.setSeconds(0);
        task.expired = (newDate < currDay)
        return task;
    })

    this.setState({ tasks: tmpT })
  }



    addTaskHandler = () => {
      if(this.state.newTaskTitle === "")
      {
          return {invalid: true, reason:"You are missing a task title"};
      }


      if(this.state.newTaskDeadline === "" && this.state.expires)
      {
          return {invalid: true, reason:"You are missing a task deadline!"};
      }
      if(this.state.newTaskTitle.length > 60){
          return {invalid: true, reason:"Keep the length of your task name under 60 characters"};
      }

    this.setState({
      tasks: [...this.state.tasks,
              {
                name: this.state.newTaskTitle,
                deadline: this.state.newTaskDeadline,
                expires: this.state.newExpires,
                expired: false,
                  id: Math.random()
              }
            ]
    }, () => {
      this.setState( { newTaskTitle: '', newTaskDeadline: '', newExpires: false})
    });
      return {invalid: false, reason:"Success"};
  }

  removeTaskHandler = (id) => {
      for (let i = 0; i < this.state.tasks.length; i++) {
          if(this.state.tasks[i].id === id)
          {
              this.state.tasks.splice(i,1)
              return;
          }
      }
  }
componentDidMount() {
      if(!this.state.loadedData)
      {
          this.setState({loadedData: true})
          this.loadTasks();
      }
}

    componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
        date: (new Date()).toLocaleTimeString()
    });
    this.checkTaskExpiration()
  }


  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})

  }
    handleCheckChange = (e) => {
        this.setState({[e.target.name]: e.target.checked})
    }
  render() {
    const { tasks, searchValue } = this.state
    const filteredTasks = tasks.filter((task) =>
        task.name.toLowerCase().includes(searchValue.toLowerCase())
    )

    return (
        <div className="App">
            <pre className="space"/>
        <header>
            <Typography component="h1" variant="h5">Hello, {this.state.username}</Typography>
            <Clock displayDate={this.state.date} />
            <div>

            </div>

            <pre className="space"/>
            <hr style={{width: "400px"}}/>

            <SearchBox placeholder='search tasks' value={this.state.searchValue} onChange={this.handleChange}/>

            <TaskList tasks={filteredTasks} RemoveTasks={this.removeTaskHandler}/>
            <AddTaskDialog newTaskTitle={this.state.newTaskTitle}
                           newTaskDeadline={this.state.newTaskDeadline}
                           newExpires={this.state.newExpires}
                           handleChange={this.handleChange}
                           handleCheckChange={this.handleCheckChange}
                           onClick={this.addTaskHandler}/>
        </header>
      </div>
    )
  }

}

export default Tasks;

