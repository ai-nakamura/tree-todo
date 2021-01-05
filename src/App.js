import React, { Component } from 'react'
import './App.css';
import sprout from './sprout.png';

class App extends Component {
  componentDidMount() {
    this.getData();
  }

  getData() {
    // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest()

    // get a callback when the server responds
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      console.log(xhr.responseText)
    })
    // open the request with the verb and the url
    xhr.open('GET', 'http://localhost:8080')
    // send the request
    xhr.send()
  }

  render() {
    return (
      <div className="App">
        <h1>Tree</h1>
        <p>The start of a lovely journey</p>
        <img src={sprout} className="Sprout" alt={"Logo, a little sprout"} />
      </div>
    );
  }

}

export default App;
