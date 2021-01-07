import React, { Component } from 'react'
import './App.css';
import sprout from './sprout.png';
import * as sap from './sap';

class App extends Component {
  componentDidMount() {
    this.getData();
  }

  state = {
    networkError: false,
    httpResponse: 'loading...',
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

      console.log('setState, httpResponse: ' + responseText);

      // update the state of the component with the result here
      this.setState({
        networkError: false,  // reset the error flag if it was set
        httpResponse: responseText
      });
    });

  }

  postData() {
    console.log('pushed button');
    const data = 'POST from button ' + Math.floor(Math.random() * 100);

    sap.post(data, (responseText) => {
      if (responseText === null) {
        console.log('Something went wrong');
      }
      if (responseText === '') {
        console.log('POST worked!');
        this.setState({
          httpResponse: data
        });
      }
    });
  }

  render() {
    console.log("rendering...")

    let responsePresentation = this.state.httpResponse;

    if (responsePresentation === '') {
      responsePresentation = '(empty database)';
    }

    if (this.state.networkError) {
      responsePresentation = '(network error)';
    }

    return (
      <div className="App">
        <h1>Tree</h1>
        <p>The start of a lovely journey</p>
        <img src={sprout} className="Sprout" alt={"Logo, a little sprout"} />
        <br /><br />
        <h2>http request</h2>
        <p>{responsePresentation}</p>
        <p>{this.state.hw}</p>
        <button onClick={ () => this.postData() }>POST to db</button>
      </div>
    );
  }

}

export default App;
