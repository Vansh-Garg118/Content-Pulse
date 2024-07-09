import React, { PureComponent, useState } from 'react';
import { Input, Logo, Btn } from './index'
import authservice from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login as storelogin } from '../store/authslice';
import {useForm} from 'react-hook-form'


function Login() {
    const navigate = useNavigate();
    const [error, seterror] = useState("");
    const dispatch = useDispatch();
    const {register,handleSubmit}=useForm();
    // console.log("come into login component")


    const login = async (data) => {
        seterror("")
        try {
            const user = await authservice.login(data);
            // console.log(user);
            if (user) {
                const userData = await authservice.currentstatus();
                // console.log(userData);
                if (userData) {
                    dispatch(storelogin(userData))
                    navigate("/");
                }
            }
        } catch (error) {
            seterror(error.message);
        }

    }
    return (
        <>
            <div className='flex items-center justify-center w-full'>
                <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                    <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
                    </div>
                    <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                    <p className="mt-2 text-center text-base text-black/60">
                        Don&apos;t have any account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                    <form onSubmit={handleSubmit(login)}>
                        <div className='space-y-6'>
                            <Input 
                            label="email" 
                            placeholder="Enter your email"
                            type="email"
                            {...register("email",
                        {
                            required:true,
                            validate:{
                                matchPattern :(val)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val)||
                                "Enter valid emial",
                            }

                        })}
                            />

                            <Input
                            label="Password"
                            type="password"
                            placeholder="Enter password"
                            {...register("password",{
                                required:true
                            })} />

                            <Btn  
                            type="submit"
                            children="signin"
                            />
                            <div>{error}</div>
                        </div>
                    </form>
                </div>
            </div>
            </>
            )
}

export default Login