import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useState } from "react";

const Friend = ({ friendId, name, subtitle, userPicturePath, userfriends }) => {
  const [friends,setFriends]=useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  // const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  // const [isFriend,setIsFriend]=useState("");
  const isFriend = userfriends.includes(friendId)
  console.log("is friend", isFriend)

  const patchFriend = async () => {


    const requestData = {
      id: _id,
      friendId:friendId
    };
    const response = await fetch(
      `http://localhost:3000/users/addRemoveFriend`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body:JSON.stringify(requestData),
      }
    );
    const data = await response.json();
    // console.log("friends:",data.friends.includes(friendId))
    // setIsFriend(data.friends.includes(friendId))
    setFriends({ friends: data });

    window.location.reload();
  };

 

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
       
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
