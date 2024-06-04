import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status:false,
    userData:{}
}

const authslice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            // console.log(action.payload.userData)
            state.status=true;
            state.userData=action.payload;
        },

        logout:(state,action)=>{
            state.status=false,
            state.userData=null
        }
    }
})

export  const {login,logout} = authslice.actions;
export default authslice.reducer;
