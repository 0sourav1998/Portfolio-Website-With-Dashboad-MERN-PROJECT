import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    allTimelines : [] 
}

const timelineSchema = createSlice({
    name : "timeline",
    initialState ,
    reducers : {
        setAllTimelines : (state,action)=>{
            state.allTimelines = action.payload
        }
    }
});

export const {setAllTimelines} = timelineSchema.actions ;
export default timelineSchema.reducer;