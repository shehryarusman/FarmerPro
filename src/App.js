import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import MainPage from "./component/MainPage";
import SignUp from "./component/SignUp";
import ErrorPage from "./component/ErrorPage";
import Dashboard from "./component/Dashboard";
import About from "./component/About";
import Nav from "./component/Nav";
import News from "./component/Article";
import ProductRecomendation from "./component/ProductRecomendation";
import LoginPage from "./component/LoginPage";
import DiseaseClassifier from "./component/RecyclePage";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="FarmerPro/login" element={<LoginPage />} />
        <Route path="FarmerPro/signup" element={<SignUp />} />
        <Route path="FarmerPro/dashboard" element={<Dashboard />} />
        <Route path="FarmerPro/about" element={<About />} />
        <Route path="FarmerPro/news" element={<News />} />
        <Route path="FarmerPro/home" element={<MainPage />} />
        <Route path="FarmerPro/product" element={<ProductRecomendation />} />
        <Route path="FarmerPro/detect" element={<DiseaseClassifier />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
