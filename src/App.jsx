import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/home/Home'
import Products from './components/products/Products'
import NavigationBar from './components/shared/NavigationBar'
import About from './components/About'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path='/' element={ <Home /> }/>
        <Route path='/products' element={ <Products /> }/>
        <Route path='/about' element={ <About /> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
