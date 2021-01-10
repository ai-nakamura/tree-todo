import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Table from 'react-bootstrap/Table'

const todolist = (props) => {
  // take in data

  // take care of parsing the whole data

  // take care of stringifying the data

  // return JSX of each task

/*    // objects.keys(json) == ['task1', 'task2']
    // objects.value(json.task1) ?== ['due date', 'tag', 'taskDescriptions', 'taskName']

    // objects.value(json) == [task1:{}, task2: {}]

  function jsonToTable(json) {
    let columnHeader = [];
    let headerRow;
    // let taskRows;

    // Properly capitalize header


    for ( const taskInfo in Object.values(json)[0] ) {
      columnHeader.push(taskInfo.charAt(0).toUpperCase() + taskInfo.slice(1));
    }

    // Append capitalized words to headerRow
    headerRow =
      <tr>
        {columnHeader.forEach(label => {
          return <th>{label}</th>
        })}
      </tr>

    // Append task body to taskRows
    // taskRows = <tr>
    //   {Object.values(json).forEach(task => {
    //     return <td>{task}</td>
    //   })}
    // </tr>

    return (
      <table>
        <thead>{headerRow}</thead>
        <tbody><tr><td>taskRows</td></tr></tbody>
      </table>
    )
  }*/

  if (props.netError) { // this.state.networkError
    return <p>(network error)</p>;
  }

  if (props.response === '') {
    return <p>(empty database)</p>;
  }

  // TODO: check for improper data format
  const jsonObj = JSON.parse(props.response);

  // TODO: find a better way to format data
  // https://www.geeksforgeeks.org/how-to-convert-json-data-to-a-html-table-using-javascript-jquery/

/*  const strFormatted = [];
  for (const task in jsonObj) {
      strFormatted.push(
        `${task}: ${jsonObj[task].taskName}   | [${jsonObj[task].tag}]`
      );
  }*/

  const jsonToTable = (json) => {
    // header
    let header;
    header =
      <tr>
        {console.log(Object.keys(Object.values(json)[0]))}
        {Object.keys(Object.values(json)[0]).map((label) => {
          return <th>{label}</th>
        })}
      </tr>;

    // taskData
    let taskData;
    taskData =
        // for each task in json
        Object.values(json).map( task => { // .keys == ['task1', 'task2']. .values == [{}, {}]
          // for each item in task
          return (
            <tr>
              {Object.values(task).map(item => { //Object.value(json['task1']).map
                // <td>{item}</td>
                return <td>{item}</td>
              })}
           </tr>
          )
        })



    return (
      <Table striped bordered hover>
        <thead>{header}</thead>
        <tbody>{taskData}</tbody>
      </Table>
      );
  }

  return (
    <div>
      {/*{strFormatted.map( (task, index)   =>
        <p key={index}>{task}</p>
      )}*/}
      <Table>

      </Table>
      {jsonToTable(jsonObj)}
    </div>
  );

}

export default todolist;
