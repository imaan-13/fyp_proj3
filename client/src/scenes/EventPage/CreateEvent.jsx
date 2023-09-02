// import {
//     Box,
//     Button,
//     TextField,
    
//     useMediaQuery,
//     Typography,
//     // useTheme,
//     FormControlLabel,
//     Radio,
//     RadioGroup,
//   } from "@mui/material";
//   import { DatePicker } from '@mui/lab';
//   import { useState } from "react";
//   import { Formik } from "formik";
//   import * as yup from "yup";
// import { createEvent } from "@testing-library/react";
//   // import Dropzone from "react-dropzone";
//   // import FlexBetween from "components/FlexBetween";
//   // import { setEvents } from "state";
//   // import { Navigate, useNavigate } from "react-router-dom";
  
//   const eventSchema = yup.object().shape({
//     eventName: yup.string().required("Event name is required"),
//     startDateTime: yup.date().required("Start date is required"),
//     // startTiming: yup.string().required("Start time is required"),
//     locationType: yup.string().required("Choose In Person or Virtual"),
//     details: yup.string().required("Event details are required"),
//   });
  
//   const initialValues = {
//     eventName: "",
//     startDateTime: "",
//     // startTiming: "",
//     locationType: "", // Default value
//     details: "",
//     // eventPicture: null,
//   };
  
 
//   const CreateEventForm = () => {
 
//     // const { palette } = useTheme();
//     const isNonMobile = useMediaQuery("(min-width:600px)");
  
//     const CreateEvent = async (values,onSubmitProps) => {

//       try{
//       const formData = new FormData();
//       // for (let value in values) {
//       //   formData.append(value, values[value]);
//       // }
//       // formData.append("eventPicturePath", values.eventPicture?.name || "");
  

//       // const formData = new FormData();

//       formData.append('eventName', values.eventName);
//       formData.append('startDateTime', values.startDateTime);
//       // formData.append('startTiming', values.startTiming);
//       formData.append('locationType', values.locationType);
//       formData.append('details', values.details);
//       const savedUserResponse = await fetch(
//         "http://localhost:3000/event/api/submit",
//         {
//           method: "POST",
//           // body: formData,
//           body:formData,
         
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       const savedUser = await savedUserResponse.json();
//       onSubmitProps.resetForm();
//       }
   
//       catch (error) {
//         console.error("Error during fetch:", error);
      
//       // console.log("Creating event:", events);
//       // onSubmitProps.resetForm();
      
//       // if (savedUser) {
//       //   // setPageType("home");
       
//       //   // setEvents("event-page");
        
//       // }
//       }
//     };
  
//     return (
//       <Formik
//         onSubmit={CreateEventForm}
//         initialValues={initialValues}
//         validationSchema={eventSchema}
//       >
//         {({
//           values,
//           errors,
//           touched,
//           handleBlur,
//           handleChange,
//           handleSubmit,
//           setFieldValue,
//           resetForm,
//         }) => (
//         <form onSubmit={handleSubmit}>
//             <h3>Create Event Page</h3>
     
//             <Box
//               display="grid"
//               gap="30px"
//               gridTemplateColumns="repeat(4, minmax(0, 1fr))"
//               sx={{
//                 "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
//               }}
//             >
              
//               <TextField
//                 label="Event Name"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.eventName}
//                 name="eventName"
//                 error={Boolean(touched.eventName) && Boolean(errors.eventName)}
//                 helperText={touched.eventName && errors.eventName}
//                 sx={{ gridColumn: "span 4" }}
//               />
              
//               {/* <DatePicker

//                 type="date"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.startDateTime}
//                 name="startDateTime"
//                 error={Boolean(touched.startDate) && Boolean(errors.startDate)}
//                 helperText={touched.startDate && errors.startDate}
           
//                 sx={{ gridColumn: isNonMobile ? "span 2" : "span 4" }}

//                 /> */}
              
//               <TextField
              
//                 // label="Start Date"
//                 type="date"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.startDateTime}
//                 name="startDateTime"
//                 error={Boolean(touched.startDateTime) && Boolean(errors.startDateTime)}
//                 helperText={touched.startDateTime && errors.startDateTime}
           
//                 sx={{ gridColumn: isNonMobile ? "span 2" : "span 4" }}
//                 // alignItems= "flex-start"
//               />
               
//                {/* <label>Start time</label> */}
//               {/* <TextField
//                 // label="Start Time"
//                 type="time"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.startTiming}
//                 name="Timing"
//                 error={Boolean(touched.startTiming) && Boolean(errors.startTiming)}
//                 helperText={touched.startTiming && errors.startTiming}
             
//                 sx={{ gridColumn: isNonMobile ? "span 2" : "span 4" }}
//               /> */}
  
//               <RadioGroup
//                 row
//                 aria-label="In Person or Virtual"
//                 name="locationType"
//                 value={values.locationType}
//                 onChange={handleChange}
//                 sx={{ gridColumn: "span 4" }}
//               >
//                 <FormControlLabel
//                   value="inPerson"
//                   control={<Radio />}
//                   label="In Person"
//                 />
//                 <FormControlLabel
//                   value="virtual"
//                   control={<Radio />}
//                   label="Virtual"
//                 />
//               </RadioGroup>
              
//               <TextField
//                 label="details"
//                 multiline
//                 rows={4}
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.details}
//                 name="details"
//                 error={Boolean(touched.details) && Boolean(errors.details)}
//                 helperText={touched.details && errors.details}
//                 sx={{ gridColumn: "span 4" }}
//               />
  
//               {/* <Box
//                 gridColumn="span 4"
//                 border={`1px solid ${palette.neutral.medium}`}
//                 borderRadius="5px"
//                 p="1rem"
//               >
//                 <Dropzone
//                   acceptedFiles=".jpg,.jpeg,.png"
//                   multiple={false}
//                   onDrop={(acceptedFiles) =>
//                     setFieldValue("eventPicture", acceptedFiles[0])
//                   }
//                 >
//                   {({ getRootProps, getInputProps }) => (
//                     <Box
//                       {...getRootProps()}
//                       border={`2px dashed ${palette.primary.main}`}
//                       p="1rem"
//                       sx={{ "&:hover": { cursor: "pointer" } }}
//                     >
//                       <input {...getInputProps()} />
//                       {!values.eventPicture ? (
//                         <p>Add Event Picture Here</p>
//                       ) : (
//                         <FlexBetween>
//                           <Typography>{values.eventPicture.name}</Typography>
//                         </FlexBetween>
//                       )}
//                     </Box> */}
//                   {/* )} */}
//                 {/* </Dropzone>
//               </Box> */}
//             </Box>
  
//             {/* BUTTONS */}
//             <Box>
//               <Button
//                 fullWidth
//                 type="submit"
//                 sx={{
//                   m: "2rem 0",
//                   p: "1rem",
//                   // backgroundColor: palette.primary.main,
//                   // color: palette.background.alt,
//                   // "&:hover": { color: palette.primary.main },
                  
//                 }}
//                 // onclick={()=>Navigate('event')}
//                 // onclick={createEvent()}
//               >
//                 CREATE EVENT
//               </Button>
//             </Box>
//         </form>
//         )}
//       </Formik>
//     );
//   };
  
//   export default CreateEventForm;
  
  import FlexBetween from "components/FlexBetween";
import { Box,useTheme,useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import WidgetWrapper from "components/WidgetWrapper";
import {
  
  Divider,
  Typography,
  InputBase,
  
  Button,
  IconButton,
  MenuItem,Select
} from "@mui/material";

const  CreateEventForm = () => {
  const { palette } = useTheme();
  const [eventName, setEventName] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [locationType, setLocationType] = useState('');
  const [details, setDetails] = useState('');
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleSubmit = async() => {
    // event.preventDefault();
    // You can perform form submission logic here
    const formData = {
      eventName,
      startDateTime,
      locationType,
      details,
    };
    
    try {
      const response =await fetch("http://localhost:3000/event/api/submit", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.ok) {
        const responseData = await response.json();
        console.log('Data saved:', responseData);
        // Clear form or perform other actions after successful submission
        setEventName('');
        setStartDateTime('');
        setLocationType('');
        setDetails('');
      } else {
        console.error('Failed to save data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
    console.log('Submitting:', {
      eventName,
      startDateTime,
      locationType,
      details,
    });
 

  return (

    <WidgetWrapper>
    <div>
      <h2>Create Event Page</h2>
      <Box
                display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}>
      <FlexBetween>
      <form onSubmit={handleSubmit}>
        <Box>
         
        <label>
          Event Name:
          <input sx={{ gridColumn: "span 4" }}
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </label>
       
        </Box>
        <br />
        <Box>
        <label>
          Start Date and Time:
          <input
            sx={{ gridColumn: isNonMobile ? "span 2" : "span 4" }}
            type="datetime-local"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
          />
        </label>
        </Box>
        <br />
        <Box>
        <label>
          Location Type (In Person or Virtual):
          <select
            sx={{ gridColumn: "span 4" }}
            value={locationType}
            onChange={(e) => setLocationType(e.target.value)}
          >
            <option value="">Select</option>
            <option value="inPerson">In Person</option>
            <option value="virtual">Virtual</option>
          </select>
        </label>
        </Box>
        <br />
        <Box>
        <label>
          Event Details:
          <textarea
             sx={{ gridColumn: "span 4" }}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </label>
        </Box>
        <br />
        {/* <button type="submit"  
                fullWidth
                sx={{
                  m: "2rem 0",
                  p: "1rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": { color: palette.primary.main },
                  
                }}>Submit</button> */}


      <Button
          type="submit"
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
          >
            POST
          </Button>
      </form>
      </FlexBetween>
      </Box>
    </div>
    </WidgetWrapper>
  );
};

export default CreateEventForm;
