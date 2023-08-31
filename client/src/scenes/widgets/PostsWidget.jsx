// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setPosts } from "state";
// import PostWidget from "./PostWidget";

// const PostsWidget = ({ userId, isProfile = false }) => {
//   const dispatch = useDispatch();
//   const posts = useSelector((state) => state.posts);
//   const token = useSelector((state) => state.token);

//   const getPosts = async () => {
//     const response = await fetch("http://localhost:3000/posts", {
//       method: "GET",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await response.json();
//     dispatch(setPosts({ posts: data }));
//   };

//   const getUserPosts = async () => {
//     const response = await fetch(
//       `http://localhost:3000/posts/${userId}/posts`,
//       {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     const data = await response.json();
//     dispatch(setPosts({ posts: data }));
//   };

//   useEffect(() => {
//     if (isProfile) {
//       getUserPosts();
//     } else {
//       getPosts();
//     }
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   return (
//     <>
//       {posts.map(
//         (
//           _id,
//           userId,
//           firstName,
//           lastName,
//           description,
//           location,
//           picturePath,
//           userPicturePath,
//           // likes,
//           // comments,
//         ) => (
//           <PostWidget
//             key={_id}
//             postId={_id}
//             postUserId={userId}
//             name={`${firstName} ${lastName}`}
//             description={description}
//             location={location}
//             picturePath={picturePath}
//             userPicturePath={userPicturePath}
//             // likes={likes}
//             // comments={comments}
//           />
//         )
//       )}
//     </>
//   );
// };

// export default PostsWidget;


// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setPosts } from "state"; // Make sure to adjust this import as needed
// import PostWidget from "./PostWidget";

// const PostsWidget = ({ userId, isProfile = false }) => {
//   const dispatch = useDispatch();
//   const posts = useSelector((state) => state.auth.posts); // Adjust the selector as per your store structure
//   const token = useSelector((state) => state.auth.token); // Adjust the selector as per your store structure

//   const fetchPosts = async (url) => {
//     const response = await fetch(url, {
//       method: "GET",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await response.json();
//     dispatch(setPosts({ posts: data }));
//   };

//   useEffect(() => {
//     const url = isProfile
//       ? `http://localhost:3000/posts/${userId}/posts`
//       : "http://localhost:3000/posts";

//     fetchPosts(url);
//   }, [isProfile, userId, token]); // Include isProfile, userId, and token in dependencies

//   return (
//     <>
//       {posts.map((post) => (
//         <PostWidget
//           key={post._id}
//           postId={post._id}
//           postUserId={post.postedBy}
//         //   name={`${post.postedBy.firstName} ${post.postedBy.lastName}`}
//           description={post.body}
//         //   picturePath={post.photo}
//         />
//       ))}
//     </>
//   );
// };

// export default PostsWidget;




// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setPosts } from "state"; // Adjust the import path as needed
// import PostWidget from "./PostWidget";

// const PostsWidget = ({ userId, isProfile = false }) => {
//   const dispatch = useDispatch();
//   const posts = useSelector((state) => state.auth.posts); // Adjust the selector based on your store structure
//   const token = useSelector((state) => state.auth.token); // Adjust the selector based on your store structure
//   const { _id } = useSelector((state) => state.user);
//   const fetchPosts = async (url) => {
//     const response = await fetch(url, {
//       method: "GET",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await response.json();
//     dispatch(setPosts({ posts: data }));
//   };

//   useEffect(() => {
//     const url = isProfile
//       ? `http://localhost:3000/posts/${userId}/posts`
//       : "http://localhost:3000/posts";

//     fetchPosts(url);
//   }, [isProfile, _id, token]); // Include isProfile, userId, and token in dependencies

//   return (
//     <>
//       {posts.map((post) => (
//         <PostWidget
//           key={post._id}
//         //   title={post.title}
//           body={post.body}
//         //   photo={post.photo}
//           postedBy={post.postedBy}
//         />
//       ))}
//     </>
//   );
// };

// export default PostsWidget;



// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import { setPosts } from "state"; // Adjust the import path as needed
// import PostWidget from "./PostWidget";
// import { setPosts } from "state/index.js";

// const PostsWidget = ({ userId, isProfile = false }) => {

//   const dispatch = useDispatch();
//   const posts = useSelector((setPosts) => setPosts.auth.posts); // Adjust the selector based on your store structure
//   const token = useSelector((state) => state.auth.token); // Adjust the selector based on your store structure
//   const { _id } = useSelector((state) => state.user);

//   const fetchPosts = async (url) => {
//     const response = await fetch(url, {
//       method: "GET",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await response.json();
//     console.log("Fetched Posts:", data); // Debug: Log fetched data
//     dispatch(setPosts({ posts: data }));
//   };

//   useEffect(() => {
//     const url = isProfile
//       ? `http://localhost:3000/posts/${_id}/posts`
//       : "http://localhost:3000/posts";

//     fetchPosts(url);
//   }, [isProfile, _id, token]);

//   console.log("Posts in Component:", data); // Debug: Log posts in component

//   return (
//     <>
//       {posts.map((post) => (
//         <PostWidget
//         //   key={post._id}
//           body={post.body}
//           postedBy={post.postedBy}
//         />
//       ))}
//     </>
//   );
// };

// export default PostsWidget;


import React, { useEffect, useState } from "react";
import PostWidget from "./PostWidget";
import { useSelector } from "react-redux/es/hooks/useSelector";
const PostsWidget = ({ isProfile = false }) => {
  const [posts, setPosts] = useState([]);
  const token = useSelector((state) => state.token)
const { _id, picturePath,firstName,lastName } = useSelector((state) => state.user);
 
  const [user, setUser] = useState({ _id: "" });

  const fetchPosts = async (url) => {
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log("Fetched Posts:", data);
    setPosts(data);
  
  };

  useEffect(() => {
    // Fetch user, token, and posts here
    const url = isProfile
      ? `http://localhost:3000/posts/${user._id}/posts`
      : "http://localhost:3000/posts";

    fetchPosts(url);
  }, [isProfile, user._id, token]);

  // const fetchUserPosted=async()=>{
  //   const userResponse = await fetch(`http://localhost:3000/users/${userId}`);
  //   const userData = await userResponse.json();
  //   return userData;
  // }

  // const fetchUserPosted = async (userId) => {
  //   const userResponse = await fetch(`http://localhost:3000/users/${userId}`);
  //   const userData = await userResponse.json();
  //   return userData;
  // };


  // useEffect(() => {
  //   // Fetch user data for each post and update the posts with user data
  //   const fetchUserForPosts = async () => {
  //     const updatedPosts = await Promise.all(
  //       posts.map(async (post) => {
  //         const userData = await fetchUserPosted(post.postedBy);
  //         return {
  //           ...post,
  //           postedByName: userData.name,
  //           postedByPhoto: userData.photo,
  //         };
  //       })
  //     );
  //     setPosts(updatedPosts);
  //   };

  //   // fetchUserForPosts(user._id);
  // }, [posts]);
  return (


    <>
    {/* {Array.isArray(posts) ? (
    
      posts.map((post) => (
        
        <PostWidget key={post._id} body={post.body} photo={post.photo} postedBy={post.postedBy} />
        
      ))
    ) : (
      <p>No posts available.</p>

    )} */}
    {Array.isArray(posts) ? (
        posts.map((post) => (
          <PostWidget
            postId={post._id}
            body={post.body}
            photo={post.photo}
            postedBy={post.postedBy}
            // firstName={user._id.firstName}
            userPhoto={picturePath}
            userName={firstName+" " +lastName}
          />
        ))
       
      ) : (
        <p>No posts available.</p>
      )}
  </>
  
  );

};

export default PostsWidget;
