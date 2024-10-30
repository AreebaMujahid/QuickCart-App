import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import Contact from './Components/Contact'
import { BrowserRouter } from 'react-router-dom';
import {Routes , Route} from 'react-router-dom';
import NotFound from './Components/NotFound';
import List from './pages/admin/products/List'
import MyForm from './Components/MyForm/MyForm'
import LoginForm from './Components/MyForm/LoginForm'
import AdminForm from './Components/MyForm/AdminForm.jsx/AdminForm'
import SignupDetails from './pages/admin/SignupDetails'
import CreateProduct from './pages/admin/products/CreateProduct'

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/admin/products" element={<List />} />
          <Route path="/NotFound" element={<NotFound />} />
          <Route path="/Signup" element={<MyForm/>} />
          <Route path="/Login"  element={<LoginForm/>}/>
          <Route path="/AdminForm" element={<AdminForm/>}/>
          <Route path="/admin/SignupUsers" element={<SignupDetails/>}/>
          <Route path="/admin/products/create" element={<CreateProduct/>}/>
          <Route path="/Home" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
