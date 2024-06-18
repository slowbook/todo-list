import { useState } from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import './App.css'
import axios from  'axios'
import {Signup} from './pages/signup'
import {Login} from './pages/Login'

  
  function App() {
    return (
      <>

         <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Login />} />
          </Routes>
        </BrowserRouter>
        
      </>
    )
  }


export default App
