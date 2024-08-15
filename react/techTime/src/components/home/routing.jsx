import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Open from '../../pages/open'
import Home from '../../pages/home'
import Posts from '../../pages/Posts'
import About from '../../pages/about'
import UserProfile from '../../pages/userProfile'
import PostForm from '../Posts/PostForm'
import PostDisplay from '../Posts/PostDisplay'



export default function Routing() {

  return (
    <div className="pageContainer">
        <Routes>
          <Route path='/home' element= {<Home/>}/>
          <Route path='/About' element ={<About />} />
          <Route path='/post/:id' element={<PostDisplay />}/>
          <Route path='/' element={<Posts/>}/>
          <Route path='/MyAccount' element={<UserProfile/>} />
          <Route path='/newPost' element={<PostForm />}/>
          <Route path='/open' element={<Open/>} >
          </Route>
        </Routes>
      
    </div>
  )
}
