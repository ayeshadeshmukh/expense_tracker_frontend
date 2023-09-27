import React, { useEffect } from 'react'

const Logout = () => {
    useEffect(() => {
      localStorage.removeItem("userinfo");
    
      
    }, [])
    
  return (
    <div>
      Logged out
    </div>
  )
}

export default Logout

