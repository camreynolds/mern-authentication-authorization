import React, {useState} from "react"
import {Form, Button} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import "./Login.css"

const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password:""
  })

  const handleInputChange = (event)=>{
    const {name,value} = event.target
    setFormData({
      ...formData,
      [name]:value
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()

    try{
      const response = await fetch("/auth/login",{
        method: "POST",
        body: JSON.stringify(formData),
        headers:{
          "Content-Type":"application/json"
        }
      })

      const result = await response.json()
      console.log(result)

      if(result.user._id){
        navigate("/dashboard")
        localStorage.setItem("token", result.token)
      }else{
        console.error("Invalid credentials.");
      }
    }catch(error){
      console.error(error.message);
    }finally{
      setFormData({
        email:"",
        password:""
      })
    }
  }

  return (
   <>
    <div className="center-form">
      <Form onSubmit={handleSubmit}>

        <h1>Login</h1>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"          
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="dark" type="submit" className="w-100">Login</Button>
      </Form>
    </div>
   </>
  )
}

export default Login