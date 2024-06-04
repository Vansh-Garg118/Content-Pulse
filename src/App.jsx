
import { useEffect, useState } from 'react'
import './App.css'
import {useDispatch} from 'react-redux'
import authservice from './appwrite/auth';
import { login,logout } from './store/authslice';

import {Header,Footer} from './components'
import { Outlet } from 'react-router-dom';



function App() {

  const [loading,setloading]=useState(true);
  const dispatch=useDispatch()

  useEffect(()=>{
    authservice.currentstatus()
    .then(
      (userdata)=>{
        if(userdata){
          dispatch(login(userdata));
        }
        else{
          dispatch(logout());
        }
      }
    )
    .finally(()=>(setloading(false)))

  },[])

  
  

  return !loading ? (
    <div className=' flex flex-wrap content-center bg-slate-600  height:100dvh'>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  ): <div className='min-h-scr flex flex-wrap content-center bg-neutral-900 text-amber-700'>loi na bacha ho jayga error dhundh</div>
}

export default App
