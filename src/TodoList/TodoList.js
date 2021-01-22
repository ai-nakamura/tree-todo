import React from 'react';
import Table from 'react-bootstrap/Table'

import classes from './TodoList.css';

const todolist = (props) => {

  // ** check for errors **
  if (props.netError) { // this.state.networkError
    return <p className="alert alert-danger" role="alert">(network error)</p>;
  }

  if (props.response === '') {
    return <p className="alert alert-info" role="alert">(empty database)</p>;
  }



  // TODO: check for improper data format
  const jsonObj = JSON.parse(props.response);

  const jsonToTable = (json) => {
    // console.log(json);
    const tasks = Object.values(json);
    const labels = Object.keys(tasks[0]);

    /*
     * Sort by date
     * eventually replace this with a toggle option
     */
      tasks.sort((key1, key2) => {
        const one = key1["dueDate"];
        const two = key2["dueDate"];
        if (one === '') return 1;
        if (two === '') return -1;
        if (one === two) return 0;
        return one < two ? -1 : 1;
      })

    /*
     * Create table header
     */
    const header =
      labels.map((label, index) =>
        <th key={index}>{label}</th>
      )
    header.push(
      <th key={1000000000000}>edit</th>
    );
    /*
     * Fill in table body
     */
    const format = (task, index) => {
      const items = Object.values(task);
      const formattedCells = items.map((item, index) =>
        <td key={index}>{item}</td>
      )
      return <tr
        key={index}
        onClick={() => props.clicked(index)}>
          {formattedCells}
          <td
            key={index}
            onClick={(event) => props.editClicked(event, index)}
            style={{cursor: "pointer"}}>
            <button>✏️</button>
          </td>
      </tr>;
    }

    const taskData = tasks.map(format);


    return (
      <Table striped bordered hover size={"sm"} className={classes.TodoList}>
        <thead>
        <tr>{header}</tr>
        </thead>
        <tbody>{taskData}</tbody>
      </Table>
    );
  }

  return jsonToTable(jsonObj);

}

export default todolist;
