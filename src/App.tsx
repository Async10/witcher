import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./ui/pages/HomePage";
import UnoPage from "./ui/pages/UnoPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/uno/:id" element={<UnoPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
