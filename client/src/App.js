import React from "react";
import GlobalStyle from "./globalStyles";
// import ScrollToTop from "./components/scrollToTop";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Videos from "./pages/Videos";

function App() {
  return (
    <Router>
      <GlobalStyle />
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
