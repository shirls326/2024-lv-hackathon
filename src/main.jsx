// react
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import UploadPage from './pages/images/UploadPage';
import DisplayResultComponent from './components/DisplayResults';
import QRCodePage from './pages/qr-code/QRCodePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Landing from './pages/landing/Landing';
import Login from './pages/login/login';
import SignUp from './pages/signup/signup';
import Profile from './pages/profile/Profile';
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
        <Route path="/" element={<Landing />}/>
        <Route path="/qr" element={<QRCodePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/result" element={<DisplayResultComponent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Listings />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/newproduct/" element={<NewProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
