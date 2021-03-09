import React from "react";
import GlobalStyle from "./globalStyles";
import ScrollToTop from "./components/scrollToTop";

import Home from "./components/pages/Home/Home";
import Games from "./components/pages/Games/Games";
import Videos from "./components/pages/Videos/Videos";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Footer, Navbar } from "./components";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <ScrollToTop />
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/games" component={Games} />
        <Route path="/videos" component={Videos} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
