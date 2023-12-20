// import React, { useState } from 'react';
// import { useParams } from "react-router-dom";
// const StarRating = () => {
//   const [rating, setRating] = useState(0);
//   const { userId } = useParams();

//   const handleStarClick = (clickedRating) => {
//     setRating(clickedRating);
//   };

//   return (
//     <div style={{ textAlign: 'center', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
//       <h2>Rate the Event Organizer</h2>
//       <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//         {[1, 2, 3, 4, 5].map((star) => (
//           <span
//             key={star}
//             style={{
//               fontSize: '2em',
//               color: star <= rating ? '#ffc107' : '#ddd',
//               cursor: 'pointer',
//               transition: 'color 0.3s',
//             }}
//             onClick={() => handleStarClick(star)}
//           >
//             ★
//           </span>
//         ))}
//       </div>
//       <div style={{ marginTop: '20px', fontSize: '1.2em', color: '#555' }}>{`You rated this event organizer ${rating} stars.`}</div>
//     </div>
//   );
// };

// export default StarRating;


import React, { useState } from 'react';
// import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { Rating } from '@mui/material';
import WidgetWrapper from 'components/WidgetWrapper';
const StarRating = () => {
  const [rating, setRating] = useState(0);
  const[avgRating,setavgRating]=useState(0);
  const { userId } = useParams();
  const { _id  } = useSelector((state) => state.user);
  const [isVerified, setIsVerified] = useState(false);

  const fetchVerificationStatus = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/event-organizer/verify-status/${_id}`
        // Adjust the endpoint URL to match your backend route
      );

      if (response.ok) {
        const data = await response.json();
        setIsVerified(data.isVerified); // Assuming your API response has an "isVerified" property
        console.log(isVerified)
      } else {
        console.error("Error fetching verification status");
      }
    } catch (error) {
      console.error("An error occurred while fetching verification status:", error);
    }
  };
  // useEffect(() => {
  

  //   fetchVerificationStatus();
  // }, [_id]);
  

  const getUserRating = async () => {
    try {
      // Replace 'YOUR_BACKEND_API_ENDPOINT' with the actual URL of your API endpoint
      const response = await fetch(`http://localhost:3000/event-organizer/getRating/${_id}/${userId}`);

      if (response.ok) {
        const data = await response.json();
        setRating(data.userRating);
        setavgRating(data.averageRating);
        setIsVerified(true);
        console.log(
          "ALREADY RATING",rating)
      } else {
        console.error('Error fetching user rating:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user rating:', error);
    }
  };

  useEffect(() => {
    // Fetch user rating when the component mounts
  
    getUserRating();
    
  },);

  const handleStarClick = async (clickedRating) => {
    console.log("clicked star", clickedRating, "current user", _id)
    setRating(clickedRating);

    try {
      // Replace 'YOUR_BACKEND_API_ENDPOINT' with the actual URL of your API endpoint
      const response = await fetch('http://localhost:3000/event-organizer/rating', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Specify the content type as JSON
        },
        body: JSON.stringify({
            eventOrganizerId: userId, // Replace with the actual event organizer ID
            rating: clickedRating,
            userId:_id,
  }),
});

      console.log('Rating sent successfully');
      // Optionally, you can handle the response data if needed
      const data = await response.json();
      console.log('Average Rating:', data.averageRating);
    } catch (error) {
      console.error('Error sending rating to the backend:', error);
    }
  };

  // return (
  //   <div style={{ textAlign: 'center', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
  //     <h2>Rate the Event Organizer</h2>
  //     <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
  //       {[1, 2, 3, 4, 5].map((star) => (
  //         <span
  //           key={star}
  //           style={{
  //             fontSize: '2em',
  //             color: star <= rating ? '#ffc107' : '#ddd',
  //             cursor: 'pointer',
  //             transition: 'color 0.3s',
  //           }}
  //           onClick={() => handleStarClick(star)}
  //         >
  //           ★
  //         </span>
  //       ))}
  //     </div>
  //     <div style={{ marginTop: '20px', fontSize: '1.2em', color: '#555' }}>{`You rated this event organizer ${rating} stars.`}</div>
  //     <div style={{ marginTop: '20px', fontSize: '1.2em', color: '#555' }}>{`Overall Ratings ${avgRating}`}</div>
  //   </div>
  // );

  return (

    <WidgetWrapper>
    <div style={{ textAlign: 'center', backgroundColor: 'transparent', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h2>Rate the Event Organizer</h2>
      
      {isVerified ? (
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{
                  fontSize: '2em',
                  color: star <= rating ? '#ffc107' : '#ddd',
                  cursor: 'pointer',
                  transition: 'color 0.3s',
                }}
                onClick={() => handleStarClick(star)}
              >
                ★
              </span>
            ))}
          </div>
          <div style={{ marginTop: '20px', fontSize: '1.2em', color: '#555' }}>{`You rated this event organizer ${rating} stars.`}</div>
          <div style={{ marginTop: '20px', fontSize: '1.2em', color: '#555' }}>{`Overall Ratings ${avgRating}`}</div>
        </div>
      ) : (
        <div>
          <p>This user is not verified, so you cannot rate the event organizer.</p>
          {/* You can customize the message or UI based on your requirements */}
        </div>
      )}
    </div>
    </WidgetWrapper>
  );
};

export default StarRating;
