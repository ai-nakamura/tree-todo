import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as sap from '../../sap';
import data from '../../tasks';
import fnv1a from '../../FNV-1a';
// import PostTask from './PostTasks/PostTask';

import Auth from '../Auth/Auth';
import TodoList from '../TodoList/TodoList';

import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import sprout from '../../asset/images/sprout.png';

class Main extends Component {
  state = {
    myTask: 'curr task: redirect user to main page'
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
      }
    });
  }

  deleteData(hashKey) {
    console.log("deleteData");
    console.log("task to delete: " + hashKey);
    this.props.onDeleteTask(hashKey);
    this.postData(this.props.tasks);
  }

  receiveEdit(submittedNewTasks, taskIndex) {
    console.log('receivedEdit');
    this.props.onSetTask(submittedNewTasks, taskIndex);
    this.postData(submittedNewTasks);
  }

  logout() {

  }

  // from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
  hashKeyGenerator(task) {
    const str = '' +
      task.tag +
      task.taskName +
      task.taskDescription +
      task.dueDate;

    return fnv1a(str);
  }

  render() {

    let not_logged_in = null;
    // consider accessing localstorage only once during componentDidMount
    if (!localStorage.getItem('token')) {
      not_logged_in = <Redirect to='/login' component={Auth}/>;
    }

    return (
      <div className="App container">

        {not_logged_in}
        {/*{logoutButton}*/}
        <Button onClick={() => this.props.onLogout()}>
          logoutButton
        </Button>

        <h1>Tree</h1>
         <p>the start of a lovely journey</p>
        <img
          src={sprout}
          className="Sprout"
          alt={"Logo, a little sprout"}
        />
        <br /><br />

        <h3>{this.state.myTask}</h3>
        <br /><br />

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
          onClick={() => this.receiveEdit(data, 2)}
        >
          test data
        </Button>

      </div>
    );
  }
}

// store
export const mapStateToProps = state => {
  return {
    netErr: state.networkError,
    token: state.token,
    tasks: state.tasks,
  };
};

// dispatch
export const mapDispatchToProps = dispatch => {
  return {
    onNetErr: (netErr) =>    dispatch({ type: 'NET_ERR', netErr}),
    onInit: (fetchedData) => dispatch({ type: 'INIT' , fetchedData}),

    onSetTask: (newTaskList, index) => dispatch({ type: 'SET_TASK_LIST', newTaskList, index }),
    onDeleteTask:  (hashKey) => dispatch({ type: 'DELETE_TASK', hashKey }),

    onLogout: () => dispatch({type: 'CLEAR_TOKEN'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
