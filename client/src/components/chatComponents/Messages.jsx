// import { doc, onSnapshot } from "firebase/firestore";
// import React, { useContext, useEffect, useState } from "react";
// import db from "../../firebase";

// import Message from "./Message";

// const Messages = (data) => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
//       doc.exists() && setMessages(doc.data().messages);
//     });

//     return () => {
//       unSub();
//     };
//   }, [data.chatId]);

//   console.log(messages)

//   return (
//     <div className="messages">
//       {messages.map((m) => (
//         <Message message={m} key={m.id} />
//       ))}
//     </div>
//   );
// };

// export default Messages;

// import React, { useEffect, useState } from "react";
// import { doc, onSnapshot } from "firebase/firestore";
// import db from "../../firebase";
// import Message from "./Message";

// const Messages = ({ chatId }) => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
//       doc.exists() && setMessages(doc.data()?.messages || []);
//     });

//     return () => {
//       unSub();
//     };
//   }, [chatId]);

//   return (
//     <div className="messages">
//       {messages.map((m) => (
//         <Message message={m} key={m.id} />
//       ))}
//     </div>
//   );
// };

// export default Messages;




// import React, { useEffect, useState } from "react";
// import { doc, onSnapshot } from "firebase/firestore";
// import db from "../../firebase";
// import Message from "./Message";

// const EmptyMessagesScreen = () => {
//   return (
//     <div className="empty-messages-screen">
//       {/* You can customize the empty messages screen UI */}
//       <p>No messages yet. Start a conversation!</p>
//     </div>
//   );
// };

// const Messages = ({chatId}) => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
//       doc.exists() && setMessages(doc.data()?.messages || []);
//     });

//     return () => {
//       unSub();
//     };
//   }, [chatId]);

//   return (
//     <div className="messages">
//       {messages.length === 0 ? (
//         <EmptyMessagesScreen />
//       ) : (
//         messages.map((m) => <Message message={m} key={m.id} />)
//       )}
//     </div>
//   );
// };

// export default Messages;




import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import {db,storage} from "../../firebase";
import Message from "./Message";

const EmptyMessagesScreen = () => {
  return (
    <div className="empty-messages-screen">
      {/* You can customize the empty messages screen UI */}
      <p>No messages yet. Start a conversation!</p>
    </div>
  );
};

const Messages = ({ chatId, user }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // console.log("the IDDD",chatId)


    const idString = typeof chatId === 'object' ? chatId.selectedChat : chatId;

    const chatDocRef = doc(db, "chats", idString); // Create a DocumentReference

    const unSub = onSnapshot(chatDocRef, (doc) => {
      doc.exists() && setMessages(doc.data()?.messages || []);
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  return (
    <div className="messages">
      {messages.length === 0 ? (
        <EmptyMessagesScreen />
      ) : (
        messages.map((m) => <Message message={m} currentUser={user} />)
      )}
    </div>
  );
};

export default Messages;
