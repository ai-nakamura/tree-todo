import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'

import classes from './TodoList.module.css';

import EditTodo from '../../components/EditTodo/EditTodo';
import Todo from '../../components/Todo/Todo';

class Todolist extends Component {

  state = {
    tasks: [],
    editIndex: -1
  }

  static getDerivedStateFromProps (props, state) {
    // TODO: check for improper data format
    if (props.response) {
      return { tasks: JSON.parse(props.response) };
    }
    return { tasks: [] };
  }

  render () {
    // ** check for errors **
    if (this.props.netError) { // this.state.networkError
      return <p className="alert alert-danger" role="alert">(network error)</p>;
    }

    if (this.props.response === '') {
      return <p className="alert alert-info" role="alert">(empty database)</p>;
    }

    const jsonToTable = (json) => {

      /*
       * Sort by date
       * eventually replace this with a toggle option
       */
      this.state.tasks.sort((key1, key2) => {
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

      const taskData = this.state.tasks.map((task, index) =>
        <Todo
          task={task}
          key={index}
          index={index}
          clicked={this.props.clicked}
          editClicked={this.props.editClicked} // passing through props, can reformat?
        />
      );

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
  return jsonToTable(this.state.tasks);
  }


}

export default Todolist;
