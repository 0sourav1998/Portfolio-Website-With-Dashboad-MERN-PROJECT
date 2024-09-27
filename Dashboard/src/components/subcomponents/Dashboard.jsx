import { useFetchProjects } from "@/hoks/useFetchProjects";
import { useFetchSkills } from "@/hoks/useFetchSkills";
import React from "react";
import { useSelector } from "react-redux";
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

const Dashboard = () => {
  useFetchProjects();
  useFetchSkills();
  useFetchApplications();
  useFetchTimelines();
  const { allProjects } = useSelector((state) => state.project);
  const { allSkills } = useSelector((state) => state.skill);
  const { allApplications } = useSelector((state) => state.application);
  const { allTimelines } = useSelector((state) => state.timeline);
  const { user } = useSelector((state) => state.admin);
  return (
    <div className="flex flex-col gap-6 w-full ml-8">
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
            <span className="font-semibold text-gray-600 text-lg">
              {allProjects?.length}
            </span>
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
                      <Button>Update</Button>
                    </TableCell>
                    <TableCell>
                      <Button>Visit</Button>
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
          <CardHeader>
            <CardTitle>Skills</CardTitle>
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
                        <Button>Delete</Button>
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
        <Tabs className="min-w-[50vw]">
          <TabsContent>
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
                    <TableRow key={timeline._id}>
                      <TableCell>{timeline.title}</TableCell>
                      <TableCell>{timeline?.timeline?.from}</TableCell>
                      <TableCell>{timeline?.timeline?.to}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <p className="text-xl font-semibold mt-3">
                    No Timeline Found So Far
                  </p>
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
