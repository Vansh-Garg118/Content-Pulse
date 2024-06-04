import React, { PureComponent } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import authservice from '../../appwrite/auth'
import store from '../../store/store';
import { logout } from '../../store/authslice';

function LogoutBtn(){

    const dispatch=useDispatch();
    

    const logoutHandler=()=>{
        authservice.logout()
        .then(()=>dispatch(logout()))
    }

    return(
        <>
        <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
        </>
    )
}
export default LogoutBtn