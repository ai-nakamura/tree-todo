import React from 'react';
import Table from 'react-bootstrap/Table'

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
        console.log(`TodoList key1: ${JSON.stringify(key1)}, key2: ${typeof key2}`)
        return key1["dueDate"] < key2["dueDate"] ? -1 : 1
      })

    /*
     * Create table header
     */
    const header =
      labels.map((label, index) =>
        <th key={index}>{label}</th>
      )

    /*
     * Fill in table body
     */
    const format = (task, index) => {
      const items = Object.values(task);
      const formattedCells = items.map((item, index) =>
        <td key={index}>{item}</td>
      )
      return <tr key={index} onClick={() => props.clicked(index)}>{formattedCells}</tr>;
    }

    const taskData = tasks.map(format);


    return (
      <Table striped bordered hover size={"sm"}>
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
