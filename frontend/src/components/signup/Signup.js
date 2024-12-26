import React, {useState} from "react"
import {useNavigate} from "react-router-dom"
// bootstrap
import {Form, Button} from "react-bootstrap"
// css
import "./Signup.css"

const Signup = () => {
  const navigate = useNavigate()

  const [formData,setFormData] = useState({
    name:"",
    email:"",
    password:""
  })

  const handleInputChange = (event) =>{
    const {name,value} = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()

    try {
      const response = await fetch("/user/register",{
        method: "POST",
        body: JSON.stringify(formData),
        headers:{
          "Content-Type": "application/json"
        }
      })

      const result = await response.json()
      console.log(result) 
      
      if(result.user._id){
        navigate("/login")
      }

    } catch (error) {
      console.error(error.message)
    }finally{
      setFormData({
        name: "",
        email:"",
        password:""
      })
    }
  }

  return (
    <>
      <div className="center-form">
        <Form>
          <h1>Signup</h1>
          
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId='formBasicName'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button variant="dark" type="submit" className="w-100" onClick={handleSubmit}> 
            Signup
          </Button>

        </Form>
      </div>
    </>
  )
}

export default Signup