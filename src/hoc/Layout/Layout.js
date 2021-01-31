import React, { Component } from 'react';

class Layout extends Component {

  render() {
    return (
      <div>

        <div> ??? Back end dealer...?????
          If we split it like this, then anyone can access the data
          I think...? That's ok right?

          <div>network manager
            <p>sap - connects to data</p>
          </div>
          <p>data manager? - mutates data</p> {'aka the model'}
            <p>JSON.stringify(response) === []!!!!</p>

        </div>


        <div>Layout

          <p>Logo (styled to the side)</p>
          <div>Task List {'data manager?'}
            <div>
              state: data, tags
            </div>
            <div>Nav bar</div>
            <div>Header
              <p>Sort option</p>
            </div>
            <p>Todo</p>
            <p>Todo</p>
            <div>Edit Todo
              <p>Dropdown</p>
              <p>task name field</p>
              <p>task description field</p>
              <p>due date field</p>
              <p>submit button</p>
            </div>
          </div>

        </div>

      </div>
    )
  }
}

export default Layout;