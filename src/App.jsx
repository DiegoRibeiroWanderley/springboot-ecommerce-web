import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/home/Home'
import Products from './components/products/Products'
import NavigationBar from './components/shared/NavigationBar'
import About from './components/About'
import Contact from './components/Contact'

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path='/' element={ <Home /> }/>
        <Route path='/products' element={ <Products /> }/>
        <Route path='/about' element={ <About /> }/>
        <Route path='/contact' element={ <Contact /> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
