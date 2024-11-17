import React, { useState, useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './Redux/authSlice';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Model from "./Pages/Model";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import MyProfile from "./Pages/Profile";
import Payment from "./Pages/Payment";

const App = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);

  useEffect(() => {
         dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/profile" element={authUser ? <MyProfile /> : <Navigate to="/" />} />
        <Route path="/check" element={authUser ? <Model /> : <Navigate to="/signup" />}/>
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
