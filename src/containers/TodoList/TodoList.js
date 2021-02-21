import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'

import classes from './TodoList.module.css';

import EditTodo from '../../components/EditTodo/EditTodo';
import Todo from '../../components/Todo/Todo';

class Todolist extends Component {

  state = {
    editIndex: -1,
    editing: false
  }


  // wait, shouldn't this be Todo's responsibility?
  editClicked = (event, taskIndex, updatedTask) => {

    event.stopPropagation();
    console.log('[TodoList] editClicked');
    console.log('row to edit: ' + taskIndex);
    // console.log(taskIndex);
    // console.log(updatedTask);

    this.setState({
      editIndex: taskIndex,
      // editing: true
    });
    // this.props.submitClicked(updatedTask, taskIndex);
  }

  submitClicked = (submittedTask, oldHashKey) => {
    // console.trace('[submitClicked] TodoList.js');
    if (submittedTask === null) {
      console.log('nothing changed confirmed');
      this.setState({
        editIndex: -1,
        editing: false
      });
    }

    else if (submittedTask === 'empty new task') {
      console.log(submittedTask);
      this.setState({
        editIndex: -1,
        editing: false
      });
    }

    else {
      console.log('change detected');
      console.log(submittedTask, oldHashKey);

      // find the one with old hash
      let newTaskList = [...this.props.tasks];

      let index;
      for (index = 0; index < newTaskList.length; index++) {
        if (newTaskList[index].hashKey === oldHashKey) {
          newTaskList[index] = submittedTask;
          console.log('old hash found');
          break;
        }
      }
      // if we got to the end of the list, that means this is a new task
      if (index === newTaskList.length) {
        newTaskList.push(submittedTask);
      }

      // somehow send this data up to App.js
      this.props.submitClicked(newTaskList, index);

      this.setState({
        editIndex: -1,
        // editing: false
      });
    }
  }


  // render runs twice: once when the component is mounted,
  // and a second time when the http call finishes and App.js re-renders
  render () {


    const netError = this.props.netError;
    const tasks = [...this.props.tasks];
    // const clicked = this.props.clicked;
    const editClicked = this.props.editClicked;

    // console.log(tasks);

    // ** check for errors **
    if (netError) {
      return <p className="alert alert-danger" role="alert">(network error)</p>;
    }

    if (tasks.length === 0) {
      return (
        <>
          <p className="alert alert-info" role="alert">(empty database)</p>
          <Table
            striped bordered hover size="sm"
            className={classes.TodoList}>
            <tbody>
              <EditTodo
                key='no'
                index='0'
                editClicked={editClicked}
                hashGen={this.props.hashGen}
                submitClicked={this.submitClicked}/>
            </tbody>
          </Table>
        </>
      )
    }

    const jsonToTable = () => {

      /*
       * Sort by date
       * eventually replace this with a toggle option
       * [BUG] sorting at render doesn't change the original list,
       * causes editing to bug out bc of indexing issue
       */
      tasks.sort((task1, task2) => {
        const one = task1.dueDate;
        const two = task2.dueDate;
        if (one === '') return 1;
        if (two === '') return -1;
        if (one === two) return 0;
        return one < two ? -1 : 1;
      });

      const header =
        <tr>
          <th>tag</th>
          <th>task name</th>
          <th>description</th>
          <th>due</th>
          <th>edit</th>
        </tr>;

      const todoList =
        tasks.map((task, index) => {
          if (index === this.state.editIndex) {
            return(
              <EditTodo
                key='no'
                index={index}
                task={task}
                editClicked={this.editClicked}
                hashGen={this.props.hashGen}
                submitClicked={this.submitClicked}/>
            )
          }
          return (
            <Todo
              task={task}
              key={index}
              index={index}
              clicked={this.props.clicked}
              editClicked={this.editClicked}/>
          );
        });



    /*  const taskData = tasks.map((task, index) =>
        <Todo
          task={task}
          key={index}
          index={index}
          clicked={clicked}
          editClicked={this.editClicked}/>
      );*/

      // TODO: Use editIndex to determine where to have EditTodo...

      return (
        <>
          <Table
            striped bordered hover size="sm"
            className={classes.TodoList}>
            <thead>
              {header}
            </thead>
            <tbody>
              {todoList}
              {
                this.state.editing ?
                  <EditTodo
                    key='no'
                    index={this.props.tasks.length}
                    editClicked={this.editClicked}
                    hashGen={this.props.hashGen}
                    submitClicked={this.submitClicked}/>
                  : null
              }
            </tbody>
          </Table>
          <button
            onClick={ () => {
              this.setState({ editing: !this.state.editing })
            }}>
            new task
          </button>
        </>
      );
    }

    return jsonToTable();
  }


}

export default Todolist;
