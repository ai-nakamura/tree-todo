import React, { Component } from 'react'
// import Button from 'react-bootstrap/Button'

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
    myTask: "working on forms"
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

  postData() {
    console.log('pushed button');

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

  render() {
    return (
      <div className="App container">
        <h1>Tree</h1>
        <p>The start of a lovely journey</p>
        <img src={sprout} className="Sprout" alt={"Logo, a little sprout"} />
        <br /><br /><br />

        <h2>{this.state.myTask}</h2>
        {/*<p>Hello hi</p>*/}
        {/*<p>{this.state.hw}</p>*/}
        <br /><br /><br />
        <TodoList
          response={this.state.httpResponse}
          netError={this.state.networkError} />
        <br /><br />
        <PostTask />
        {/*<Button onClick={ () => this.postData() }>POST to db</Button>*/}
      </div>
    );
  }

}

export default App;
