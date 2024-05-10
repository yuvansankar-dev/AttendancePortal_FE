import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Components/Login/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Components/Register/Register'
import Main from './Components/Main/Main'
import Home from './Components/Home/Home'
import Attendance from './Components/Attendance/Attendance'
import Userdetail from './Components/Userdetail/Userdetail'
import Navigation from './Components/Navigation/Navigation'
import { Provider } from 'react-redux'
import store from './Store/Store'

function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Navigation />}>
              <Route path='/' element={<Main />}>
                <Route path='/' element={<Home />} />
                <Route path='/attendance' element={<Attendance />} />
                <Route path='/userdetail' element={<Userdetail />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
