import React, { Component } from 'react';
import "./App.css"

import Axios from 'axios';
import {
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

import Game from './containers/Game/Game';
import Games from './containers/Games/Games';
import NoMatch from './components/NoMatch/NoMatch';

class App extends Component {

  state = {
    name: "",
    file: "",
  }

  getResp = () => {
    Axios.get("http://localhost:8080/users/ping")
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  send = () => {
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
      <div className="App">
        {/*
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
                  this.setState({ file: event.target.files[0] })
                }}
              />
            </div>
          </form>
          <button onClick={() => this.send()}>Send</button>
        </div>
        */}
        <nav>
          <ul style={{ listStyle: 'none', margin: 'auto', padding: '0' }}></ul>
          <li style={{ margin: '10px', display: 'inline-block' }}></li>
          <Link to='/games'>Jogos</Link>
        </nav>
        <Switch>
          <Route path='/games' component={Games} />

          <Redirect from='/all-games' to='/games' />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default App;
