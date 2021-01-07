import React, { Component } from 'react'
import './App.css';
import sprout from './sprout.png';

class App extends Component {
  componentDidMount() {
    this.getData();
  }

  state = {
    html: new XMLHttpRequest(),
    httpResponse: "err",
    hw: 'testing Hello World!',
    address: 'http://localhost:8080'
  }

  getData() {

    // create a new XMLHttpRequest
    const xhr = new XMLHttpRequest();
    const url = this.state.address;

    // event listener functions
    const onLoad = () => {
      // update the state of the component with the result here
      console.log(xhr.responseText);

      this.setState({
        // httpResponse : xhr.responseText
        html: xhr
      });
        console.log('setState, httpResponse: ' + xhr.responseText);
    };

    const onProgress = () => {
      console.log("loading...");
    }

    // get a callback when the server responds
    xhr.addEventListener('load', onLoad);
    xhr.addEventListener('progress', onProgress);

    // open the request with the verb and the url
    xhr.open('GET', url);
    // send the request
    xhr.send();

  }


  render() {
    console.log("rendering...")
    return (
      <div className="App">
        <h1>Tree</h1>
        <p>The start of a lovely journey</p>
        <img src={sprout} className="Sprout" alt={"Logo, a little sprout"} />
        <br /><br />
        <h2>http request</h2>
        <p>{this.state.html.responseText}</p>
        <p>{this.state.hw}</p>
      </div>
    );
  }

}

export default App;
