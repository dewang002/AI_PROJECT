import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/User.context'

function UserAuth({children}) {
    const [loading, setLoading] = useState(true)
    const {user} = useContext(UserContext)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    useEffect(()=>{
        if(user){
            setLoading(false)
        }
        if(!user){
            navigate('/login')
        }
        if(!token){
            navigate('/login')
        }
    },[])
    
    if(loading){
        return <div>loading...</div>
    }
  return (
    <>
     {children}
    </>
  )
}

export default UserAuth