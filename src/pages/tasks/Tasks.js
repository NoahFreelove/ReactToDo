import React from 'react';
import { SearchBox } from '../../components/search-box/search-box.component';
import { Clock } from '../../components/clock/clock.component';
import { TaskList } from '../../components/task-list/task-list.component';
import './Tasks.css';
import {Typography} from "@mui/material";
import {AddTaskDialog} from "../../components/add-task/add-task-dialog.component";
import {doc, getDoc} from "@firebase/firestore";
import {LoadTasks} from "../../components/load-tasks/download-tasks.component";
import {UploadTasks} from "../../components/save-tasks/upload-tasks.component";
import {map} from "react-bootstrap/ElementChildren";
import {DownloadData, UploadData} from "../../lib/firebase.util";
import {SetSsoName} from "../../app"

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
        username: "User",
        fbTasks: (this.props.auth.currentUser===null)? null : doc(this.props.db, 'users', this.props.auth.currentUser.uid)
    }
      this.timerID = setInterval(
        () => this.tick(),
        1000
    );
  }


  loadData = async () => {
      if ((this.props.auth.currentUser === null)) {
          this.props.history.push("/")
          window.location.reload(false)
      }
      else {
          try {
              let downloadedContent = await DownloadData()

              this.setState({tasks: downloadedContent[0], username: downloadedContent[1]})

              if(this.props.ssoLogin)
              {
                  this.setState({username: downloadedContent[1]})
              }
          }
          // if the user data hasnt been created, create it then load it
          catch (e)
          {
              console.log(e)
              if(this.props.ssoLogin)
              {
                  await UploadData(0,this.props.ssoName, []).then(()=>{this.loadData()})
              }
              else {
                  await UploadData(0,this.state.username, []).then(()=>{this.loadData()})
              }
          }

      }


  }



  checkTaskExpiration = () => {
    let currDay = new Date();

    let tmpT = this.state.tasks.slice(0)
    //console.log(tmpT)

    tmpT.map((task)=>{
        if(!task.expires)
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
          this.loadData();
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
            <LoadTasks loadTasks={this.loadData}/>
            <UploadTasks tasks={this.state.tasks}
                         username={this.state.username}
                        db={this.props.db}
                         auth={this.props.auth}
            />
        </header>
      </div>
    )
  }

}

export default Tasks;

