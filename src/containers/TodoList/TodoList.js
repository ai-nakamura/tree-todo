import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'

import classes from './TodoList.module.css';

import EditTodo from '../../components/EditTodo/EditTodo';
import Todo from '../../components/Todo/Todo';

class Todolist extends Component {

  state = {
    editIndex: -1
  }

  editClicked(event, taskIndex) {

    event.stopPropagation();
    console.log("editData");
    console.log("row to edit: " + taskIndex);
    console.log(this.props.tasks[taskIndex]);

    this.setState({
      editIndex: taskIndex
    });

  }

  render () {

    const netError = this.props.netError;
    const tasks = [...this.props.tasks];
    const clicked = this.props.clicked;
    const editClicked = this.props.editClicked;

    //const editIndex = this.state.editIndex;

    // ** check for errors **
    if (netError) {
      return <p className="alert alert-danger" role="alert">(network error)</p>;
    }

    if (tasks.length === 0) {
      return <p className="alert alert-info" role="alert">(empty database)</p>;
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

      const taskData = tasks.map((task, index) =>
        <Todo
          task={task}
          key={index}
          index={index}
          clicked={clicked}
          editClicked={editClicked} // passing through props, can reformat?
        />
      );

      // TODO: Use editIndex to determine where to have EditTodo...
      taskData.push(<EditTodo key='no'/>);

      return (
        <>
          <Table
            striped bordered hover size="sm"
            className={classes.TodoList}>
            <thead>
            {header}
            </thead>
            <tbody>
            {taskData}
            </tbody>
          </Table>
          <button onClick={() => console.log('clicked')}>new task</button>
        </>
      );
    }

    return jsonToTable();
  }


}

export default Todolist;
