import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';
import authservice from '../appwrite/auth';
import { login } from '../store/authslice'
import { useForm } from 'react-hook-form';
import Input from './Input';
import Btn from './Btn';
import Logo from './Logo';

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {register, handleSubmit} = useForm();
    const [error, seterror] = useState("");

    const signup = async (data) => {
        // console.log("Signup function invoked")
        seterror("");
        try {
            const user = await authservice.createAccount(data)
            if (user) {
                // console.log("Account ceated");
                const userData = await authservice.currentstatus()
                console.log(userData);
                if (userData) {
                    // Console.log("userdata found")
                    dispatch(login(userData))
                    navigate("/")
                }
            }
        } catch (error) {
            seterror(error.message)
        }
    }

    return (
        <>
            <div className="flex items-center justify-center">
                <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                    <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
                    </div>
                    <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                    <p className="mt-2 text-center text-base text-black/60">
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                    <form onSubmit={handleSubmit(signup)}>
                        <div className='space-y-6'>
                            <Input
                                label="email"
                                type="email"
                                placeholder="enter your email"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPattern: (val) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val) ||
                                            "Enter valid emial",
                                    }
                                })}
                            />

                            <Input
                                placeholder="Enter Full name"
                                type="text"
                                label="Full Name"
                                {...register("name", {
                                    required: true
                                })}
                            />

                            <Input
                                placeholder=" Enter Password"
                                label="Password"
                                type="password"
                                {...register("password", {
                                    required: true
                                })}
                            />
                            <div className='flex justify-center align-center'>

                            <Btn type="submit" children="Sign Up" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Signup