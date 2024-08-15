
import { useEffect, useState } from 'react'
import Open from './pages/open'
import Home from './pages/home'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  const [isloged, setIsLoged] = useState(false)

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)

  useEffect(() => {
    console.log(user);
    if (user != null) {
      setIsLoged(true);
      dispatch({ type: 'GET_POSTS' })
    }
  }, [user])



  return (
    <>
      {isloged ? <Home /> : <Open />}
    </>
  )
}

export default App
