import logo from './logo.svg';
import './App.css';
import {useEffect, useRef, useState, useContext} from 'react';
import InputForm from "./input/input"
import { MainContext } from './main';

function App() {
  const[username, setUsername] = useState("")
  const[password, setPassword] = useState("")
  const[Det, setDet] = useState({
    username: "",
    password: ""
  })
  const refUsername = useRef()
  const refPassword = useRef()

  const {setValid} = useContext(MainContext)

  const onSubmit = async (e) => {
    e.preventDefault()
    if(username && password){
      console.log(username)
      console.log(password)
      const result = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        header:{
          'content-type': 'application/json'
        },
        body : JSON.stringify({
          username: username,
          password: password
        }),
        credentials: "include"
      })
      .then(
        (value)=>value.json().then(
          (json) => json
        ))
        if (result.result==="pass"){
          setValid(true)
        }
    }
  }

useEffect(()=>{
  console.log(Det.username)
}, [Det])

  return (
    <form onSubmit={onSubmit} style={{
      display: "flex",
      flexDirection: "column"
    }}>
      <InputForm refInput={refUsername} value={username} label={"username"} onInput={(e)=>setUsername(e.target.value)}/>
      <InputForm refInput={refPassword} value={password} label={"password"} onInput={(e)=>setPassword(e.target.value)} type={"password"}/>
      <button type='submit'>Login</button>
      {Det.username}
    </form>
  );
}

export default App;
