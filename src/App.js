import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

import * as sap from './sap';
import data from './tasks';
// import PostTask from './PostTasks/PostTask';
import TodoList from './containers/TodoList/TodoList';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import sprout from './asset/images/sprout.png';

class App extends Component {
  componentDidMount() {
    this.getData();
  }

  state = {
    networkError: false,
    tasks: [],
    myTask: 'todo: fix the tag not working!',
  }

  getData() {

    sap.get((responseText) => {
      if (responseText === null) {
        console.log('trouble with GET request');
        this.setState({
          networkError: true
        });
        return;
      }

      let tasks = [];
      if (responseText !== '') {
        tasks = JSON.parse(responseText);
      }

      // update the state of the component with the result here
      this.setState({
        networkError: false,  // reset the error flag if it was set
        tasks: tasks
      });
    });

  }

  postData(data) {
    console.log('postData');


    let dataStr = JSON.stringify(data);
    if (dataStr === '[]') {
      dataStr = '';
    }
    sap.post(dataStr, (responseText) => {
      if (responseText === null) {
        console.log('Something went wrong');
      }
      if (responseText === '') {
        console.log('POST worked!');
        this.setState({
          tasks: data
        });
      }
    });
  }

  deleteData(taskIndex) {

    console.log("deleteData");
    console.log("row to delete: " + taskIndex);

    const toPost = [...this.state.tasks];
    console.log(toPost);

    const deleted = toPost.splice(taskIndex, 1);
    console.log(deleted);

    this.postData(toPost);

  }

/*  editData(event, taskIndex, newTask) {

    event.stopPropagation();
    console.log("editData");
    console.log("row to edit: " + taskIndex);

    let parsedData = [...this.state.tasks];
    console.log(taskIndex);

    if (taskIndex >= parsedData.length) {
      // if edit item is >= data length, it's a new item
      parsedData.push(newTask);
      console.log(parsedData);
    }
    // else we need to replace a row

    this.postData(parsedData);

  }*/

/*  receiveForm(newTask) {
    // do a thing to add the new task to the existing data
    for (const t in newTask) {
      console.log(`${t}: ${newTask[t]}`);
    }
    // console.log(this.state.tasks);
    let allTasks = [];
    allTasks.push(...this.state.tasks);
    allTasks.push(newTask);
    console.log(allTasks);
    this.postData(allTasks);
  }*/

  receiveEdit(submittedTasks, taskIndex) {
    // if index > length, push to end
    // replace whatever task index with this new one
    console.log(submittedTasks, taskIndex);

    // let newTaskList = [...this.state.tasks];
    // newTaskList.splice(taskIndex, 1, submittedTasks);
    // console.log(newTaskList);


    this.postData(submittedTasks);

  }

  // from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
  hashKeyGenerator(task) {
    let hash = 0;
    const str = '' +
      task.tag + task.taskName + task.taskDescription + task.dueDate;

    for (let i = 0; i < str.length; i++) {
      const chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }

    return hash;
  }

  render() {
    return (
      <div className="App container">
        <h1>Tree</h1>
        <p>the start of a lovely journey</p>
        <img src={sprout} className="Sprout" alt={"Logo, a little sprout"} />
        <br /><br />

        <h3>{this.state.myTask}</h3>
        <br /><br />
        {/*
        <PostTask
          tasks={this.state.state}
          onSubmit={this.receiveForm.bind(this)} />
        <br />*/}

        <TodoList
          netError={this.state.networkError}
          tasks={this.state.tasks}
          clicked={this.deleteData.bind(this)}
          submitClicked={this.receiveEdit.bind(this)}
          hashGen={this.hashKeyGenerator}
          note={'editClicked={this.editData.bind(this)'}/>
        <br />

        <Button
          variant="outline-primary"
          onClick={ () => this.postData(data) }>
          test data
        </Button>

      </div>
    );
  }

}

export default App;
