import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import MovieDetail from "./pages/MovieDetail";
import Profile from "./pages/Profile";
import React from "react";
import Signup from "./pages/Signup";
import store from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// src/App.jsx

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* sabhi pages Layout ke andar */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/movie/:id" element={<MovieDetail />} />

            {/* ✅ new forgot password route */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
