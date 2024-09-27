import { setAllApplications } from "@/redux/slice/applicationSlice";
import { setAllProjects } from "@/redux/slice/projectSlice";
import { setAllSkills } from "@/redux/slice/skillSchema";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export const useFetchApplications = ()=>{
    const dispatch = useDispatch();
    const {allApplications} = useSelector((state)=>state.application)
    const fetchApplications= async()=>{
        try {
            const response = await axios.get("http://localhost:4000/api/v1/tool/getAll");
            console.log(response)
            if(response?.data?.success){
                dispatch(setAllApplications(response?.data?.allTools))
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchApplications();
    },[dispatch])
}