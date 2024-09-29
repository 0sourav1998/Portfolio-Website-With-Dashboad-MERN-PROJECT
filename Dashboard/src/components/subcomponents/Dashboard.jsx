import { useFetchProjects } from "@/hoks/useFetchProjects";
import { useFetchSkills } from "@/hoks/useFetchSkills";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Tabs, TabsContent } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { useFetchApplications } from "@/hoks/useFetchSoftwareApp";
import { useFetchTimelines } from "@/hoks/useFetchTimeline";
import toast from "react-hot-toast";
import axios from "axios";
import { setAllSkills } from "@/redux/slice/skillSchema";
import { setAllApplications } from "@/redux/slice/applicationSlice";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  useFetchProjects();
  useFetchSkills();
  useFetchApplications();
  useFetchTimelines();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allProjects } = useSelector((state) => state.project);
  const { allSkills } = useSelector((state) => state.skill);
  const { allApplications } = useSelector((state) => state.application);
  const { allTimelines } = useSelector((state) => state.timeline);
  const { user } = useSelector((state) => state.admin);
  const { token } = useSelector((state) => state.admin);
  const handleDeleteApp = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/tool/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        const updatedApp = allApplications?.filter(
          (app) => app._id !== response?.data?.deletedTool?._id
        );
        dispatch(setAllApplications(updatedApp));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="flex flex-col gap-6 md:w-full w-[90%] mx-auto">
      <div className="flex md:flex-row flex-col gap-4 mt-5">
        <div className="sm:w-[50%] w-fit ml-10 md:ml-0 bg-white shadow-lg md:p-6 p-3">
          <div className="flex flex-col gap-4 w-full">
            <h1 className="sm:text-2xl text-normal md:font-bold font-normal">About Me</h1>
            <span className="font-semibold text-gray-600 md:text-sm lg:text-lg text-xs">
              {user?.aboutMe}
            </span>
          </div>
        </div>
        <div className="md:w-[20%] w-[80%] ml-10 md:ml-0 bg-white shadow-lg md:p-6 p-3">
          <div className="flex flex-col gap-4 w-full">
            <h1 className="sm:text-2xl text-normal md:font-bold font-normal">My Projects</h1>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600 md:text-lg text-xs">
                {allProjects?.length}
              </span>
              <Link to="/manage/projects">
                <Button>Visit</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="md:w-[20%] w-[80%] ml-10 md:ml-0 bg-white shadow-lg md:p-6 p-3">
          <div className="flex flex-col gap-4 w-full">
            <h1 className="sm:text-2xl text-normal md:font-bold font-normal">My Skills</h1>
            <span className="font-semibold text-gray-600 text-lg">
              {allSkills?.length}
            </span>
          </div>
        </div>
      </div>
      <Card className="w-[85%] md:w-full md:ml-0 ml-9">
        <CardHeader>
          <CardTitle className="text-sm sm:text-lg">
          List Of Your Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="sm:w-full w-full overflow-x-hidden p-3 md:p-0">
            <TableCaption></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead className="hidden sm:table-cell">Stack</TableHead>
                <TableHead className="hidden sm:table-cell">Deployed</TableHead>
                <TableHead className="hidden sm:table-cell">Update</TableHead>
                <TableHead className="text-right">Visit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allProjects ? (
                allProjects?.map((project) => (
                  <TableRow key={project._id}>
                    <TableCell>{project.title}</TableCell>
                    <TableCell className="hidden sm:table-cell">{project.stack}</TableCell>
                    <TableCell className="hidden sm:table-cell">{project.deployed}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Button onClick={()=>navigate(`project/update/${project._id}`)}>Update</Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button onClick={()=>navigate("/manage/projects")}>Visit</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>No Projects Added So Far</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Tabs>
        <Card className="w-[85%] sm:w-full md:ml-0 ml-9">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg md:text-xl">Skills</CardTitle>
            <Link to="/manage/skill">
              <Button className="w-fit">Manage Skill</Button>
            </Link>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 grid-cols-1 gap-2">
            {allSkills ? (
              allSkills?.map((skill) => (
                <Card key={skill._id}>
                  <CardHeader>
                    <CardTitle className="md:text-lg text-sm">{skill?.title}</CardTitle>
                  </CardHeader>
                  <CardFooter>
                    <Progress value={skill?.proficiency} />
                  </CardFooter>
                </Card>
              ))
            ) : (
              <p>No Projects Added So Far</p>
            )}
          </CardContent>
        </Card>
      </Tabs>
      <div className="md:w-full w-fit flex md:flex-row flex-col justify-between items-center gap-4">
        <Card className="sm:min-w-[35vw] w-[70%]">
          <CardHeader>
            <CardTitle  className="text-lg md:text-xl">List Of Software Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="max-w-[100%]">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allApplications ? (
                  allApplications?.map((app) => (
                    <TableRow key={app._id}>
                      <TableCell>{app.name}</TableCell>
                      <TableCell>
                        <img src={app.toolImage} className="h-7 w-7" />
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => handleDeleteApp(app._id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <p className="text-xl font-semibold mt-3">
                    No Applications Found So Far
                  </p>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="sm:min-w-[50vw] w-[73%]">
          <CardHeader className="flex sm:flex-row flex-col items-center justify-between">
            <CardTitle className="text-sm sm:text-lg ">Timeline</CardTitle>
            <Link to="/manage/timeline">
            <Button className="w-fit">Manage Timeline</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table className="w-full">
              <TableCaption>List Of Timelines</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allTimelines ? (
                  allTimelines?.map((timeline) => (
                    <TableRow key={timeline._id} className="bg-accent">
                      <TableCell>{timeline.title}</TableCell>
                      <TableCell>{timeline?.timeline?.from}</TableCell>
                      <TableCell>
                        {timeline?.timeline?.to
                          ? `${timeline?.timeline?.to}`
                          : "Present"}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <p className="text-xl font-semibold mt-3">
                    No Timeline Found So Far
                  </p>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
