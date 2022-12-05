import React from 'react'
import { useEffect } from 'react'

const ErickRv = () => {
    useEffect(()=>{
        console.log("Hola Soy Erick Romaña")
    },[])
  return (
    <div>
        <h1> Erick Romaña </h1>
        <h3> Desarrollador Web </h3>
    </div>
  )
}

export default ErickRv