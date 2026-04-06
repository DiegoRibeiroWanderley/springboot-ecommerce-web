import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/home/Home'
import Products from './components/products/Products'
import NavigationBar from './components/shared/NavigationBar'
import About from './components/About'
import Contact from './components/Contact'
import { Toaster } from 'react-hot-toast'
import Cart from './components/cart/Cart'
import Login from './components/auth/Login'
import { useDispatch } from 'react-redux'
import api from './api/api'
import { currentUser } from './store/actions'
import { PrivateRoute } from './components/PrivateRout'
import { Register } from './components/auth/Register'

function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await api.get("/carts/users/cart")
        
        dispatch({type: "ADD_CART", payload: cart.data})
      } catch (error) {
        console.log("Error fetching cart");
      }
    }

    dispatch(currentUser())

    fetchCart()
  }, [dispatch])

  return (
    <React.Fragment>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path='/' element={ <Home /> }/>
          <Route path='/products' element={ <Products /> }/>
          <Route path='/about' element={ <About /> }/>
          <Route path='/contact' element={ <Contact /> }/>
          <Route path='/cart' element={ <Cart /> }/>
          <Route path='/' element={<PrivateRoute publicPage />} >
            <Route path='/login' element={ <Login /> }/>
            <Route path='/register' element={ <Register/> }/>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position='bottom-center'/>
    </React.Fragment>
  )
}

export default App
