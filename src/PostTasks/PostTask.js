import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
// import Table from 'react-bootstrap/Table'

// make a form that takes info and POST it to server
class PostTask extends Component {
  state = {
    formData: {
      formDropdownSelection: 'select tag',
      formTaskName: 'task name',
      formDueDate: 'due date',
      formTaskDescription: 'task description'
    }
  }

  dropdownHandler = event => {
    const formDataCopy = {
      ...this.state.formData
    }
    formDataCopy.formDropdownSelection = event
    this.setState({
      formData: formDataCopy
    });
  }

  formOnChange = (event, id="formTaskName") => {
    // make a copy of formData object (avoid changing state until need be)
    const formDataCopy = {
      ...this.state.formData
  }

    // change data value
    formDataCopy[id] = event.target.value;

    // set state
    this.setState({
      formData: formDataCopy
    })
    console.log(`${id} ${formDataCopy[id]}`);

  }

  btnOnClick = event => {
    console.log(this.state.formData);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.btnOnClick}>
          <div className="row">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic" >
                {this.state.formData.formDropdownSelection}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onSelect={this.dropdownHandler}
                  eventKey="chore"
                  href="#/action-1">
                    chore
                </Dropdown.Item>
                <Dropdown.Item
                  onSelect={this.dropdownHandler}
                  eventKey="work"
                  href="#/action-2">
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

            <div className="col">
              <input
                id="formTaskName"
                type="text"
                className="form-control"
                onChange={ (event) =>
                  this.formOnChange( event,  "formTaskName") }
                placeholder={this.state.formData.formTaskName} />
            </div>
            <div className="col">
              <input
                id="formDueDate"
                type="text"
                className="form-control"
                onChange={ (event) =>
                  this.formOnChange( event,  "formDueDate") }
                placeholder={this.state.formData.formDueDate} />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <input
                id="formTaskDescription"
                type="text"
                className="form-control"
                onChange={ (event) =>
                  this.formOnChange( event,  "formTaskDescription") }
                placeholder={this.state.formData.formTaskDescription} />
            </div>

          </div>
        </form>

        <Button
          variant="primary"
          onClick={this.btnOnClick}>
            Submit
        </Button>

      </div>
    );
  }
}

export default PostTask;