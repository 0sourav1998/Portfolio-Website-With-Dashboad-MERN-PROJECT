import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    allApplications : [] 
}

const applicationSchema = createSlice({
    name : "application",
    initialState ,
    reducers : {
        setAllApplications : (state,action)=>{
            state.allApplications = action.payload
        }
    }
});

export const {setAllApplications} = applicationSchema.actions ;
export default applicationSchema.reducer;