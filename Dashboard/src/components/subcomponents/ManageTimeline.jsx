import React from "react";
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
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { setAllTimelines } from "@/redux/slice/timelineSlice";

const ManageTimeline = () => {
  const { allTimelines } = useSelector((state) => state.timeline);
  const { token } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const handleDeleteTimeline = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/timeline/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        const updateTimeline = allTimelines?.filter(
          (timeline) => timeline._id !== response?.data?.deletedTimeline?._id
        );
        dispatch(setAllTimelines(updateTimeline));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="w-screen h-screen">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manage Your Timeline</CardTitle>
          <Link to="/">
            <Button>Return To Dashboard</Button>
          </Link>
        </CardHeader>
        <CardContent>
          {allTimelines.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allTimelines.map((timeline) => (
                  <TableRow key={timeline._id}>
                    <TableCell>{timeline.title}</TableCell>
                    <TableCell>{timeline.description}</TableCell>
                    <TableCell>{timeline.timeline.from}</TableCell>
                    <TableCell>{timeline.timeline.to}</TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={() => handleDeleteTimeline(timeline._id)}
                        className="bg-red-500 text-white rounded-full hover:bg-red-700 hover:scale-110 transition-all duration-200 p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="w-full flex justify-center">
              <span className="text-2xl font-bold text-center">
                No Timeline Added So Far
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageTimeline;
