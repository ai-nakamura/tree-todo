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
    myTask: 'making the new edit field',
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

  editData(event, taskIndex) {

    event.stopPropagation();
    console.log("editData");
    console.log("row to edit: " + taskIndex);

    let parsedData = [...this.state.tasks];
    // console.log(parsedData);
    console.log(parsedData[taskIndex]);

    // it'd be great if we could show the edit field right where the task is already
    // TODO?

  }

  receiveForm(newTask) {
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
  }

  render() {
    return (
      <div className="App container">
        <h1>Tree</h1>
        <p>The start of a lovely journey</p>
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
          tasks={this.state.tasks}
          netError={this.state.networkError}
          clicked={this.deleteData.bind(this)}
          editClicked={this.editData.bind(this)}/>
        <br />

        <Button
          variant="outline-primary"
          onClick={ () => this.postData(data) }>
          POST to db
        </Button>

      </div>
    );
  }

}

export default App;
