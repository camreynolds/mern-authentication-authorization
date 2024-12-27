import './App.css';
// ract-router-dom
import {Routes,Route} from "react-router-dom"
// components
import Login from "./components/login/Login"
import Signup from "./components/signup/Signup"
import Dashboard from "./components/dashboard/Dashboard"
import Header from './components/header/Header'

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Signup/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </>
  );
}

export default App;
