import { setAllProjects } from "@/redux/slice/projectSlice";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export const useFetchProjects = ()=>{
    const dispatch = useDispatch();
    const {allProjects} = useSelector((state)=>state.project)
    const fetchProjects = async()=>{
        try {
            const response = await axios.get("http://localhost:4000/api/v1/project/getAll");
            if(response?.data?.success){
                dispatch(setAllProjects(response?.data?.allProject))
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchProjects();
    },[dispatch])
}