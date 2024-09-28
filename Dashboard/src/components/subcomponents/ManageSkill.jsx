import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Edit, Trash2 } from "lucide-react";
import { Progress } from "../ui/progress";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { setAllSkills } from "@/redux/slice/skillSchema";

const ManageSkill = () => {
  const { allSkills } = useSelector((state) => state.skill);
  const { token } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteSkill = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/skill/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        const updateSkills = allSkills?.filter(
          (skill) => skill._id !== response?.data?.deletedSkill?._id
        );
        dispatch(setAllSkills(updateSkills));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <CardTitle>Manage Your Skills</CardTitle>
          <Link to="/">
            <Button className="w-fit">Return To Dashboard</Button>
          </Link>
        </CardHeader>
        <CardContent>
          {allSkills && allSkills.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead>Proficiency</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allSkills.map((skill) => (
                  <TableRow key={skill._id}>
                    <TableCell>{skill.title}</TableCell>
                    <TableCell>
                      <img
                        src={skill.skillImage}
                        className="h-8 w-8"
                        alt="skill-icon"
                      />
                    </TableCell>
                    <TableCell>
                      <Progress value={skill.proficiency} />
                    </TableCell>
                    <TableCell className="text-right space-x-4">
                      <button
                        onClick={() => handleDeleteSkill(skill._id)}
                        className="bg-red-500 text-white rounded-full hover:bg-red-700 hover:scale-110 transition-all duration-200 p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={()=>navigate(`/editSkill/${skill._id}`)}
                        className="bg-blue-500 text-white rounded-full hover:bg-blue-700 hover:scale-110 transition-all duration-200 p-2"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="w-full h-32 flex items-center justify-center">
              <span className="text-2xl font-bold">No Skills Added So Far</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageSkill;
