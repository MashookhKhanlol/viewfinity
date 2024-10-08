import React, {useState} from "react";
import { InputBox } from "../components/InputBox";
import { useNavigate } from "react-router-dom";
import { formDataRequest } from "../utils/requestForData";

const Video : React.FC = ()=>{
    const [title , setTitle] = useState("");
    const [description , setDescription] = useState("");
    const [isPublished , setIsPublished] = useState(false)
    const [thumbnail ,setThumbnail] = useState<File|null>(null);
    const [videoFile ,setVideoFile] = useState<File|null>(null);
    const [error ,setError] = useState<string|null>(null);
    const navigate = useNavigate();

    const postVideoData = async()=>{
        const formData = new FormData();
        formData.append("title", title)
        formData.append("description", description)
        if(videoFile) formData.append("videoFile" , videoFile)
        if(thumbnail) formData.append("thumbnail" , thumbnail)
        formData.append("isPublished" , isPublished.toString())
        
        try {
            await formDataRequest.post(
                `/video/publishvideo`,
                formData
            )
            navigate("/")
        } catch (error) {
            console.log("Error in video uploading", error);
            setError("Video cant be added , Please try again")
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        postVideoData();
    }
    return(
        <div className="bg-black text-white flex justify-center items-center h-screen">
            <div className="p-8 bg-black border border-white h-fit shadow-md rounded-lg transform transition-x-full w-[44%] duration-500 hover:scale-105 max-sm:w-[80%]">
                <form onSubmit = {handleSubmit}>
                    <InputBox
                        type="text"
                        inputPlaceholder="Title"
                        inputOnChange={(e)=>setTitle(e.target.value)}
                        className="w-full rounded-md bg-black border border-white h-11 px-2 outline-gray-500 mt-4 mb-4"
                        inputTitle="Title"
                    />
                    <InputBox
                        type ="text"
                        inputPlaceholder="Description"
                        inputOnChange={(e)=>setDescription(e.target.value)}
                        className="w-full rounded-md bg-black border border-white h-11 px-2 outline-gray-500 mt-4 mb-4"
                        inputTitle="Description"
                    />
                    <InputBox
                        type="file"
                        inputPlaceholder="Video File"
                        inputTitle="Video File"
                        accept="video/*"
                        className="w-full rounded-md bg-black border border-white h-11 px-2 outline-gray-500 mt-4 mb-4"
                        inputOnChange={(e)=>{
                            if(e.target.files && e.target.files.length > 0){
                                setVideoFile(e.target.files[0]);
                            }
                        }}
                    />  
                    <InputBox
                        type ="file"
                        inputTitle = "Thumbnail"
                        inputPlaceholder="Thumbnail"
                        accept="image/*"
                        className="w-full rounded-md bg-black border border-white h-11 px-2 outline-gray-500 mt-4 mb-4"
                        inputOnChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              setThumbnail(e.target.files[0]);
                            }
                        }}
                    />
                    <div className="flex flex-row  items-center">
                        <label>Is Public:</label>
                        <InputBox 
                            inputPlaceholder="IsPubished"
                            inputTitle="IsPublished"
                            type="checkbox"
                            className="w-full rounded-md bg-black border border-white h-8 px-2 outline-gray-500 mt-4 mb-4"
                            inputOnChange={(e)=>setIsPublished(e.target.checked)}
                        />
                    </div>
                    <button
                        type='submit'
                        className="h-11 bg-gray-700 hover:bg-slate-600 w-full text-center rounded-md mt-8"
                    >
                        Submit
                    </button>
                </form>
                <div>{error && <p>{error}</p>}</div>
            </div>
        </div>
    )
}

export default Video;