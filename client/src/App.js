import React, { useState } from "react";

import GlobalStyle from "./globalStyles";
import ScrollToTop from "./components/scrollToTop";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Games from "./pages/Games";
import Videos from "./pages/Videos";
import Book from "./pages/Book";
import Poll from "./pages/Poll";
import AdminDashboard from "./pages/Admin";
import VideoGallery from "./components/Videos/VideoGallery";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/games" component={Games} />
        <Route exact path="/videos" component={Videos} />
        <Route exact path="/videos/category" component={VideoGallery} />
        <Route path="/book" component={Book} />
        <Route path="/poll" component={Poll} />
        <ProtectedRoute path="/admin" component={AdminDashboard} />
        <Route path="/" exact component={Home} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
