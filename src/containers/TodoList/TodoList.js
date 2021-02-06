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


  editClicked = (event, taskIndex) => {

    event.stopPropagation();
    console.log("editData");
    console.log("row to edit: " + taskIndex);

    // replace the editClicked one with an EditTodo
    // with the fields pre-filled with the ones
    // already written

    this.setState({
      editIndex: taskIndex,
      editing: true
    });

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
                editClicked={editClicked}
                id='0'
              />
            </tbody>
          </Table>
        </>
      )
    }

    const jsonToTable = () => {

      /*
       * Sort by date
       * eventually replace this with a toggle option
       */
      tasks.sort((key1, key2) => {
        const one = key1.dueDate;
        const two = key2.dueDate;
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
            console.log('edit caught');
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
                    editClicked={this.editClicked}
                    id={this.props.tasks.length}
                  /> : null
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
