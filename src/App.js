import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

import PostTask from './PostTasks/PostTask'
import * as sap from './sap';
import data from './tasks'
import TodoList from './TodoList/TodoList'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import sprout from './sprout.png';

class App extends Component {
  componentDidMount() {
    this.getData();
  }

  state = {
    networkError: false,
    httpResponse: '',
    hw: 'testing Hello World!',
    myTask: "page now shows form submissions!"
  }

  getData() {

    sap.get((responseText) => {
      if (responseText === null) {
        console.log('trouble with GET request');
        this.setState({
          networkError: true
        });
        return;
      }

      // update the state of the component with the result here
      this.setState({
        networkError: false,  // reset the error flag if it was set
        httpResponse: responseText
      });
    });

  }

  // will eventually be removed when I get PostTask.js working properly
  postData(data) {
    console.log('pushed button');
    /*
    data.push({
      tag: 'chore',
      taskName: 'aaa',
      taskDescription: '',
      dueDate: ''
      })
    */
    const dataStr = JSON.stringify(data);
    sap.post(dataStr, (responseText) => {
      if (responseText === null) {
        console.log('Something went wrong');
      }
      if (responseText === '') {
        console.log('POST worked!');
        this.setState({
          httpResponse: dataStr
        });
      }
    });
  }

  receiveForm(newTask) {
    // do a thing to add the new task to the existing data
    for (const t in newTask) {
      console.log(`${t}: ${newTask[t]}`);
    }
    // console.log(this.state.httpResponse);
    let allTasks = [];
    if (this.state.httpResponse !== '') {
      allTasks.push(...JSON.parse(this.state.httpResponse));
    }
    allTasks.push(newTask)
    console.log(allTasks);
    this.postData(allTasks);
  }

  render() {
    return (
      <div className="App container">
        <h1>Tree</h1>
        <p>The start of a lovely journey</p>
        <img src={sprout} className="Sprout" alt={"Logo, a little sprout"} />
        <br /><br /><br />

        <h2>{this.state.myTask}</h2>
        <br /><br />

        <TodoList
          response={this.state.httpResponse}
          netError={this.state.networkError} />
        <br />

        <PostTask
          tasks={this.state.httpResponse}
          onSubmit={this.receiveForm.bind(this)} />

        <br />
        <Button
          variant="outline-primary"
          onClick={ () => this.postData(data) }>POST to db
        </Button>
      </div>
    );
  }

}

export default App;
