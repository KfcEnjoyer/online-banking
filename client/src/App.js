import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import OpenAccount from "./pages/openAccount";

function App() {
  return (
      <div className="App">
        <Router>
          <Routes>
            {/* Define your routes here */}
            <Route path="/" element={<h1>Welcome Home</h1>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/openaccount" element={<OpenAccount />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
