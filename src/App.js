import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import FullPost from "./components/FullPost";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token !== null && userData !== null) {
      setLoggedIn(true);
    }
  }, []);

  const loginHandleSubmit = async (e, userData) => {
    e.preventDefault();
    try {
      const response = await fetch("https://lively-moon-2540.fly.dev/api/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.user);
        setLoggedIn(true);
      } else {
        console.log(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {}, [loggedIn]);

  const userLogout = async () => {
    try {
      const request = await fetch("https://lively-moon-2540.fly.dev/api/logout", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const response = await request.json();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setLoggedIn(false);

      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <HashRouter basename="/admin">
        <NavBar loggedIn={loggedIn} userLogout={userLogout} />
        <div className="app-cms">
          <Routes>
            <Route
              path="/"
              exact
              element={
                loggedIn ? (
                  <Home />
                ) : (
                  <Login loginHandleSubmit={loginHandleSubmit} />
                )
              }
            />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/post" exact element={<CreatePost />} />
            <Route path="/posts/post/:id" element={<FullPost />} />
            <Route path="/posts/edit/:id" element={<EditPost />} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
