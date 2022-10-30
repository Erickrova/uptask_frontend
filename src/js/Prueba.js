import { useEffect } from "react"
import React from 'react'

const Prueba = (App) => {
    useEffect(()=>{
        const texto = document.querySelector("#texto")
        texto.textContent="hola"
        texto.addEventListener("click",()=>{
          texto.textContent = "se mamo"
        })
    },[App])
  return {

  }
    
}

export default Prueba