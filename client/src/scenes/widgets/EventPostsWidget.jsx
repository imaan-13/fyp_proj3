
import React, { useEffect, useState } from "react";
import PostWidget from "./PostWidget";
import { useSelector } from "react-redux/es/hooks/useSelector";
import EventPostWidget from "./EventPostWidget";

const EventPostsWidget = ({ isProfile, isCommunity,community,getSaved}) => {
  const [posts, setPosts] = useState([]);
  const token = useSelector((state) => state.token)
const { _id, picturePath,firstName,lastName } = useSelector((state) => state.user);
 
  const [user, setUser] = useState({ _id: "" });

  const fetchPosts = async (url) => {
    setPosts([]);

    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log("Fetched Posts:", data);
    setPosts(data);
  
  };

 const fetchCommunityPosts=async(commUrl,community)=>{
  setPosts([]);

  const response = await fetch(commUrl, {
    method: "POST",
   
    headers: { Authorization: `Bearer ${token}` ,"Content-Type": "application/json"},
    body: JSON.stringify({community:community}),
 
  });
  const data = await response.json();
  console.log("Fetched Posts:", data);
  setPosts(data);
 }

 const fetchSavedPosts = async () => {
  setPosts([]);
  console.log("some id",_id)
  try {
    const response = await fetch("http://localhost:3000/event/saved-posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: _id }), // Send the user's ID or other relevant data
    });

    if (response.ok) {
      const data = await response.json();
      setPosts(data);
    } else {
      // Handle error cases if needed
    }
  } catch (error) {
    // Handle fetch error
    console.error("Error fetching saved posts: ", error);
  }
};


  useEffect(() => {
    // Fetch user, token, and posts here
    if (isCommunity) {
      // const communityUrl = `http://localhost:3000/posts/${community}`;
      // fetchPosts(communityUrl);
      
      const commurl=`http://localhost:3000/event/community`;
      fetchCommunityPosts(commurl,community);
    }else if(getSaved){

      fetchSavedPosts()
    }
    
    
    else{
      const normalUrl = "http://localhost:3000/event";
      fetchPosts(normalUrl);
    }
 
  }, [isProfile, isCommunity, _id, token, community]);
  

  console.log(isProfile);
  console.log(isCommunity)
  console.log(typeof(community))
  console.log("array",Array.isArray(posts))
  return (


    <>
   
    {Array.isArray(posts) ? (
        posts.map((post) => (
          <EventPostWidget
            postId={post._id}
            eventName={post.eventName}
            // photo={post.photo}
            postedBy={post.postedBy}
            // firstName={user._id.firstName}
            date={post.startDate}
            time={post.startTime}
            location={post.locationType}
            details={post.details}
            contact={post.contact}
            community={post.community}
            userPhoto={post.userPhoto}
            userName={post.name}
            // community={post.community}
          />
        ))
       
      ) : (
        <p>No posts available.</p>
      )}
  </>
  
  );

};

export default EventPostsWidget;
