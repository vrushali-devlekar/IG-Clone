import { useState } from 'react'
import '../style/form.scss'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'

export default function Login() {

  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
const navigate = useNavigate()
  const { handleLogin, user, loading } = useAuth();

  if(loading){
    return(
      <h1>Loading...</h1>
    )
  }


  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(username, password).then((res) => {
      console.log(res);
      navigate("/")
    });
  }
  return (
    <main>
      
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
          onInput={(e)=>{setusername(e.target.value)}}
          type="text" name="username" placeholder="Enter your name" />

          <input
          onInput={(e)=>{setpassword(e.target.value)}}
           type="password" name="password" placeholder="Enter password" />

          <button type="submit">Login</button>
        </form>
        <p>Don't have an account ? <Link className='toggleAuthForm' to="/register">Register</Link> </p>
      </div>
    </main>
  )
}