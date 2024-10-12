import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Results from './components/Results';
import "./App.css";

const App: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  return (
    <Routes>
      <Route path="/" element={<Home setImage={setImage} />} />
      <Route path="/display" element={<Results image={image} />} />
    </Routes>
  );
};

export default App;
