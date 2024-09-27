import { setAllProjects } from "@/redux/slice/projectSlice";
import { setAllTimelines } from "@/redux/slice/timelineSlice";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export const useFetchTimelines = ()=>{
    const dispatch = useDispatch();
    const {allTimelines} = useSelector((state)=>state.timeline)
    const fetchTimeline = async()=>{
        try {
            const response = await axios.get("http://localhost:4000/api/v1/timeline/getAll");
            if(response?.data?.success){
                dispatch(setAllTimelines(response?.data?.allTimelines))
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchTimeline();
    },[dispatch])
}