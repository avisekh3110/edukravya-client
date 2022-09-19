import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard/:tab" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
