import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice"
import messageReducer from "../slice/messageSlice"
import timelineReducer from "../slice/timelineSlice"
import applicationReducer from "../slice/applicationSlice"
import skillReducer from "../slice/skillSchema"
import projectReducer from "../slice/projectSlice"

export const rootReducer = combineReducers({
    admin : userReducer ,
    allMessage : messageReducer ,
    timeline : timelineReducer ,
    application : applicationReducer ,
    skill : skillReducer ,
    project : projectReducer
})