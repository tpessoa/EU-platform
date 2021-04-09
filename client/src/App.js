import React from "react";

import GlobalStyle from "./globalStyles";
import ScrollToTop from "./components/scrollToTop";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Videos from "./pages/Videos";
import Book from "./pages/Book";
import Poll from "./pages/Poll";
import AdminDashboard from "./pages/Admin";
import VideoGallery from "./components/Videos/VideoGallery";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <GlobalStyle />
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/games" component={Games} />
        <Route exact path="/videos" component={Videos} />
        <Route exact path="/videos/category" component={VideoGallery} />
        <Route path="/book" component={Book} />
        <Route path="/poll" component={Poll} />
        <Route path="/admin" component={AdminDashboard} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
