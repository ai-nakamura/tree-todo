import React, { Component } from 'react';
import {connect} from 'react-redux';
import Table from 'react-bootstrap/Table'

import classes from './TodoList.module.css';

import EditTodo from '../../components/EditTodo/EditTodo';
import Todo from '../../components/Todo/Todo';

class Todolist extends Component {

  state = {
    editIndex: -1,
    editingExistingTask: false,
    makingNewTask: false,
    sortedBy: 'tag'
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.sortedBy !== this.state.sortedBy) {
      console.log('sortedBy is different');
    }
  }

  // wait, shouldn't this be Todo's responsibility?
  editClicked = (event, taskIndex, updatedTask) => {

    event.stopPropagation();
    console.log('[TodoList] editClicked');
    console.log('row to edit: ' + taskIndex);

    this.setState({
      editIndex: taskIndex,
      editingExistingTask: true,
      makingNewTask: false
    });
    // this.props.submitClicked(updatedTask, taskIndex);
  }

  submitClicked = (submittedTask, oldHashKey) => {
    // console.trace('[submitClicked] TodoList.js');
    if (submittedTask === null) {
      console.log('nothing changed confirmed');
      this.setState({
        editIndex: -1,
        editing: false,
        makingNewTask: false
      });
    }

    else if (submittedTask === 'empty new task') {
      console.log(submittedTask);
      this.setState({
        editIndex: -1,
        makingNewTask: false
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
        // makingNewTask: false
      });
    }
  }

  newTaskClicked = () => {
    this.setState({
      editIndex: -1,
      editingExistingTask: false,
      makingNewTask: !this.state.makingNewTask
    });
  }

  sortClicked = (tasks, sortType) => {
    console.log(sortType);

    // sort by tag alphabetically (ignore emoji)
    if (sortType === 'tag') {
      tasks.sort((task1, task2) => {
        const one = task1.tag.charAt(3);
        const two = task2.tag.charAt(3);
        if (one === two) return 0;
        return one < two ? -1 : 1;
      });
    }

    // sort by task name

    // sort by due date
    if (sortType === 'dueDate') {
      tasks.sort((task1, task2) => {
        const one = task1.dueDate;
        const two = task2.dueDate;
        if (one === '' || two === 'today') return 1;
        if (two === '' || one === 'today') return -1;
        if (one === two) return 0;
        return one < two ? -1 : 1;
      });
    }
    console.log(tasks);
    this.setState({tasks: tasks});
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
                task={null}
                index='0'
                clicked={null}
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
       * [BUG] today is pushed to end of list and not top
       */
/*      tasks.sort((task1, task2) => {
        const one = task1[this.state.sortedBy];
        const two = task2[this.state.sortedBy];
        if (one === '') return 1;
        if (two === '') return -1;
        if (one === two) return 0;
        return one < two ? -1 : 1;
      });*/



      const header =
        <tr>
          <th onClick={() => this.sortClicked(tasks, 'tag')}>tag</th>
          <th onClick={() => this.sortClicked(tasks, 'task')}>task name</th>
          <th>description</th>
          {/*<th onClick={() => this.sortClicked(tasks, 'dueDate')}>due</th>*/}
          <th onClick={this.props.onDateSort}>due</th>
          <th>edit</th>
        </tr>;

      const todoList =
        tasks.map((task, index) => {
          if (index === this.state.editIndex) {
            return(
              <EditTodo
                key='no'
                task={task}
                index={index}
                clicked={null}
                editClicked={this.editClicked}
                hashGen={this.props.hashGen}
                submitClicked={this.submitClicked}/>
            )
          }
          return (
            <Todo
              key={index}
              task={task}
              index={index}
              clicked={this.props.clicked}
              editClicked={this.editClicked}
              hashGen={null}
              submitClicked={null}/>
          );
        });


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
                this.state.makingNewTask ?
                  <EditTodo
                    key='no'
                    task={null}
                    index={this.props.tasks.length}
                    clicked={null}
                    editClicked={this.editClicked}
                    hashGen={this.props.hashGen}
                    submitClicked={this.submitClicked}/>
                  : null
              }
            </tbody>
          </Table>
          <button
            onClick={this.newTaskClicked}>
            new task
          </button>
        </>
      );
    }

    return jsonToTable();
  }


}

// store
export const mapStateToProps = state => {
  return {
    tasks: state.tasks
  };
};

// dispatch
export const mapDispatchToProps = dispatch => {
  return {
    onDateSort: () => dispatch({ type: 'dueDate '})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todolist);
