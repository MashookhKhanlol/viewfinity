import React, { useEffect, useState } from "react";
import Sidebarfull from "../components/SidebarFull";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { newRequest } from "../utils/request";

interface Video {
  _id: string;
  videoFile: string;
  thumbnail: string;
  title: string;
  description: string;
  duration: number;
  views: string[];
  isPublished: boolean;
  owner: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  className ?: string,
}

const Likes: React.FC = () => {
  const [likedvideos, setLikedVideos] = useState<Video[]>([]);
  const [userdetails, SetUserDetails] = useState<any>("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await newRequest.get("/users/getcurrentuser");
        SetUserDetails(response.data.message);
      } catch (error) {
        console.error("Error Getting User Details", error);
        navigate("/signin");
      }
    };
    getUser();
  }, [navigate]);

  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        const response = await newRequest.get("/likes/videos");
        const likedVideoGroups = response.data.data.likedVideos;
        const flattenedLikedVideos = likedVideoGroups.flatMap((group: any) => group.like);
        setLikedVideos(flattenedLikedVideos); 
      } catch (error) {
        console.error("Error fetching liked videos", error);
      }
    };
    fetchLikedVideos();
  }, []);

  return (
    <div className="bg-black w-screen h-screen overflow-y-hidden flex">
      {/* Sidebar */}
      <hr className="absolute w-screen top-20 border border-t border-white"></hr>
      <div className="absolute right-0 mt-4 mr-4 z-10">
        {userdetails ? (
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton>
              <img src={userdetails.avatar} className="rounded-full border border-white w-[3rem] h-[3rem]" alt="User Avatar" />
            </MenuButton>
            <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-300 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
              <div className="px-1 py-1">
                <MenuItem>
                  {({ active }: { active: boolean }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-indigo-500`}
                      onClick={() => navigate("/video")}
                    >
                      Create Video
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }: { active: boolean }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-indigo-500`}
                      onClick={() => navigate("/createtweet")}
                    >
                      Create Tweet
                    </button>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        ) : (
          <div>
            <Link to="/signin">
              <button className="border border-white text-white h-8 rounded-lg w-20 text-center">Sign in</button>
            </Link>
          </div>
        )}
      </div>

      <div className="flex-shrink-0 w-36 mt-2 max-sm:w-0">
        <div className="mt-20">
          <Sidebarfull />
        </div>
        <div className="border-t w-[17rem] bg-slate-500 max-sm:hidden"></div>
      </div>
      <div className="flex-1 relative">
        <div className="absolute left-32 top-20 bottom-0 bg-white border-l max-sm:hidden"></div>
        <div className="flex justify-center mt-4">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-700 rounded-full w-[27rem] max-sm:w-[17rem] h-[3rem] text-left p-3 hover:outline outline-white"
          />
        </div>
        <div className="mt-8 p-4">
          <div className="grid grid-cols-3 gap-6 ml-[8rem] max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:ml-0">
            {likedvideos.length > 0 ? (
              likedvideos.map((video) => (
                <div key={video._id} className="bg-black p-4 rounded-lg border border-white ml-[2rem] mt-4 w-[23rem]">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-40 rounded-xl mb-2 border border-gray-700"
                  />
                  <div className="flex flex-col ml-4">
                    <h3 className="text-white text-lg font-bold">{video.title}</h3>
                    <div className="">
                      <p className="text-gray-400">{video.description}</p>
                      <p className="text-gray-400">{video.views.length} Views</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No liked videos found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Likes;
