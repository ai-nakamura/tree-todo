import React from "react";

const todo = props => {

  console.log("todo.js");
  const todo = props.task;
  const i = props.index;
  console.log(todo);

  const editButton =
  <td
    onClick={(event) => props.editClicked(event, i)}
    style={{cursor: "pointer"}}>
    <button>✏️</button>
  </td>;


  return (
    <tr
      onClick={() => props.clicked(i)}>
      <td>{todo.tag}</td>
      <td>{todo.taskName}</td>
      <td>{todo.taskDescription}</td>
      <td>{todo.dueDate}</td>
      {editButton}
    </tr>
  );
};


export default todo;
