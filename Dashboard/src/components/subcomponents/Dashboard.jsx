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
    <div className="flex flex-col gap-6 w-full">
      <div className="flex gap-4 mt-5">
        <div className="w-[50%] bg-white shadow-lg p-6">
          <div className="flex flex-col gap-4 w-full">
            <h1 className="text-2xl font-bold">About Me</h1>
            <span className="font-semibold text-gray-600 text-lg">
              {user.aboutMe}
            </span>
          </div>
        </div>
        <div className="w-[20%] bg-white shadow-lg p-6">
          <div className="flex flex-col gap-4 w-full">
            <h1 className="text-2xl font-bold">My Projects</h1>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600 text-lg">
                {allProjects?.length}
              </span>
              <Link to="/manage/projects">
                <Button>Visit</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-[28%] bg-white shadow-lg p-6">
          <div className="flex flex-col gap-4 w-full">
            <h1 className="text-2xl font-bold">My Skills</h1>
            <span className="font-semibold text-gray-600 text-lg">
              {allSkills?.length}
            </span>
          </div>
        </div>
      </div>
      <Tabs>
        <TabsContent>
          <Table>
            <TableCaption>List Of Your Projects</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Stack</TableHead>
                <TableHead>Deployed</TableHead>
                <TableHead>Update</TableHead>
                <TableHead>Visit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allProjects ? (
                allProjects?.map((project) => (
                  <TableRow key={project._id}>
                    <TableCell>{project.title}</TableCell>
                    <TableCell>{project.stack}</TableCell>
                    <TableCell>{project.deployed}</TableCell>
                    <TableCell>
                      <Button onClick={()=>navigate(`project/update/${project._id}`)}>Update</Button>
                    </TableCell>
                    <TableCell>
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
        </TabsContent>
      </Tabs>
      <Tabs>
        <Card>
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Skills</CardTitle>
            <Link to="/manage/skill">
              <Button className="w-fit">Manage Skill</Button>
            </Link>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 grid-cols-1 gap-2">
            {allSkills ? (
              allSkills?.map((skill) => (
                <Card key={skill._id}>
                  <CardHeader>
                    <CardTitle>{skill?.title}</CardTitle>
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
      <div className="w-full flex justify-between items-center gap-4">
        <Tabs className="min-w-[35vw]">
          <TabsContent>
            <Table className="max-w-[100%]">
              <TableCaption>List Of Software Applications</TableCaption>
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
          </TabsContent>
        </Tabs>
        <Card className="min-w-[50vw]">
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Timeline</CardTitle>
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
