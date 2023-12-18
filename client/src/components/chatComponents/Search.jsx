import React, { useContext, useState, useEffect } from "react";
import { getFirestore,getDocs, collection, doc, getDoc, query, where, setDoc,serverTimestamp,updateDoc} from 'firebase/firestore';
 import '../../index.css';


import { getDatabase, ref, get } from "firebase/database";
import { useSelector } from 'react-redux'
import {db,storage} from "../../firebase";;

const Search = ({user}) => {
  const { _id, picturePath, token } = useSelector((state) => state.user);

  const [username, setUsername] = useState("");

  // const [user, setUser] = useState(null);
  const[searchuser, setSearchuser]=useState(null);

  const [err, setErr] = useState(false);

//   const { currentUser } = useContext(AuthContext);


// const usersCollection = collection(db, 'user');
// const userDocRef = doc(usersCollection, _id);

// const fetchUser = async () => {
//   try {
//     const userDocSnapshot = await getDoc(userDocRef);

//     if (userDocSnapshot.exists()) {
//       const userData = userDocSnapshot.data();
//       console.log('User data:', userData);
//       setUser(userData);
//       setErr(false);
//     } else {
//       console.log('User not found');
//       setUser(null);
//       setErr(true);
//     }
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     setErr(true);
//   }
// };



useEffect(() => {
  // fetchUser();
  console.log("current useer", user);
}, []);

  const handleSearch = async () => {
    const q = query(
      collection(db, "user"),
      where("name", "==", username)
      
    );
    // console.log(q);

    
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('No matching documents.');
      // Handle the case when no user is found
      setErr(true);
    } else {
      // Assuming you want to handle the case when there is only one matching document
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      console.log('User data:', userData);
      setSearchuser(userData);
      setErr(false);
    }
  }


  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  // const handleSelect = async () => {
  //   //check whether the group(chats in firestore) exists, if not create

  //   if(user && searchuser){
  //       const combinedId =
  //     user.id > searchuser.id
  //       ? user.id + searchuser.id
  //       : searchuser.id + user.id;
  //   try {
  //     const res = await getDoc(doc(db, "chats", combinedId));
  
  //       if (!res.exists()) {
  //       //create a chat in chats collection
  //       await setDoc(doc(db, "chats", combinedId), { messages: [] });

  //       //create user chats
  //       await updateDoc(doc(db, "userChats", user.id), {
  //           [combinedId + ".userInfo"]: {
  //       id: searchuser.id,
  //       name: searchuser.name,
  //       picture: searchuser.picture,
  //       },
  //       [combinedId + ".date"]: serverTimestamp(),
  //       });

  //       await updateDoc(doc(db, "userChats", user.id), {
  //         [combinedId + ".userInfo"]: {
  //           id:user.id,
  //           name: user.name,
  //           picture: user.picture,
  //         },
  //         [combinedId + ".date"]: serverTimestamp(),
  //       });
  //     }
    
  //   } catch (err) {}
  // }
  //   setUser(null);
  //   setUsername("")
  // };


  // const handleSelect = async () => {
  //   // Check whether the group (chats in firestore) exists; if not, create
  
   
  //     const combinedId =
  //       user.id > searchuser.id ? user.id + searchuser.id : searchuser.id + user.id;
  //       console.log(combinedId);
  //     try {
  //       const res = await getDoc(doc(db, "chats", combinedId));
  
  //       if (!res.exists()) {
  //         // Create a chat in chats collection
  //         await setDoc(doc(db, "chats", combinedId), { messages: [] });
  
  //         // Create user chats
  //         await updateDoc(doc(db, "userChats", user.id), {
  //           [combinedId + ".userInfo"]: {
  //             id: searchuser.id,
  //             name: searchuser.name,
  //             picture: searchuser.picture,
  //           },
  //           [combinedId + ".date"]: serverTimestamp(),
  //         });
  
  //         await updateDoc(doc(db, "userChats", searchuser.id), {
  //           [combinedId + ".userInfo"]: {
  //             id: user.id,
  //             name: user.name,
  //             picture: user.picture,
  //           },
  //           [combinedId + ".date"]: serverTimestamp(),
  //         });
  //       }
  //     } catch (err) {
  //       console.error("Error handling selection:", err);
  //     }
      
  
  
  //   // Reset user and username after handling the selection
  //   // setUser(null);
  //   // setUsername("");
  // };
  
  const handleClick = () => {
    if (user) {
      handleSelect();
    }
  };

  const handleSelect = async () => {
    try {
      const combinedId =
        user.id > searchuser.id ? user.id + searchuser.id : searchuser.id + user.id;
      console.log(combinedId);
  
      // Check whether the group (chats in Firestore) exists
      const res = await getDoc(doc(db, "chats", combinedId));
  
      if (!res.exists()) {
        // Create a chat in the "chats" collection
        await setDoc(doc(db, "chats", combinedId), { messages: [], id:combinedId });
  
        // Update user chats for the current user
        const userChatRef = doc(db, "userChats", user.id);
        const userChat = await getDoc(userChatRef);
  
        if (userChat.exists()) {
          // If the userChats document exists, update it
          await updateDoc(userChatRef, {
            [combinedId + ".userInfo"]: {
              id: searchuser.id,
              name: searchuser.name,
              picture: searchuser.picture,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        } else {
          // If the userChats document doesn't exist, create it
          await setDoc(userChatRef, {
            [combinedId + ".userInfo"]: {
              id: searchuser.id,
              name: searchuser.name,
              picture: searchuser.picture,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        }
  
        // Update user chats for the selected user
        const searchUserChatRef = doc(db, "userChats", searchuser.id);
        const searchUserChat = await getDoc(searchUserChatRef);
  
        if (searchUserChat.exists()) {
          // If the userChats document exists, update it
          await updateDoc(searchUserChatRef, {
            [combinedId + ".userInfo"]: {
              id: user.id,
              name: user.name,
              picture: user.picture,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        } else {
          // If the userChats document doesn't exist, create it
          await setDoc(searchUserChatRef, {
            [combinedId + ".userInfo"]: {
              id: user.id,
              name: user.name,
              picture: user.picture,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        }
      }
    } catch (err) {
      console.error("Error handling selection:", err);
    }
  };
  
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {/* {err && <span>User not found!</span>} */}
      {searchuser && (
        <div className="userChat" onClick={handleClick}>
          <img src={searchuser.picture} alt="" />
          <div className="userChatInfo">
            <span>{searchuser.name}</span>
          </div>
        </div>
      )}
    </div>
  );
    }

export default Search;

