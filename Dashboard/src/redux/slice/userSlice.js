import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null ,
    token : null ,
}

const userSlice = createSlice({
    name : "admin",
    initialState ,
    reducers : {
        setUser : (state,action)=>{
            state.user = action.payload
        },
        setToken : (state,action)=>{
            state.token = action.payload
        }
    }
});

export const {setToken,setUser} = userSlice.actions ;
export default userSlice.reducer;