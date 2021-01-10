import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

import * as sap from './sap';
import TodoList from './TodoList/TodoList'

import './App.css';
import sprout from './sprout.png';

class App extends Component {
  componentDidMount() {
    this.getData();
  }

  state = {
    networkError: false,
    httpResponse: '',
    hw: 'testing Hello World!',
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
    /*
    const num = Math.floor(Math.random() * 100);
    const data = `{
      "post ${num}": "POST from button",
      "post ${num + 1}": "POST from button"
       }`;*/
    const data =
      {
        task1: {
          tag: "chore",
          taskName: "Water plant",
          taskDescription: "",
          dueDate: "today"
        },
        task2: {
          tag: "work",
          taskName: "Udemy",
          taskDescription: "React course. At least 5 lectures!",
          dueDate: ""
        }
      };

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

  // returns json object
/*  parseData() {
  else
    {
      // responsePresentation = JSON.stringify(responsePresentation);
      console.log(responsePresentation);
      // let data = JSON.parse(responsePresentation);
      // console.log(data);
      // let toRender = "";
      // for (let k in data) {  // <--iterating keys
      //   toRender += `${k}: ${data[k]}\n`;
      // }
      // responsePresentation = toRender;
    }
  }

    return responsePresentation;
  }*/

  render() {
    // console.log("rendering...")

/*    let responsePresentation = this.state.httpResponse;
    let jsonObj = null;

    if (responsePresentation === '') {
      responsePresentation = '(empty database)';
    }
    else if (this.state.networkError) {
      responsePresentation = '(network error)';
    }
    else {
      console.log(responsePresentation);
      jsonObj = JSON.parse(responsePresentation);

      responsePresentation = (
        <div>
          {console.log(jsonObj)}
          {/!*Object has functions that return values that can be mapped:
            .keys(obj), .values(obj), .entries(obj)*!/}
          {Object.keys(jsonObj).map( (key)   => {
            return (
              <p>{key}: {jsonObj[key].taskName}</p>
            );
          })}
        </div>
      );
    }*/

    return (
      <div className="App">
        <h1>Tree</h1>
        <p>The start of a lovely journey</p>
        <img src={sprout} className="Sprout" alt={"Logo, a little sprout"} />
        <br /><br />

        <h2>http request</h2>
        <p>Hello hi</p>
        <p>{this.state.hw}</p>
        {/*{responsePresentation}*/}
        <TodoList
          response={this.state.httpResponse}
          netError={this.state.networkError} />
        <br />

        {/*{jsonJSX}*/}
        <br />

        <Button onClick={ () => this.postData() }>POST to db</Button>
      </div>
    );
  }

}

export default App;
