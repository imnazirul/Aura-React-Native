import { View, Text } from 'react-native'
import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { getCurrentUser } from '@/lib/AppWrite';

export const GlobalContext = createContext(null)

const GlobalProvider = ({children}:{children: ReactNode}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<any>(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(()=>{
        getCurrentUser()
        .then((res)=>{
            setUser(res)
            setIsLoggedIn(true)
        })
        .catch((err)=>{
            console.log(err);
            setIsLoggedIn(false)
        }).finally(()=>{
            setIsLoading(false) })
    },[])

    const Info :any = {
        isLoading, 
        setIsLoading,
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn
    }

  return (
    <GlobalContext.Provider value={Info}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider