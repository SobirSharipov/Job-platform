"use client"
import React, { useState } from 'react'

const MenuDrawer = () => {
  let [menu,setmenu]=useState(false)
  return (
    <div>
      <button onClick={()=>setmenu(true)} className='text-3xl text-white md:hidden'>&#9776;</button>
      {menu && (
        <div>
          
        </div>
      )}
    </div>
  )
}

export default MenuDrawer