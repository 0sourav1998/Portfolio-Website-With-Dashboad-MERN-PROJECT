import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { Eye, Pen, Trash2 } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { setAllProjects } from '@/redux/slice/projectSlice'
import { Link, useNavigate } from 'react-router-dom'

const ManageProjects = () => {
  const {allProjects} = useSelector((state)=>state.project);
  const {token}= useSelector((state)=>state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDeleteProject = async(id)=>{
    try {
      const response = await axios.delete(`http://localhost:4000/api/v1/project/delete/${id}`,{
        headers : {
          Authorization : `Bearer ${token}`
        }
      });
      if(response?.data?.success){
        toast.success(response?.data?.message);
        const updatedProjects = allProjects?.filter((project)=>project._id !== response?.data?.deletedProject._id);
        dispatch(setAllProjects(updatedProjects))
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Manage Your Projects</CardTitle>
          <CardTitle>
            <Link to="/">
              <Button>Return To Dashboard</Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>
              Your Listed Projects
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Project Banner</TableHead>
                <TableHead>Name Of Project</TableHead>
                <TableHead>Stack</TableHead>
                <TableHead>Is Deployed?</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                allProjects?.map((project)=>(
                  <TableRow key={project._id}>
                    <TableCell><img src={project.projectImage} className='h-12 w-12' alt={project.title}/></TableCell>
                    <TableCell>{project.title}</TableCell>
                    <TableCell>{project.stack}</TableCell>
                    <TableCell>{project.deployed}</TableCell>
                    <TableCell className="text-right space-x-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button onClick={()=>navigate(`/project/view/${project._id}`)} className="h-6 w-6 p-1 bg-green-500 rounded-full hover:bg-green-700 hover:scale-110 transition-all duration-200"><Eye/></Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button onClick={()=>navigate(`/project/update/${project._id}`)} className="h-6 w-6 p-1 bg-yellow-400 rounded-full hover:bg-yellow-600 hover:scale-110 transition-all duration-200"><Pen/></Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button onClick={()=>handleDeleteProject(project._id)} className="h-6 w-6 p-1 bg-red-500 rounded-full hover:bg-red-700 hover:scale-110 transition-all duration-200"><Trash2/></Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default ManageProjects
