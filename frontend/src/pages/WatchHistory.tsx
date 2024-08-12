import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {newRequest} from "../utils/request.ts"
import SidebarFull from "../components/SidebarFull.tsx";


const WatchHistoryPage : React.FC =()=>{
    const [watchedVideos , setWatchedVideos] = useState<any[]>([]);
    const [userDetails , setUserDetails] = useState<any>("");
    const navigate = useNavigate();

    useEffect(()=>{
        const getWatchedVideos = async()=>{
            try {
                const response = await newRequest.get("/users/history")
                setWatchedVideos(response.data.message.watchHistory)
            } catch (error) {
                    console.log("error fetching videos " ,error)
            }
        }

        getWatchedVideos();
    },[])

    useEffect(()=>{
        const getUser = async()=>{
            try {
                const response = await newRequest.get("/users/getCurrentUser")

                setUserDetails(response.data.message)
            } catch (error) {
                console.error("Error getting user details" ,error)
                navigate("/signin")
            }
        }
        getUser();
    },[])

    return (
        <div className="bg-black w-screen h-screen overflow-y-hidden flex">
        
        <hr className="absolute w-screen top-20 border border-t border-white"></hr>
        <div className="absolute right-0 mt-4 mr-4 z-10">
            {userDetails ? <img src={userDetails.avatar} className="rounded-full border border-white w-[3rem] h-[3rem]"/> :<div>
                <Link to="/signin">
                <button className="border border-white text-white h-8 rounded-lg w-20 text-center ">
                    Sign in
                </button>
                </Link>
                
            </div>}
        </div>

        <div className="flex-shrink-0 w-36 mt-2">
            <div className="mt-20">
            <SidebarFull />
            </div>
            <div className="border-t w-[17rem] bg-slate-500"></div>
        </div>

        <div className="flex-1 relative">
            <div className="absolute left-32 top-20 bottom-0 bg-white border-l"></div>
            <div className="flex justify-center mt-4">
            <input
                type="text"
                placeholder="Search"
                className="bg-gray-700 rounded-full w-[27rem] h-[3rem] text-left p-3 hover:outline outline-white"
            />
            </div>
            <div className="mt-8 p-4">
            <div className="grid grid-cols-3 gap-4 ml-[8rem]">
                {watchedVideos.map((video: any) => (
                <Link key={video._id} to={`/video/${video._id}`} className="bg-black p-4 rounded-lg border border-white">
                    <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-40  rounded-xl mb-2 border border-gray-700"
                    />
                    <h3 className="text-white text-lg font-bold">{video.title}</h3>
                    <p className="text-gray-400">{video.description}</p>
                    {/* <p className="text-gray-400">Watched On {formatDate(video.createdAt)}</p> */}
                </Link>
                ))}
            </div>
        </div>
        </div>
    </div>
    )
}

export default WatchHistoryPage