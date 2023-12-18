import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {db,storage} from '../../firebase';
import Chat from "./chat";
const Chats = ({ currentUser, chats, setChats, handleSelect }) => {
  useEffect(() => {
    const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.id), (doc) => {
        setChats(doc.data());
      });

      return () => {
        console.log(chats);
        unsub();
      };
    };

    currentUser.id && getChats();
  }, [currentUser.id]);

  // const handleSelect = (u) => {
  //   // Dispatch or use the selected chat information as needed
  //   // For simplicity, just set the selected chat state in this example
  //   setSelectedChat(u);
  // };

  // return (
    // <div className="chats">
    //   { chats && currentUser && Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
    //     <div
    //       className="userChat"
    //       key={chat[0]}
    //       onClick={() => handleSelect(chat[1].userInfo)}
    //     >
    //       <img src={chat[1].userInfo.picture} alt="" />
    //       <div className="userChatInfo">
    //         <span>{chat[1].userInfo.name}</span>
    //         <p>{chat[1].lastMessage?.text}</p>
    //         {console.log('UserInfo from chats:', chat[1].userInfo.id)}
    //       </div>
    //     </div>
    //   ))}

      
    
    // </div>

//     <div className="chats">
//   {Object.entries(chats)
//         ?.sort((a, b) => b[1]?.date - a[1]?.date)
//         .map((chat) => {
//           const chatInfo = chat[1];
//           if (chatInfo && chatInfo.userInfo ) {
//             return (
//       <div
//         className="userChat"
//         key={chat[0]}
//         onClick={() => handleSelect(chatInfo.userInfo)}
//       >
//         <img src={chatInfo.userInfo.picture} alt="" />
//                 <div className="userChatInfo">
//           <span>{chatInfo.userInfo.name}</span>
//             <p>{chatInfo.lastMessage?.text}</p>
//           {console.log('Rendering chat:', chatInfo)}
//         </div>
//       </div>
//     );
//           } else {
//             console.warn('Skipping chat due to missing properties:', chat);
//           }
//           return null;
//         })}
// </div>


return (
  <div className="chats">
    {Object.entries(chats)
      ?.sort((a, b) => b[1]?.date - a[1]?.date)
      .map((chat) => {
        const chatInfo1=chat[1];
        const chatInfo = chat[1].userInfo;
        console.log("chat from chats",chatInfo);
        // Check if chatInfo and userInfo are defined
        if ( chatInfo) {
          // Check if required properties exist before rendering
          const { name, picture, id } = chatInfo;

          return (
            <div
              className="userChat"
              key={chat[0]}
              onClick={() => handleSelect(chatInfo)}
            >
              {picture && <img src={picture} alt="" />}
              <div className="userChatInfo">
                {name && <span>{name}</span>}
                {/* {lastMessage?.text && <p>{lastMessage.text}</p>} */}
                {console.log('Rendering chat:', chatInfo)}
              </div>
            </div>
          );
        } else {
          console.warn('Skipping chat due to missing properties:', chat);
        }

        return null;
      })}
  </div>
);


};

export default Chats;




// const Chats = ({ currentUser, chats, setChats, handleSelect }) => {
//   // Check if necessary props are available

//   useEffect(() => {

    
//   if (!currentUser || !chats) {
//     // You might also want to render a loading state or placeholder
//     return <div>Loading...</div>;
//   }
   
//   const getChats = () => {
//     if (!currentUser) return;

//     const unsub = onSnapshot(doc(db, "userChats", currentUser.id), (doc) => {
//       setChats(doc.data());
//     });

//     return unsub;
//   };

//   currentUser.id &&getChats();

//   // return () => {
//   //   console.log(chats);

//   // };

 
//   }, [currentUser.id]);


//   return (
//     // <div className="chats">
//     //    {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
//     //           <div
//     //             className="userChat"
//     //             key={chat[0]}
//     //             onClick={() => handleSelect(chat[1].userInfo.id)}
//     //           >
//     //             {chat[1].userInfo.picture&& <img src={chat[1].userInfo.picture} alt="" />}
//     //             <div className="userChatInfo">
//     //               {chat[1].userInfo.name&&<span>{chat[1].userInfo.name}</span>}

//     //               {chat[1].lastMessage?.text&&<p>{chat[1].lastMessage?.text}</p>}
//     //               {console.log('UserInfo from chats:', chat[1].userInfo.id)}
//     //             </div>
//     //           </div>
//     //         ))}

      
    
//     // </div>

//     <div className="chats">
//   {chats && Object.entries(chats)
//     ?.sort((a, b) => b[1]?.date - a[1]?.date)
//     .map((chat) => (
//       <div
//         className="userChat"
//         key={chat[0]}
//         onClick={() => handleSelect(chat[1]?.userInfo?.id)}
//       >
//         {chat[1]?.userInfo?.picture ? (
//           <img src={chat[1]?.userInfo?.picture} alt="" />
//         ) : null}
//         <div className="userChatInfo">
//           {chat[1]?.userInfo?.name && <span>{chat[1]?.userInfo?.name}</span>}
//           {chat[1]?.lastMessage?.text && <p>{chat[1]?.lastMessage?.text}</p>}
//           {console.log('UserInfo from chats:', chat[1]?.userInfo?.id)}
//         </div>
//       </div>
//     ))}
// </div>

//   );
// };

// export default Chats;
