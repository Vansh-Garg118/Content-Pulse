import React, { PureComponent, useEffect, useState } from 'react';
import { PostCard,Container } from '../components';
import functionality from '../appwrite/functionality';
import {useSelector} from 'react-redux'
import { Query } from 'appwrite';

export default function AllPost() {
    const [post, setposts] = useState([]);
    const user=useSelector((state)=>(state.auth))
    console.log(user.userData);

    // Query.equal('userid',${user.userData.$id})
    useEffect(() => {
        functionality.listpost([Query.equal('userid',user.userData.$id)])
            .then((post) => {
                if(post) setposts(post.documents);
            })

}, [])

if(post.length===0){
    return (
        <div className="w-full py-8 mt-4 text-center min-h-96">
                <Container>
                    <div className="flex flex-wrap justify-center align-middle w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                You Don't have any Posts yet!!!
                            </h1>
                    </div>
                </Container>
            </div>
    )
}
return (
    <>
    <div>
        <Container>
            <div className='flex flex-wrap'>
                
                {console.log(post)}
                {post.map((post)=>(
                    <div key={post.$id}>
                        <PostCard {...post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>

    </>
)
}