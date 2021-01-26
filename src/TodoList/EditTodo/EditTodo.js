import React from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import Col from "react-bootstrap/Col";

// return a form in line with the table
const editTodo = props => {

  // const i = props.index;

  // btnYes

  // btnNo

  const dropdown = (
    <Dropdown>

      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {this.state.formData.formDropdownSelection}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          onSelect={this.dropdownHandler}
          eventKey="🧹 chore"
          href="#/action-1">
          <Emoji emoji="🧹"/>
          chore
        </Dropdown.Item>

        <Dropdown.Item
          onSelect={this.dropdownHandler}
          eventKey="💼 work"
          href="#/action-2">
          <Emoji emoji="💼"/>
          work
        </Dropdown.Item>

        <Dropdown.Item
          onSelect={this.dropdownHandler}
          eventKey="🌱 self care"
          href="#/action-3">
          <Emoji emoji="🌱"/>
          self care
        </Dropdown.Item>

      </Dropdown.Menu>
    </Dropdown>
  );

  return(
    <tr>
      <td>
        dropdown
      </td>
      <td><input type="text" placeholder="task name"/></td>
      <td><input type="text" placeholder="task description"/></td>
      <td><input type="date" placeholder="due date"/></td>
      <td>yes / no</td>
    </tr>
  );
};

export default editTodo;

