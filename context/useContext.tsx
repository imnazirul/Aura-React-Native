import { useContext } from 'react'
import { GlobalContext } from './GlobalProvider'

const useGlobalContext = () => {
    const contextInfo = useContext(GlobalContext)
  return contextInfo
}

export default useGlobalContext