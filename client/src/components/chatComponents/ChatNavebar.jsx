import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  getFirestore,
  getDoc,
  collection,
  doc,
} from 'firebase/firestore';
import {db,storage} from '../../firebase';
import FlexBetween from 'components/FlexBetween';

const ChatNavbar = () => {
  const { _id } = useSelector((state) => state.user);

  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const usersCollection = collection(db, 'user');
  const userDocRef = doc(usersCollection, _id);

  const fetchUser = async () => {
    try {
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        console.log('User data:', userData);
        setUser(userData);
        setErr(false);
      } else {
        console.log('User not found');
        setUser(null);
        setErr(true);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setErr(true);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="navbar">
      <span className="logo">Lama Chat</span>
 
      <div className="user">
        <FlexBetween>
        {user && (
          <>
            <img src={user.picture} alt="" style={{ marginRight: '8px' }}/>
        
            <span>{user.name}</span>
            
          </>
        )}
        </FlexBetween>
      </div>

    </div>
  );
};

export default ChatNavbar;
