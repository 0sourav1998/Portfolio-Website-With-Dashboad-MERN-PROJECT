import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    allProjects : [] 
}

const projectSchema = createSlice({
    name : "project",
    initialState ,
    reducers : {
        setAllProjects : (state,action)=>{
            state.allProjects = action.payload
        }
    }
});

export const {setAllProjects} = projectSchema.actions ;
export default projectSchema.reducer;