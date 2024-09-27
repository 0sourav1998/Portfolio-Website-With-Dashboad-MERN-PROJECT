import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    allSkills : [] 
}

const skillSchema = createSlice({
    name : "skill",
    initialState ,
    reducers : {
        setAllSkills : (state,action)=>{
            state.allSkills = action.payload
        }
    }
});

export const {setAllSkills} = skillSchema.actions ;
export default skillSchema.reducer;