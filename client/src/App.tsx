import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import {Dashboard} from './pages/dashboard';
import Login from './pages/login';

export default function App() {
  return <>
    <BrowserRouter>

        <Routes>
            <Route path='/' element={ <Dashboard /> } />
            <Route path='/login' element={ <Login /> } />
        </Routes>
    </BrowserRouter>
  </>
}
