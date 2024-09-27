import { setAllProjects } from "@/redux/slice/projectSlice";
import { setAllSkills } from "@/redux/slice/skillSchema";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export const useFetchSkills = ()=>{
    const dispatch = useDispatch();
    const {allSkills} = useSelector((state)=>state.skill)
    const fetchSkills= async()=>{
        try {
            const response = await axios.get("http://localhost:4000/api/v1/skill/getAll");
            if(response?.data?.success){
                dispatch(setAllSkills(response?.data?.getAllSkill))
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchSkills();
    },[dispatch])
}