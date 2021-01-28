import React, { Component } from 'react';
//import { Route, Switch } from 'react-router-dom';
import Axios from 'axios';

import "./App.css"

class App extends Component {

  state = {
    name: "",
    file: "",
  }

  send = (event) => {
    console.log("hereee");
    const data = new FormData();
    data.append("name", this.state.name);
    data.append("file", this.state.file);

    Axios.post("http://localhost:8080/admin/upload", data)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <form action="#">
          <div className="flex">
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              onChange={event => {
                this.setState({ name: event.target.value })
              }}
              />
          </div>
          <div className="flex">
            <label htmlFor="file">File</label>
            <input 
              type="file" 
              id="file" 
              accept=".jpg"
              onChange={event => {
                this.setState({ file: event.target.files[0]})
              }}
              />
          </div>
        </form>
        <button onClick={() => this.send()}>Send</button>
      </div>
    )
  }
}

export default App;
