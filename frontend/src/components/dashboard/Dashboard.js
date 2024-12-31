import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import {Container,Row,Col,Table} from "react-bootstrap"

const Dashboard = () => {
  const token = localStorage.getItem("token")
  console.log("Token:",token);
  
  const [user, setUser] = useState()
  const navigate = useNavigate()

  useEffect( ()=>{
    const fetchUser = async () =>{
      try{
        const response = await fetch("/api/user",{
          headers:{
            "Authorization": `Bearer ${token}`
          }      
        })
  
        const result = await response.json()
        console.log("Result:",result)
        setUser(result)
        
      }catch(error){
        console.error(error.message)
      }
    }

    if(token){
      fetchUser()
    }else{
      navigate("/login")
    }

  },[token,navigate])

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="text-center">Dashboard</h1>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {user && user.name && user.email && (
                <tr key={user._id}>
                  <td>{user.name}</td>    
                  <td>{user.email}</td>    
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard