import React, { useState, useEffect } from "react";
import { InputBox } from "../components/InputBox";
import { Link, useNavigate } from "react-router-dom";
import { Description, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import SidebarFull from "../components/SidebarFull.tsx";
import { newRequest } from "../utils/request.ts";

const Playlist : React.FC =()=>{
    const [name ,setName] = useState<string>("")
    const [description , setDescription] = useState<string>("")
    const [playlists, setPlaylists] = useState<{
        name : string;
        description : string
    }[]>([]);
    const [userDetails, setUserDetails] = useState<any>("");
    const navigate = useNavigate()

    useEffect(()=>{
        const getUser = async()=>{
            try {
                const response = await newRequest.get("/users/getCurrentUser")
                setUserDetails(response.data.message)
            } catch (error) {
                console.error("Error getting user details", error)
                navigate("/signin")
            }
        };
        getUser()
    },[])

    const createPlaylist = async ()=>{
        try {
            await newRequest.post("/playlist/createPlaylist",{
                name : name ,
                description : description
            })
            setPlaylists([...playlists,{name: name, description: description}])
            setName("")
            setDescription("")
        } catch (error) {
            console.error("Error creating playlist" ,error)
        }
    } 

    return(
        <>
            <div className="bg-black w-screen h-screen overflow-y-hidden flex">
                <hr className="absolute w-screen top-20 border border-t border-white"></hr>
                <div className="absolute right-0 mt-4 mr-4 z-10">
                    {userDetails ?(
                        <Menu as="div" className="relative inline-block text-left">
                            <MenuButton>
                            <img
                            src={userDetails.avatar}
                            className="rounded-full border border-white w-[3rem] h-[3rem]"
                            />
                            </MenuButton>

                            <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-300 divide-y divide-gray-100 rounded-md shadow-lg outline-none ">
                                <div className="px-1 py-1 ">
                                    <MenuItem>
                                    {({ active }: {active: boolean}) => (
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
                                    {({ active }) => (
                                    <button
                                        className={`${
                                        active ? "bg-gray-100" : "text-gray-900"
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-indigo-500`}
                                        onClick={() => navigate("/createTweet")}
                                    >
                                        Create Video
                                    </button>
                                    )}
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Menu>
                    ):(
                        <div>
                            <Link to="/signin">
                                <button className="border border-white text-white h-8 rounded-lg w-20 text-center ">
                                    Sign in
                                </button>
                            </Link>
                        </div>
                    )}
                </div>

                <div className="flex-shrink-0 w-36 mt-2 max-sm:w-0">
                    <div className="mt-20">
                        <SidebarFull/>
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
                        <div className="flex flex-col justify-center items-center overflow-hidden absolute top-24 left-[20rem]">
                            <form
                            onSubmit={(e) => {
                            e.preventDefault();
                            createPlaylist();
                            }}
                            >
                                <InputBox
                                inputPlaceholder="Title"
                                type="text"
                                inputOnChange={(e) => setName(e.target.value)}
                                className="border border-white bg-black w-[30rem] h-[3rem] rounded-xl mb-4 p-4"
                                inputTitle="title"
                                />
                                <textarea
                                placeholder="Description"
                                onChange={(e) => setDescription(e.target.value)}
                                className="border border-white bg-black w-[30rem] rounded-xl text-left p-2 px-2"
                                title="Description"
                                rows={10}
                                value={description}
                                />
                                <button className="bg-gray-500 rounded-xl w-[8rem] h-[3rem] mt-4 flex justify-center items-center">
                                Create Playlist
                                </button>
                            </form>
                        </div>
                        <div>
                        {playlists.length > 0 && (
                            <div className="grid grid-cols-3 absolute left-[20rem] mt-36">
                            {playlists.map((playlist, index) => (
                                <div
                                key={index}
                                className="border border-white w-[20rem] h-[15rem] bg-gray-900  flex flex-col mt-[15rem]"
                                >
                                <div className="flex ">{playlist.name}</div>
                                <div>{playlist.description}</div>
                                </div>
                            ))}
                            </div>
                        )} 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Playlist;