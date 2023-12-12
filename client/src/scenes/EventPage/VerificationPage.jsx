import React, { useState } from 'react';
import { useTheme, Box, FlexBetween, Typography, Select, MenuItem, Button } from '@mui/material';
import WidgetWrapper from 'components/WidgetWrapper';
import { useSelector } from 'react-redux';
const VerificationForm = () => {
  const { palette } = useTheme();
  const [idCardFront, setIdCardFront] = useState(null);
  const [idCardBack, setIdCardBack] = useState(null);
  const { _id } = useSelector((state) => state.user);
  const [url,setUrl]=useState("");

  const handleIdCardFrontChange = (e) => {
    // Handle ID card front image change
    setIdCardFront(e.target.files[0]);
  };

  const handleIdCardBackChange = (e) => {
    // Handle ID card back image change
    setIdCardBack(e.target.files[0]);
  };


    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const formData = {
            user:_id,
     

            
            
          };

       
        // Prepare FormData for ID card front image
        const idCardFrontData = new FormData();
        idCardFrontData.append('file', idCardFront);
        idCardFrontData.append('upload_preset', 'event-app');
        idCardFrontData.append('cloud_name', 'event-cloud');
      
        // Prepare FormData for ID card back image
        const idCardBackData = new FormData();
        idCardBackData.append('file', idCardBack);
        idCardBackData.append('upload_preset', 'event-app');
        idCardBackData.append('cloud_name', 'event-cloud');
      
        // Perform form submission logic here, e.g., send FormData to the server
        try {
          const response = await Promise.all([
            fetch('https://api.cloudinary.com/v1_1/event-cloud/image/upload', {
              method: 'POST',
              body: idCardFrontData,
            }),
            fetch('https://api.cloudinary.com/v1_1/event-cloud/image/upload', {
              method: 'POST',
              body: idCardBackData,
            }),
          ]);
      
          const [frontResponse, backResponse] = response;
          
          if (frontResponse.ok) {
            const frontCloudinaryData = await frontResponse.json();
            // const backCloudinaryData = await backResponse.json();
      
            // Handle the cloudinaryData for both images as needed
          //  console.log(formData)
          //   formData.IDCardBack=backCloudinaryData.secure_url;
          console.log(formData)
          if(frontCloudinaryData){
            formData.IDCardFront=frontCloudinaryData.secure_url;
          }
           
        
            console.log(formData)
          

           
      
            console.log('ID Card Front Image URL:', frontCloudinaryData.secure_url);
            // console.log('ID Card Back Image URL:', backCloudinaryData.secure_url);
      
            // Additional logic, if needed, after both images are uploaded
          } else {
            console.error('Error uploading one or both images to Cloudinary');
          }
        } catch (error) {
          console.error('An error occurred while uploading images:', error);
        }

        try {

            const response = await fetch("http://localhost:3000/event-organizer/verify", {
            
                    method: "POST",
                    body: JSON.stringify(formData),
                    headers: {
                      "Content-Type": "application/json",
                    },
           
            });
      
            if (response.ok) {
              console.log("ID picture uploaded successfully!");
            
              // window.location.reload();
              // Optionally, you can reset the form fields here
              
             
            } else {
              console.error("Error submitting verification form");
            }
          } catch (error) {
            console.error("An error occurred:", error);
          }



          window.location.reload();
      };
      
   


  return (
    <div>
      <h2>Verification Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Other form fields (existing fields) */}

        {/* ID Card Front Image */}
        <WidgetWrapper>
        <Box>
          <Typography>
            <strong>ID Card Front:</strong>
          </Typography>
          <input type="file" onChange={handleIdCardFrontChange} />
        </Box>

        {/* ID Card Back Image */}

        <br />
        <Box>
          <Typography>
            <strong>ID Card Back:</strong>
          </Typography>
          <input type="file" onChange={handleIdCardBackChange} />
        </Box>

        {/* Submit Button */}
        <br />
        <Button
          type="submit"
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: '3rem',
          }}
        >
          SUBMIT
        </Button>
        </WidgetWrapper>
      </form>
    </div>
  
  );
        }
export default VerificationForm;
