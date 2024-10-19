// react
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Landing from './pages/landing/Landing';
import Listings from './pages/listings/Listings';
import Product from './pages/product/Product';
import NewProduct from './pages/newproduct/NewProduct';
import NotFound from './pages/404/NotFound';

// styles
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/products" element={<Listings />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/newproduct/" element={<NewProduct />} />
        <Route path="*" element={<NotFound />} />
        {/* EXAMPLES OF ROUTES (DON'T NEED TO USE THESE)
        <Route path='/' element={<>Hello!!!</>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={  <Dashboard/> } />
        <Route path='/compatability-checker' element={  <Checker/>} />
        <Route path='/gemini-chat-bot' element={  <ChatBotPage/> } />
        <Route path='/history' element={ <History/>  }/>
        <Route path='/settings' element={ <Settings/>  } />
        <Route path='/my-prescriptions' element={<Dashboard/>} />
        <Route path="*" element={<NotFound />} />
        */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
