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
//           postUserId={post.postedBy._id}
//           name={`${post.postedBy.firstName} ${post.postedBy.lastName}`}
//           description={post.body}
//           picturePath={post.photo}
//         />
//       ))}
//     </>
//   );
// };

// export default PostsWidget;
