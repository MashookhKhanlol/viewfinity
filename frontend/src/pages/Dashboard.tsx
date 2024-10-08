import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { newRequest } from "../utils/request.ts";
import SidebarFull from "../components/SidebarFull.tsx";
import { DashboardComponents } from "../components/DashboardComponent.tsx";


const Dashboard : React.FC = ()=>{
    const [videoIds , setVideoIds] = useState<string[]>([]);
    const [totalVideos , setTotalVideos] = useState<any[]>([]);
    const [userDetails , setUserDetails] = useState<any>(null);
    const [totalSubs , setTotalSubs] = useState<number>(0);
    const navigate = useNavigate();
    const [error, setError] = useState<null |string>(null);
    const [channelId, setChannelId] = useState<string>("");
    console.log(videoIds)


    useEffect(()=>{
        const getChannelTotalViews = async()=>{
            try {
                const response = await newRequest.get("/dashboard/dashboard/videos");
                if(response.data.data.statusCode === 410){
                    setTotalVideos([])
                    setVideoIds([]);
                }else{
                    setTotalVideos(response.data.data.channelVideo);
                    setVideoIds(
                        response.data.data.channelVideo.map((video : any)=> video._id)
                    )
                }
            } catch (error) {
                
                console.error("error fetching total views" , error);
                setError("error fetching total views")
            }
        }
        getChannelTotalViews()
    },[])

    useEffect(()=>{
        const getChannelSubs = async ()=>{
            try {
                if(channelId){
                    const response = await newRequest.get(
                        `/subscribe/getChannel/sub/${channelId}`
                    )
                    if(
                        response.data.data.subscriber &&
                        response.data.data.subscriber.length >0
                    ){
                        const totalSubscriberCount = response.data.data.subscriber.reduce(
                            (acc : number , subscriber : any)=> acc + subscriber.subs,
                            0
                        );
                        setTotalSubs(totalSubscriberCount)
                    }else{
                        setTotalSubs(0);
                    }
                }
                
            } catch (error) {
                console.error("Error fetching Channel Subscriber", error);
                setError("Error fetching channel subscribers.");
            }
        }
        getChannelSubs();
    },[channelId]);

    return (
        <>
            <div className="bg-black w-screen h-screen overflow-y-hidden flex">
                <hr className="absolute w-screen top-20 border border-t border-white"></hr>
                <div className="absolute right-0 mt-4 mr-4 z-10">
                    {userDetails ? (
                        <Menu as="div" className="relative inline-block text-left">
                            <MenuButton>
                            <img
                            src={userDetails.avatar}
                            className="rounded-full border border-white w-[3rem] h-[3rem]"
                            />
                            </MenuButton>
                            <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-300 divide-y divide-gray-100 rounded-md shadow-lg outline-none ">
                                <div className='px-1 py-1'>
                                    <MenuItem>
                                    {({ active } : {active : boolean}) => (
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
                                    {({ active } : {active : boolean}) => (
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
                    ): (
                        <div>
                            <Link to ="/signin">
                            <button className="border border-white text-white h-8 rounded-lg w-20 text-center ">
                            Sign in
                            </button>
                            </Link>
                        </div>
                    )}
                </div>

                <div  className="flex-shrink-0 w-36 mt-2 max-sm:w-0">
                    <div className = 'mt-20'>
                        <SidebarFull/>
                    </div>
                    <div className="border-t w-[17rem] bg-slate-500 max-sm:hidden"></div>
                </div>

                <div className="flex-1 relative">
                    <div className ="absolute left-32 top-20 bottom-0 bg-white border-l max-sm:hidden"></div>
                    <div className="flex justify-center mt-4">
                        <input
                        type="text"
                        placeholder="Search"
                        className="bg-gray-700 rounded-full w-[27rem] max-sm:w-[17rem] h-[3rem] text-left p-3 hover:outline outline-white"
                        />
                    </div>
                    <div className="mt-0 ml-[8.2rem]">
                        <div className="flex flex-col mt-1 ml-0">
                        {userDetails && (
                            <div className="mt-4 relative ">
                            <img
                                className="w-screen h-[15rem] object-cover"
                                src={userDetails.coverimage}
                                alt="Cover"
                            />
                            <img
                                className="rounded-full border border-gray-400 w-[6rem] h-[6rem] absolute bottom-[-3rem] left-16"
                                src={userDetails.avatar}
                                alt="Avatar"
                            />
                            </div>
                        )}
                        <div className="mt-16 ml-4">
                            {userDetails && (
                            <p className="text-white">
                                Welcome Back,
                                <span className="text-blue-600 font-bold text-xl ml-2">
                                {userDetails.username}
                                </span>
                            </p>
                            )}
                        </div>
                        <div className="grid grid-cols-3 ml-8 ">
                            <div className="w-[16rem] h-[6rem] border border-white text-center mt-8 text-white">
                            <DashboardComponents heading="Total Subscriber" />
                            <p>{totalSubs}</p>
                            </div>
                            <div className="w-[16rem] h-[6rem] border border-white text-center mt-8 text-white flex-col">
                            <DashboardComponents heading="Total Videos" />
                            <p>{totalVideos.length > 0 ? totalVideos.length : 0}</p>
                            </div>
                            {/* 
                            <div className="w-[16rem] h-[6rem] border border-white text-center mt-8 text-white">
                            <DashboardComponent heading="Total Views" />
                            <p>{totalViews}</p>
                            </div> */}
                        </div>
                        {error && (
                            <div>
                            <p className="text-red-500">{error}</p>
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard