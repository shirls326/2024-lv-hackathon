import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import UploadPage from './pages/images/UploadPage';
import DisplayResultComponent from './Components/DisplayResult';
import QRCodeComponent from './Components/QRCodeBox';
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <Routes>
        {/* <Route path="/" element={<>Hello!!</>}/> */}
        <Route path="/" element={<QRCodeComponent />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/result" element={<DisplayResultComponent />} />
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
        */
        }
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
