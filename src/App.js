import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux';

import * as sap from './sap';
import data from './tasks';
import fnv1a from './FNV-1a';
// import PostTask from './PostTasks/PostTask';
import TodoList from './containers/TodoList/TodoList';



import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import sprout from './asset/images/sprout.png';

class App extends Component {
  state = {
    // networkError: false,
    // tasks:  [],
    myTask: 'curr task: fix adding new task ' +
      '(It only shows up after refresh)',
  }

  componentDidMount() {
    this.getData();
  }

  getData() {

    sap.get((responseText) => {

      if (responseText === null) {
        console.log('trouble with GET request');

        // DISPATCH
        this.props.onNetErr(true);
        return;
      }

      let tasks = [];
      if (responseText !== '') {
        tasks = JSON.parse(responseText);
      }

      // DISPATCH
      this.props.onInit(tasks);
      this.props.onNetErr(false);
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
    this.setState({});
  }

  addData(newTask) {

    console.log("addData");
    console.log("task to add: " + newTask);

    this.props.onAddTask(newTask);
    this.postData(this.props.tasks);

  }

  deleteData(hashKey) {

    console.log("deleteData");
    console.log("task to delete: " + hashKey);

    // const toPost = [...this.props.tasks];
    // console.log(toPost);

    // const deleted = toPost.splice(taskIndex, 1);
    // console.log(deleted);


    this.props.onDeleteTask(hashKey);

    this.postData(this.props.tasks);

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

    // let newTaskList = [...this.state.tasks];
    // newTaskList.splice(taskIndex, 1, submittedTasks);
    // console.log(newTaskList);


    this.postData(submittedTasks);

  }

  // from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
  hashKeyGenerator(task) {
    const str = '' +
      task.tag + task.taskName + task.taskDescription + task.dueDate;

    return fnv1a(str);
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
          tasks={'test'}
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

// store
export const mapStateToProps = state => {
  return {
    tasks: state.tasks,
    netErr: state.networkError
  };
};

// dispatch
export const mapDispatchToProps = dispatch => {
  return {
    onNetErr: (netErr) =>    dispatch({ type: 'NET_ERR', netErr}),
    onInit: (fetchedData) => dispatch({ type: 'INIT' , fetchedData}),

    onAddTask: () => dispatch({ type: 'ADD_TASK' }),
    onDeleteTask: (hashKey) => dispatch({ type: 'DELETE_TASK', hashKey })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
