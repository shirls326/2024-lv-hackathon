import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<>Hello!!</>}/> {/* 👈 Renders at /app/ */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
