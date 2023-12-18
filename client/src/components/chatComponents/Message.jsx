// import React, { useContext, useEffect, useRef } from "react";


// const Message = ({ message, currentUser, data }) => {
// //   const { currentUser } = useContext(AuthContext);
// //   const { data } = useContext(ChatContext);

//   const ref = useRef();

//   useEffect(() => {
//     ref.current?.scrollIntoView({ behavior: "smooth" });
//   }, [message]);

//   return (
//     <div
//       ref={ref}
//       className={`message ${message.senderId === currentUser.uid && "owner"}`}
//     >
//       <div className="messageInfo">
//         <img
//           src={
//             message.senderId === currentUser.uid
//               ? currentUser.photoURL
//               : data.user.photoURL
//           }
//           alt=""
//         />
//         <span>just now</span>
//       </div>
//       <div className="messageContent">
//         <p>{message.text}</p>
//         {message.img && <img src={message.img} alt="" />}
//       </div>
//     </div>
//   );
// };

// export default Message;


// import React, { useEffect, useRef } from "react";

// const Message = ({ message, currentUser, data }) => {
//   const ref = useRef();

//   useEffect(() => {
//     ref.current?.scrollIntoView({ behavior: "smooth" });
//   }, [message]);

//   return (
//     <div
//       ref={ref}
//       className={`message ${message.senderId === currentUser.id && "owner"}`}
//     >
//       {/* You can customize the message UI here */}
//       <div className="messageInfo">
//         <img
//           src={
//             message.senderId === currentUser.id
//               ? currentUser.picture
//               : data.user.picture
//           }
//           alt=""
//         />
//         {/* <span>just now</span> */}
//       </div>
//       <div className="messageContent">
//         <p>{message.text}</p>
//         {message.img && <img src={message.img} alt="" />}
//       </div>
//     </div>
//   );
// };

// export default Message;




import React, { useEffect, useRef, useState} from "react";
import { getFirestore,getDocs, collection, doc, getDoc, query, where, setDoc,serverTimestamp,updateDoc} from 'firebase/firestore';
import {db,storage} from "../../firebase";

const Message = ({ message, currentUser, data }) => {
  const[picture,setpicture]=useState(null);
  const ref = useRef();


  const fetchImage = async (senderId) => {
    try {
      // Reference to the user document in Firebase Firestore
      const userDocRef = doc(db, 'user', senderId);
      
      // Fetch user document snapshot
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        console.log('User data:', userData);
  
        // Assuming there is a 'picture' field in the user document
        const userPicture = userData.picture;
        setpicture(userData.picture);
  
        // Do something with the userPicture (e.g., set it in state)
        // setSenderPicture(userPicture);
      } else {
        console.log('User not found');
        // Handle the case where the user document does not exist
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      // Handle the error, e.g., set an error state
    }
  };
  





  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    fetchImage(message.senderId);
  }, [message]);

  // Check if data and data.user are defined before accessing properties
  const userPicture = data && data.user ? data.user.picture : "";

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.id && "owner"}`}
    >
      {/* You can customize the message UI here */}
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.id
              ? currentUser.picture
              : picture
          }
          alt=""
        />
        {/* <span>just now</span> */}
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;

