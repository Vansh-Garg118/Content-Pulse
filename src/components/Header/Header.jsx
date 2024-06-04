import React, { PureComponent } from 'react';
import { Container, LogoutBtn, Logo, } from '../index'
import { useSelector, useDispatch } from 'react-redux'
import store from '../../store/store';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    // const state=useSelector(state=>state.auth)
    // console.log(state);
    const auth=useSelector((state)=>(state.auth))
    // console.log(auth)  
    // console.log(auth.userData.name)
    var username=undefined;
    const navigate = useNavigate()

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !auth.status
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !auth.status
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: auth.status,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: auth.status,
        },
    ]


    return (
        <>
            <header className='py-3 shadow bg-gray-500 w-full'>
                <Container>
                    <nav className='flex'>
                        <div className='mr-4'>
                            <Link to='/'>
                                <Logo />
                            </Link>
                        </div>
                        <div>
                            {
                                auth.status &&
                                <div className='inline-bock px-6 py-2 '>
                                {auth.userData.name}
                                </div>
                            }
                        </div>
                        <ul className='flex ml-auto'>
                            {
                                navItems.map((item) => (
                                    item.active ? (
                                        <li key={item.name} >
                                            <button type="button"
                                             onClick={()=>(navigate(item.slug))} 
                                            className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                                                {item.name}
                                            </button>
                                        </li>
                                    ) : null
                                ))
                            }

                            {
                                auth.status &&
                                <div>
                                    <LogoutBtn />
                                </div>
                            }
                        </ul>
                    </nav>
                </Container>
            </header>
        </>
    )
}
export default Header