// import React from 'react';

// function Comment({ username, text }) {
//   return (
//     <div className="comment">
//       <span className="comment-username">{username}:</span>
//       <p className="comment-text">{text}</p>
//     </div>
//   );
// }

// export default Comment;



import React from 'react';

function Comment({ username, text }) {
  return (
    <div className="comment">
      <span className="comment-username" style={{ fontWeight: 'bold' }}>{username}:</span>
      <p className="comment-text" style={{ marginTop: '4px' }}>{text}</p>
    </div>
  );
}

export default Comment;
