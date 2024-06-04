import React, { PureComponent, useEffect, useState } from 'react';
import { PostForm,Container } from '../components';
import { useParams,useNavigate } from 'react-router-dom';
import functionality from '../appwrite/functionality';

export default function EditPost(){
    const [post,setPost]=useState(null);
    const navigate=useNavigate()
    const slug=useParams()
    // slug=slug.slug
    console.log(slug);

    useEffect(()=>{
        functionality.getpost(slug)
        .then((post)=>{
            console.log("KOO")
            console.log(post)
            if(post) setPost(post)
        })
        // .catch( navigate('/'))
    },[slug,navigate])

    return (
        <>
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
        </>
    )
}