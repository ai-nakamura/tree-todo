import React, { useRef, useState } from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
// import Col from "react-bootstrap/Col";
// import classes from "../../PostTasks/PostTask.module.css";

// function Emoji(props) {
//   return <span className={classes.emoji}>{props.emoji}</span>;
// }

// look in to this video about fixing the dropdown menu
// https://www.youtube.com/watch?v=AcOjmZrcxfM

const EditTodo = props => {

  const nameRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef();
  const dropdownRef = useRef();

  const chore = '🧹 chore';
  const work = '💼 work';
  const selfCare = '🌱 self care';

  const [dropdownTitle, setDropdownTitle] = useState(selfCare);

  // place holders
  let ph_dropDown = dropdownTitle;
  let ph_taskName = "task name";
  let ph_taskDescription = "task description";
  let ph_dueDate = "";

  if (props.task) {
    ph_dropDown = props.task.tag;
    ph_taskName = props.task.taskName;
    ph_taskDescription = props.task.taskDescription;
    ph_dueDate = props.task.dueDate;
  }

/*  const onDropdown = href => {
    console.log(href.substring(1));
    setDropdownTitle(href.substring(1));
  };*/

  const dropdownHandler = eventKey => {
    console.log(eventKey);
    setDropdownTitle(eventKey);
    // how strange, the below will log the previous value instead of
    // the new one, but it still works?
    console.log(dropdownTitle);
  }

  const onSubmit = event => {

    // let tag = dropdownRef.current.innerText;
    let tag = dropdownTitle;
    let taskName = nameRef.current.value;
    let taskDescription = descriptionRef.current.value;
    let dueDate = dateRef.current.value; // sometimes returns "today". Might become a problem

    // fix values
    if (taskName === '') {
      taskName = ph_taskName;
    }
    if (taskDescription === '') {
      taskDescription = ph_taskDescription;
    }
    if (dueDate === '') {
      dueDate = ph_dueDate;
    }

    // no props.task if it's a blank edit todo
    if (!props.task){
      if (taskName === ph_taskName) {
        alert("please choose a task name");
        return;
      }
      const updatedTask = {tag, taskName, taskDescription, dueDate};
      console.log(updatedTask);

      props.submitClicked(updatedTask, props.id);
      return;
     }

    console.log(props);
    if (
      tag === props.task.tag &&
      taskName === props.task.taskName &&
      taskDescription === props.task.taskDescription &&
      dueDate === props.task.dueDate
    ) {
      console.log('nothing changed');
      props.submitClicked(null);
      return;
    }

    const updatedTask = {tag, taskName, taskDescription, dueDate};
    console.log(updatedTask);

    props.submitClicked(updatedTask, props.id);
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
          title={ph_dropDown}
          ref={dropdownRef}>

          <Dropdown.Item
            // href={'#' + chore}
            onSelect={dropdownHandler}
            eventKey={chore}>
            {chore}
          </Dropdown.Item>

          <Dropdown.Item
            // href={'#' + work}
            onSelect={dropdownHandler}
            eventKey={work}>
            {work}
          </Dropdown.Item>

          <Dropdown.Item
            // href={'#' + selfCare}
            onSelect={dropdownHandler}
            eventKey={selfCare}>
            {selfCare}
          </Dropdown.Item>

        </DropdownButton>

      </td>
      <td>
        <input
          type="text"
          placeholder={ph_taskName}
          ref={nameRef}/>
      </td>
      <td>
        <input
          type="text"
          placeholder={ph_taskDescription}
          ref={descriptionRef}/>
      </td>
      <td>
        <input
          type="date"
          placeholder={ph_dueDate}
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
