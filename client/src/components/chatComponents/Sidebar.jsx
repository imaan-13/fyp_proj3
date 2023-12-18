import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'

import ChatNavbar from "./ChatNavebar";
import Search from "./Search"
import { getFirestore,getDocs, collection, doc, getDoc, query, where, setDoc,serverTimestamp,updateDoc} from 'firebase/firestore';

import Chats from "./Chats"
import {db,storage} from "../../firebase";;

const Sidebar = ({handleSelect, currentUser}) => {

  const [chats, setChats] = useState([]);
  
  const { _id, picturePath, token } = useSelector((state) => state.user);

  const [username, setUsername] = useState("");

  const [user, setUser] = useState(null);
  const[searchuser, setSearchuser]=useState(null);

  const [err, setErr] = useState(false);
const usersCollection = collection(db, 'user');
const userDocRef = doc(usersCollection, _id);

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



// useEffect(() => {
//   fetchUser();
// }, []);

  return (
    <div className="sidebar">
      <ChatNavbar/>
      <Search  user={currentUser}/>
 
      {currentUser && <Chats
        currentUser={currentUser}
        chats={chats}
        setChats={setChats}
        handleSelect={handleSelect}
      />}
    </div>
  );
};

export default Sidebar;