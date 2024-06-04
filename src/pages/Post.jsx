import React, { PureComponent, useEffect, useState } from 'react';
import { useNavigate, useParams ,Link} from 'react-router-dom'
import { useSelector } from 'react-redux';
import functionality from '../appwrite/functionality';
import { Btn, Container, } from '../components';
import parse from 'html-react-parser';

export default function Post() {
    const [post, setpost] = useState(null)
    const navigate = useNavigate()
    const user = useSelector(state => state.auth);
    const slug = useParams();
    // console.log(slug)
    // console.log(post)

    useEffect(() => {
        if (slug) {
            functionality.getpost(slug)
                .then((post) => {
                    if (post) setpost(post);
                    else navigate('/')
                })
        }
        else {
            navigate('/')
        }
    }, [slug, navigate])
    // console.log(post)
    const deletePost = () => {
        functionality.deletepost(slug)
            .then((status) => {
                if (status) {
                    functionality.deletefile(post.image);
                    navigate('/');
                }
            })
    }

    const isAuthor= post && user ? post.userid===user.userData.$id :false
    return post ? (
        <div className=" w-full py-8">
            <Container>
                {/* {console.log(post)} */}
                <div className=" flex  mb-4 relative border rounded-xl p-2 col-span-2">
                    <div>
                        <img
                        src={functionality.filePreview(post.image)}
                        alt={post.title}
                        className="rounded-xl w-1/4 "


                        />
                    </div>
                    {isAuthor && (
                        <div className="relative right-0 top-0">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Btn bgcolor="bg-green-500" className="mr-3">
                                    Edit
                                </Btn>
                            </Link>
                            <Btn bgcolor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Btn>
                        </div>
                    )}
                </div>
                
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    <div>{post.userId}</div>
                    </div>
            </Container>
        </div>
    ) : null;
}