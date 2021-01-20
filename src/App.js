import React, { Component } from 'react';
// import Button from 'react-bootstrap/Button'

import PostTask from './PostTasks/PostTask';
import * as sap from './sap';
// import data from './tasks'
import TodoList from './TodoList/TodoList';

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
    myTask: 'Tasks now listed by ascending date order'
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

  postData(data) {
    console.log('pushed button');

    let dataStr = JSON.stringify(data);
    if (data === '') {
      dataStr = data;
    }
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

  deleteData(taskIndex) {
    console.log("deleteData");
    console.log("row to delete: " + taskIndex);
    const json = JSON.parse(this.state.httpResponse);
    console.log(json.splice(taskIndex, 1));
    console.log(json);

    let toSetState = '';
    let toPost = '';

    if (json.length !== 0) {
      toSetState = JSON.stringify(json);
      toPost = json;
    }
    this.setState({
      httpResponse: toSetState
    });
    this.postData(toPost);

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

        <PostTask
          tasks={this.state.httpResponse}
          onSubmit={this.receiveForm.bind(this)} />
        <br />

        <TodoList
          response={this.state.httpResponse}
          netError={this.state.networkError}
          clicked={this.deleteData.bind(this)}/>
        <br />

        {/*<Button variant="outline-primary" onClick={ () => this.postData(data) }>POST to db</Button>*/}
      </div>
    );
  }

}

export default App;
