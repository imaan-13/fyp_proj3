// import {
//     EditOutlined,
//     DeleteOutlined,
//     AttachFileOutlined,
//     GifBoxOutlined,
//     ImageOutlined,
//     MicOutlined,
//     MoreHorizOutlined,
//   } from "@mui/icons-material";
//   import {
//     Box,
//     Divider,
//     Typography,
//     InputBase,
//     useTheme,
//     Button,
//     IconButton,
//     useMediaQuery,
//   } from "@mui/material";
//   import FlexBetween from "components/FlexBetween";
//   import Dropzone from "react-dropzone";
//   import UserImage from "components/UserImage";
//   import WidgetWrapper from "components/WidgetWrapper";
//   import { useState } from "react";
//   import { useDispatch, useSelector } from "react-redux";
//   import { setPosts } from "state";
  
//   const MyPostWidget = ({ picturePath }) => {
//     const dispatch = useDispatch();
//     const [isImage, setIsImage] = useState(false);
//     const [image, setImage] = useState(null);
//     const [post, setPost] = useState("");
//     const { palette } = useTheme();
//     const { _id } = useSelector((state) => state.user);
//     const token = useSelector((state) => state.token);
//     const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
//     const mediumMain = palette.neutral.mediumMain;
//     const medium = palette.neutral.medium;
  
//     const handlePost = async () => {
//       const formData = new FormData();
//       formData.append("userId", _id);
//       formData.append("body", post);
//       if (image) {
//         formData.append("picture", image);
//         formData.append("picturePath", image.name);
//       }
  
//       const response = await fetch(`http://localhost:3000/posts`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         body: formData,
//       });
//       const posts = await response.json();
//       dispatch(setPosts({ posts }));
//       setImage(null);
//       setPost("");
//     };
  
//     return (
//       <WidgetWrapper>
//         <FlexBetween gap="1.5rem">
//           <UserImage image={picturePath} />
//           <InputBase
//             placeholder="What's on your mind..."
//             onChange={(e) => setPost(e.target.value)}
//             value={post}
//             sx={{
//               width: "100%",
//               backgroundColor: palette.neutral.light,
//               borderRadius: "2rem",
//               padding: "1rem 2rem",
//             }}
//           />
//         </FlexBetween>
//         {isImage && (
//           <Box
//             border={`1px solid ${medium}`}
//             borderRadius="5px"
//             mt="1rem"
//             p="1rem"
//           >
//             <Dropzone
//               acceptedFiles=".jpg,.jpeg,.png"
//               multiple={false}
//               onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
//             >
//               {({ getRootProps, getInputProps }) => (
//                 <FlexBetween>
//                   <Box
//                     {...getRootProps()}
//                     border={`2px dashed ${palette.primary.main}`}
//                     p="1rem"
//                     width="100%"
//                     sx={{ "&:hover": { cursor: "pointer" } }}
//                   >
//                     <input {...getInputProps()} />
//                     {!image ? (
//                       <p>Add Image Here</p>
//                     ) : (
//                       <FlexBetween>
//                         <Typography>{image.name}</Typography>
//                         <EditOutlined />
//                       </FlexBetween>
//                     )}
//                   </Box>
//                   {image && (
//                     <IconButton
//                       onClick={() => setImage(null)}
//                       sx={{ width: "15%" }}
//                     >
//                       <DeleteOutlined />
//                     </IconButton>
//                   )}
//                 </FlexBetween>
//               )}
//             </Dropzone>
//           </Box>
//         )}
  
//         <Divider sx={{ margin: "1.25rem 0" }} />
  
//         <FlexBetween>
//           <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
//             <ImageOutlined sx={{ color: mediumMain }} />
//             <Typography
//               color={mediumMain}
//               sx={{ "&:hover": { cursor: "pointer", color: medium } }}
//             >
//               Image
//             </Typography>
//           </FlexBetween>
  
//           {isNonMobileScreens ? (
//             <>
//               <FlexBetween gap="0.25rem">
//                 <GifBoxOutlined sx={{ color: mediumMain }} />
//                 <Typography color={mediumMain}>Clip</Typography>
//               </FlexBetween>
  
//               <FlexBetween gap="0.25rem">
//                 <AttachFileOutlined sx={{ color: mediumMain }} />
//                 <Typography color={mediumMain}>Attachment</Typography>
//               </FlexBetween>
  
//               <FlexBetween gap="0.25rem">
//                 <MicOutlined sx={{ color: mediumMain }} />
//                 <Typography color={mediumMain}>Audio</Typography>
//               </FlexBetween>
//             </>
//           ) : (
//             <FlexBetween gap="0.25rem">
//               <MoreHorizOutlined sx={{ color: mediumMain }} />
//             </FlexBetween>
//           )}
  
//           <Button
//             disabled={!post}
//             onClick={handlePost}
//             sx={{
//               color: palette.background.alt,
//               backgroundColor: palette.primary.main,
//               borderRadius: "3rem",
//             }}
//           >
//             POST
//           </Button>
//         </FlexBetween>
//       </WidgetWrapper>
//     );
//   };
  
//   export default MyPostWidget;

import {
      Box,
      Divider,
      Typography,
      InputBase,
      useTheme,
      Button,
      IconButton,
      useMediaQuery,
    } from "@mui/material";
  import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
  } from "@mui/icons-material";
  import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserImage from "components/UserImage";
import { upload } from "@testing-library/user-event/dist/upload";


const MyPostWidget = ({picturePath}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [url,setUrl]=useState("");
  let imageUrl="";
  // const { _id } = useSelector((state) => state.user);
  const { palette } = useTheme();
      const { _id } = useSelector((state) => state.user);
      const token = useSelector((state) => state.token);
      const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
      const mediumMain = palette.neutral.mediumMain;
      const medium = palette.neutral.medium;

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleImageChange =  (event) => {
    setImage(event.target.files[0]);
    

      
  };




  const handlePostSubmit = async (event) => {
 
    console.log(_id);
    
    const dataToSend = {
      title: title, // Make sure 'title' contains the actual value
      body: body,
      postedBy:(_id), // Make sure '_id' contains the actual value
      
      
    };
    const Data = new FormData();
      Data.append("file", image);
      Data.append("upload_preset", "event-app");
      Data.append("cloud_name", "event-cloud");
    
      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/event-cloud/image/upload",
          {
            method: "POST",
            body: Data,
          }
        );
    
        if (response.ok) {
          const cloudinaryData =  await response.json();
          if (cloudinaryData.secure_url) {
            setUrl(cloudinaryData.secure_url);
            dataToSend.photo=cloudinaryData.secure_url;
            console.log("Image uploaded and URL set:", cloudinaryData.secure_url);
          } else {
            console.error("Error uploading image or secure_url is missing.");
          }
        } else {
          console.error("Error uploading image to Cloudinary");
        }
      } catch (error) {
        console.error("An error occurred while uploading image:", error);
      }
    console.log("handle image trig");
    try {

      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Replace with your actual token
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend) ,
     
      });

      if (response.ok) {
        console.log("Post successfully created!");
        // Optionally, you can reset the form fields here
        setTitle("");
        setBody("");
        setImage("");
        setUrl("");
       
      } else {
        console.error("Error creating post");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
 
   
  };

  return (
    <WidgetWrapper>
      <FlexBetween>
    <div>
    <h2>Create a New Post</h2>

      <FlexBetween gap="1.5rem">
        
      <UserImage image={picturePath} />
      {/* <label>Title</label> */}

{/*       
      <input
        
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
      /> */}

        <InputBase
            placeholder="What's on your mind..."
            onChange={handleBodyChange}
            value={body}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
      </FlexBetween>

      {/* <textarea

        placeholder="Body"
        value={body}
        onChange={handleBodyChange}
      /> */}


      
      
      <FlexBetween >
    
      <Typography color={mediumMain}><input type="file" onChange={handleImageChange} /></Typography>
      
      <br></br>
      </FlexBetween>
     
{/*       
      <button onClick={handlePostSubmit}>Post</button> */}

      <Button
            disabled={!body}
            onClick={handlePostSubmit}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
          >
            POST
          </Button>
    </div>
    </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
