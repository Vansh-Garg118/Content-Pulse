import React, { PureComponent, useEffect, useState } from 'react';
import functionality from '../appwrite/functionality';
import { PostCard,Container } from '../components';
import { useSelector } from 'react-redux';
export default function Home(){
    const [post,setpost]=useState([])
    const user=useSelector((state)=>(state.auth.userData));
    // console.log(user)

    useEffect(()=>{
        console.log("useeffect ")
        if(user){
            functionality.listpost()
            .then((posts)=>{
                if(posts) setpost(posts.documents);
                // console.log(posts.documents);
            }
            )
        }
        else{
            setpost([])
        }
        console.log(post)
    },[user])
    if (post.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center min-h-96">
                <Container>
                    <div className="flex flex-wrap justify-center align-middle w-full">
                        {/* <div className="p-2 w-full"> */}
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        {/* </div> */}
                    </div>
                </Container>
            </div>
        )
    }
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap'>
                        {post.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                            {/* {console.log(post)} */}
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )
}
