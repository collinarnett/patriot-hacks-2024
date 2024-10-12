import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Results from './components/Results';
import "./App.css";

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData | null>(null);

  return (
    <Routes>
      <Route path="/" element={<Home setFormData={setFormData} />} />
      <Route path="/display" element={<Results formData={formData} />} />
    </Routes>
  );
};

export default App;
