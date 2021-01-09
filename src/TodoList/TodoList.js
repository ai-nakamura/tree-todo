import React from 'react';

const todolist = (props) => {
  // take in data

  // take care of parsing the whole data

  // take care of stringifying the data

  // return JSX of each task



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

  const strFormatted = [];
  for (const task in jsonObj) {
      strFormatted.push(
        `${task}: ${jsonObj[task].taskName}   | [${jsonObj[task].tag}]`
      );
  }

  return (
    <div>
      {strFormatted.map( (task, index)   =>
        <p key={index}>{task}</p>
      )}
    </div>
  );

}

export default todolist;