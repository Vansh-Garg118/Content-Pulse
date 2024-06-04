import React, { useEffect, useCallback } from 'react';
import functionality from '../appwrite/functionality';

import {Btn, RTE} from './index'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {Input ,Select} from './index';

export default function PostForm ({post}){      
    console.log(post);
    const {register,handleSubmit,watch,control,setValue,getValues,reset}=useForm({
        defaultValues:{
            title:post?.title||"",
            content:post?.content ||"",
            slug:post?.$id ||"",
            status:post?.status ||"active"
        }
    })
    const navigate=useNavigate();
    const user=useSelector((state)=>(state.auth.userData))

    useEffect(()=>{
        if(post){
            reset(
                {
                    title:post?.title||"",
            content:post?.content ||"",
            slug:post?.$id ||"",
            status:post?.status ||"active"
                }
            )
        }
    },[post,reset])

    const submit= async(data)=>{
        if(post ){
            // console.log(data)
            // console.log(post)
            const file=data.image[0]? await functionality.updatefile(data.image[0]) : null
            // console.log(post.$id)
           const dbpost=functionality.updatePost(post.$id,{
            ...data,
            userId:user.userid,
            image: file? file.$id :undefined
           })
           navigate(`/post/${post.$id}`)
        }
        else{
            const file=data.image[0]? await functionality.uploadfile(data.image[0]): null;
            // console.log("Image uploaded");
            // console.log(user); 
            // console.log(post); 
            console.log(file)

            const dbpost = await functionality.addPost({
                ...data,
                image:file? file.$id :undefined,
                userid:user.$id
            })
            console.log("Post ")
            if(dbpost){
                // console.log("post uploaded successfully")
                navigate(`/post/${dbpost.$id}`)
            }
        }
    }

    const slugtransform=useCallback((value)=>{
        if(value && typeof(value==="string")){
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d]+/g, "_")
        }
    },[])

    useEffect(()=>{
        const sub=watch((value,{name})=>{
            if(name==='title'){
                setValue("slug",slugtransform(value.title),{shouldValidate:true});
            }

        })

        return ()=>sub.unsubscribe()
    },[watch,slugtransform,setValue])

    

    

    return (
        <>
         <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugtransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={functionality.filePreview(post.image)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Btn type="submit" bgcolor={post ? "bg-green-500" : "bg-neutral-700 "} className="w-full">
                    {post ? "Update" : "Submit"}
                </Btn>
            </div>
        </form>
        </>
    )
}