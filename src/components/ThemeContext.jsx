"use client";
import { createContext, useContext, useEffect, useState } from 'react'


const ThemeContext =createContext()

export const ThemeProvider=({children})=>{
    let [darkMode,setDarkmode]=useState(()=>{
        let seved=localStorage.getItem('darkMode')
        return seved=="true"
    })

    useEffect(()=>{
        localStorage.setItem("darkMode",darkMode)

    },[darkMode])

    let toggleTheme=()=>setDarkmode(prev=>!prev)
    return (
        <ThemeContext.Provider value={{darkMode,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
export const useTheme=()=>useContext(ThemeContext)