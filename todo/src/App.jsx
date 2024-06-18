import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { count } from './assets/atom';


function App(){
  

  useEffect(()=>{

    axios.get('https://sum-server.100xdevs.com/todos')
    .then(function (res){
   setTodos(res.data.todos) 
  },[])
}
  )
  
  return (
  <>
    <div>
   <h1>hiii</h1>   hi
      </div>
    {count}
  </>
    
    
  
  )
}

export default App
