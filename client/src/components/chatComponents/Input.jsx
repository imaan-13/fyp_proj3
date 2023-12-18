



import React, { useState, useEffect } from "react";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase";
import { v4 as uuid } from "uuid";

const Input = ( {chatData, user} ) => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
const[chat, setChat]=useState(null);

 
  const handleSend = async () => {
    // Check if there is text or an image to send
    if (!text && !img) {
      return;
    }


    if (!chatData) {
      console.error("Chat data is null");
      return;
    }

    try {
      // Fetch the existing chat document
 
      console.log("Chat Data ID:", chatData.id);
      const chatDocRef = doc(db, "chats", chatData.id);
      const chatDocSnapshot = await getDoc(chatDocRef);

      if (chatDocSnapshot.exists()) {
        // Chat document exists, update it with the new message
        if (img) {
          const storageRef = ref(storage, uuid());
          const uploadTask = uploadBytesResumable(storageRef, img);
          await uploadTask;
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          await updateDoc(chatDocRef, {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: user.id,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });

          // Clear the image state after sending
          setImg(null);
        } else {
          await updateDoc(chatDocRef, {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: user.id,
              date: Timestamp.now(),
            }),
          });
        }
      } else {
        // Handle the case where the chat document does not exist
        console.log("Chat document does not exist");
      }
    } catch (error) {
      console.error("Error updating chat document:", error);
    }

    // Clear the text input after sending
    setText("");
  };


  useEffect(() => {
    // Fetch data from an API or perform other asynchronous tasks
 
  setChat(chatData);
  console.log(chatData)
  }, [chat]);
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">Attach Image</label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
