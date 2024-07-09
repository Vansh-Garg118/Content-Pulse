import { createSlice } from "@reduxjs/toolkit";

const initialState={
    posts:[{}]
}
const postslice=createSlice({
    name:"post",
    initialState,
    reducers:{
        addPost:(state,action)=>{
            state.posts=action.payload;
        },
        deletepost:(state,action)=>{
            state.posts=action.payload;
        },
        updatepost:(state,action)=>{
            state.posts=action.payload;
        }
    }
}

)