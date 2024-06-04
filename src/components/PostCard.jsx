import React, { PureComponent } from 'react';
import {Link} from 'react-router-dom'
import functionality from '../appwrite/functionality';

function PostCard($id){
    // console.log($id);
    
    return (
        <>
        <Link to={`/post/${$id.$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                {/* {console.log($id.image)} */}
                <div className='w-full  '>

                <img src={functionality.filePreview($id.image)} alt={$id.title}
                className='rounded-xl w-full max-h-52 ' />
                </div>

            </div>
            <h2
            className='text-xl font-bold'
            >{$id.title}</h2>
        </div>
        </Link>
        </>
    )
}

export default PostCard