import { setAllMessages } from "@/redux/slice/messageSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

const Messages = () => {
  const dispatch = useDispatch();
  const { allMessages } = useSelector((state) => state?.allMessage);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state?.admin);

  const fetchMessages = async () => {
    const response = await axios.get(
      "http://localhost:4000/api/v1/message/getAll"
    );
    if (response?.data?.success) {
      dispatch(setAllMessages(response?.data?.messages));
    }
  };

  const deleteMessage = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:4000/api/v1/message/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [allMessages]);

  return (
    <div className="min-h-screen bg-gray-50 sm:py-10 py-6 sm:px-5 px-2 mt-2">
      <div className="max-w-7xl mx-auto">
        <h1 className="sm:text-3xl sm:font-bold text-xl font-semibold text-gray-800 mb-6">All Messages</h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {allMessages?.length > 0 ? (
            allMessages.map((message) => (
              <div
                key={message._id}
                className="bg-white border border-gray-200 shadow-md rounded-lg p-6 transition-all hover:shadow-lg hover:scale-105"
              >
                <div className="sm:mb-4 mb-2">
                  <p className="text-gray-900 font-semibold sm:text-lg text-sm mb-1">
                    Sender Name:{" "}
                    <span className="font-normal">{message.senderName}</span>
                  </p>
                  <p className="text-gray-900 font-semibold sm:text-lg text-sm">
                    Subject:{" "}
                    <span className="font-normal">{message.subject}</span>
                  </p>
                </div>
                <p className="text-gray-700 sm:mb-4 mb-2">
                  <span className="font-semibold">Message:</span> {message.message}
                </p>
                <Button
                  onClick={() => deleteMessage(message._id)}
                  className={`w-full bg-red-500 text-white py-2 rounded-md transition hover:bg-red-600 ${
                    loading && "opacity-50 cursor-not-allowed"
                  }`}
                >
                  {loading ? "Loading..." : "Delete Message"}
                </Button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No Messages Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
