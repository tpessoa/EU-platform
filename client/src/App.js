import React from "react";
import GlobalStyle from "./globalStyles";
// import ScrollToTop from "./components/scrollToTop";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Videos from "./pages/Videos";
import Book from "./pages/Book";
import VideoGallery from "./components/VideoGallery";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/games" component={Games} />
        <Route exact path="/videos" component={Videos} />
        <Route exact path="/videos/category" component={VideoGallery} />
        <Route path="/book" component={Book} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
