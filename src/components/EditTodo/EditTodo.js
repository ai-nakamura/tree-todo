import React, { useRef, useState } from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
// import Col from "react-bootstrap/Col";
// import classes from "../../PostTasks/PostTask.module.css";

// function Emoji(props) {
//   return <span className={classes.emoji}>{props.emoji}</span>;
// }


/*
< EditTodo
    nameRef=''
    descriptionRef=''
    dateRef=''
    dropdownRef ='' />


 */



// return a form in line with the table
const EditTodo = props => {

  const nameRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef();
  const dropdownRef = useRef();

  const chore = '🧹 chore';
  const work = '💼 work';
  const selfCare = '🌱 self care';

  const [dropdownTitle, setDropdownTitle] = useState(selfCare);


  const onDropdown = href => {
    console.log(href.substring(1));
    setDropdownTitle(href.substring(1));
  };

  const onSubmit = event => {

    const taskName = nameRef.current.value;
    const taskDescription = descriptionRef.current.value;
    const dueDate = dateRef.current.value;
    const tag = dropdownRef.current.innerText;

    // TODO: tag not working
    console.log("on submit: $" + tag + "$ ", taskName, taskDescription, dueDate);
    // Do something with the values. Submit the edit!

     if (taskName === '') {
       alert("please choose a taskname");
       return;
     }

    props.editClicked(event, props.id, {tag, taskName, taskDescription, dueDate});
    // props.editing

  };

  /*  const dropdown = (
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
   );*/

  return(
    <tr>
      <td>
        <DropdownButton
          id="dropdown-basic-button"
          title={dropdownTitle}
          ref={dropdownRef}>

          <Dropdown.Item
            href={'#' + chore}
            onSelect={onDropdown}>
            {chore}
          </Dropdown.Item>

          <Dropdown.Item
            href={'#' + work}
            onSelect={onDropdown}>
            {work}
          </Dropdown.Item>

          <Dropdown.Item
            href={'#' + selfCare}
            onSelect={onDropdown}>
            {selfCare}
          </Dropdown.Item>

        </DropdownButton>

      </td>
      <td>
        <input
          type="text"
          placeholder="task name"
          ref={nameRef}/>
      </td>
      <td>
        <input
          type="text"
          placeholder="task description"
          ref={descriptionRef}/>
      </td>
      <td>
        <input
          type="date"
          placeholder="due date"
          ref={dateRef}/>
      </td>
      <td>
        <button
          onClick={onSubmit}>
          ✅
        </button>
      </td>
    </tr>
  );
};

export default EditTodo;
