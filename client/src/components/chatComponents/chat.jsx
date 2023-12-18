
import Messages from "./Messages";
import Input from "./Input";
import { useEffect } from "react";
const Chat = ({selectedChat, chatData, user}) => {


useEffect(() => {
 
  console.log("from chat!!!!!", chatData)
}, [chatData]); 
  return (
    <div className="chat">
      <div className="chatInfo">
        {/* <span>{selectedChat.user.name}</span> */}
        <div className="chatIcons">
        
        </div>
      </div>
      
      <Messages chatId={selectedChat} user={
      user}/>
    <Input chatData={chatData} user={user}/>
    </div>
  );
};

export default Chat;

