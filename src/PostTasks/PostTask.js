import React, {Component} from 'react';

import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col";
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

import './PostTask.css';

function Emoji(props) {
    // Fixes a text layout bug in Chrome 87 found on Jan 19, 2021.
    return <span className='emoji'>{props.emoji}</span>;
}

// make a form that takes info and POST it to server
class PostTask extends Component {
  state = {
    formDefault: {
      formDropdownSelection: 'select tag',
      formTaskName: 'task name',
      formDueDate: 'due date',
      formTaskDescription: 'task description'
    },
    formData: {
      formDropdownSelection: 'select tag',
      formTaskName: 'task name',
      formDueDate: 'due date',
      formTaskDescription: 'task description'
    },
    data: this.props.tasks
  };

  dropdownHandler = event => {
    const formDataCopy = {
      ...this.state.formData
    };
    formDataCopy.formDropdownSelection = event;
    this.setState({
      formData: formDataCopy
    });
  };

  formOnChange = (event, id) => {
    // make a copy of formData object (avoid changing state until need be)
    const formDataCopy = {
      ...this.state.formData
    };

    // change data value
    formDataCopy[id] = event.target.value;

    // if blank, turn it back to the default
    if (formDataCopy[id] === '') {
      formDataCopy[id] = this.state.formDefault[id];
    }

    // set state
    this.setState({
      formData: formDataCopy
    });
    console.log(this.state.formData);
  };

  btnOnClick = event => {

    /*
    console.log(this.state.formData);
    console.log("data is: " + JSON.stringify(this.state.data));
    for (const obj in this.state.data) {
      console.log(obj, this.state.data[obj]  );
    }
   */

    const form = this.state.formData;
    const fDef = this.state.formDefault;
    const boolDropdown = form.formDropdownSelection === fDef.formDropdownSelection;
    const boolTaskName = form.formTaskName === fDef.formTaskName;
    const boolTaskDesc = form.formTaskDescription === fDef.formTaskDescription;
    const boolDueDate = form.formDueDate === fDef.formDueDate;

    if (boolDropdown || boolTaskName) {
      console.log("error caught");
      // TODO: change this!
      alert("choose a task tag and enter a task name please :)");
      return;
      // I would rather do something like a toast animation
      // return (
      //   <div className="alert alert-warning" role="alert">
      //     This is a warning alert—check it out!
      //   </div>
      // );
    }

    const newTask = {
      tag: form.formDropdownSelection,
      taskName: form.formTaskName,
      taskDescription: boolTaskDesc ? '' : form.formTaskDescription,
      dueDate: boolDueDate ? '' : form.formDueDate
    };

    this.props.onSubmit(newTask);
  };


  render() {
    return (
        <Form onSubmit={this.btnOnClick}>
          <Form.Row>
            {/*Notes to self -- look more into how this works. React-bootstrap*/}


            <Col>
              <input
                id="formTaskName"
                type="text"
                className="form-control"
                onChange={(event) =>
                  this.formOnChange(event, "formTaskName")}
                placeholder={this.state.formData.formTaskName}/>
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <input
                id="formTaskDescription"
                type="text"
                className="form-control"
                onChange={(event) =>
                  this.formOnChange(event, "formTaskDescription")}
                placeholder={this.state.formData.formTaskDescription}/>
            </Col>
          </Form.Row>

          <Form.Row xs="auto">
            <Col>
              <Dropdown>

                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {this.state.formData.formDropdownSelection}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onSelect={this.dropdownHandler}
                    eventKey="chore"
                    href="#/action-1">
                    <Emoji emoji="🧹"/>
                    chore
                  </Dropdown.Item>

                  <Dropdown.Item
                    onSelect={this.dropdownHandler}
                    eventKey="work"
                    href="#/action-2">
                    <Emoji emoji="💼"/>
                    work
                  </Dropdown.Item>

                  <Dropdown.Item
                    onSelect={this.dropdownHandler}
                    eventKey="self-care"
                    href="#/action-3">
                    self care
                  </Dropdown.Item>

                </Dropdown.Menu>
              </Dropdown>
            </Col>

            <Col>
              <input
                id="formDueDate"
                type="date"
                className="form-control"
                onChange={(event) =>
                  this.formOnChange(event, "formDueDate")}
                placeholder={this.state.formData.formDueDate}/>
            </Col>

            <Button
              variant="primary"
              onClick={this.btnOnClick}>
              Submit
            </Button>
          </Form.Row>

      </Form>
    );
  }
}

export default PostTask;
/*<div className="col">
              <input
                id="formTaskName"
                type="text"
                className="form-control"
                onChange={(event) =>
                  this.formOnChange(event, "formTaskName")}
                placeholder={this.state.formData.formTaskName}/>
            </div>*/
