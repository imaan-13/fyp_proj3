
import React, { useEffect, useState } from "react";
import PostWidget from "./PostWidget";
import { useSelector } from "react-redux/es/hooks/useSelector";
const PostsWidget = ({ isProfile, isCommunity,community,userId}) => {
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


 

  useEffect(() => {
    // Fetch user, token, and posts here
    if (!isCommunity&&!isProfile) {
      // const communityUrl = `http://localhost:3000/posts/${community}`;
      // fetchPosts(communityUrl);
      const normalUrl = "http://localhost:3000/posts";
      fetchPosts(normalUrl);
    }
    else if (isProfile) {
      const profileUrl = `http://localhost:3000/posts/${userId}/posts`;
      fetchPosts(profileUrl);
    } 
    
    else{
      // const normalUrl = "http://localhost:3000/posts";
      // fetchPosts(normalUrl);
      const communityUrl = `http://localhost:3000/posts/community`;
      // fetchPosts(communityUrl);
      console.log("communitu",community);
      fetchCommunityPosts(communityUrl,community);
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
          <PostWidget
            postId={post._id}
            body={post.body}
            photo={post.photo}
            postedBy={post.postedBy}
            // firstName={user._id.firstName}
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

export default PostsWidget;
