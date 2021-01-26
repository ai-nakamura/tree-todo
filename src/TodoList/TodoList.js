import React from 'react';
import Table from 'react-bootstrap/Table'

import classes from './TodoList.module.css';

import EditTodo from './EditTodo/EditTodo';
import Todo from './Todo/Todo';

const todolist = (props) => {

  // ** check for errors **
  if (props.netError) { // this.state.networkError
    return (
      <p
        className="alert alert-danger"
        role="alert">
        (network error)
      </p>
    );
  }

  if (props.response === '') {
    return (
      <p
        className="alert alert-info"
        role="alert">
        (empty database)
      </p>
    );
  }

  // TODO: check for improper data format
  const jsonObj = JSON.parse(props.response);

  const jsonToTable = (json) => {
    const tasks = Object.values(json);

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

    const taskData = tasks.map( (task, index) =>
      <Todo
        task={task}
        key={index}
        index={index}
        clicked={props.clicked}
        editClicked={props.editClicked} // passing through props, can reformat?
      />
    );
    taskData.push(<EditTodo key="no"/>)


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
          <button>new task</button>
      </>
    );
  }

  return jsonToTable(jsonObj);

}

export default todolist;
