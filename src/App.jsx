import './App.css'
import NavBar from './NavBar'
import Body from './body'
import Login from './Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {Provider} from "react-redux"
import appStore from './utils/appstore'
import Feed from './Feed'
import Profile from "./Profile"
import Connections from './Connections'
import Request from './Request'


function App() {
  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<Body/>}>
          <Route path='/feed' element={<Feed/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/connections' element={<Connections/>}/>
          <Route path='/requests' element={<Request/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
