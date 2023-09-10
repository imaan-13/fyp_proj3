
// import './App.css';
import { useState } from 'react';
import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';
import Homepage from 'scenes/homePage';
import LoginPage from 'scenes/loginPage';
import CreateEventForm from 'scenes/EventPage/CreateEvent';
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Eventpage from 'scenes/homePage/index2';
import Edupage from 'scenes/CommunityPage/eduPage';
// import culturePage from 'scenes/CommunityPage/culturePage';
import CulturePage from 'scenes/CommunityPage/culturePage';
import SocialPage from 'scenes/CommunityPage/socialPage';
import ProfilePage from 'scenes/profilePage';
import AllNewsFeed from 'scenes/newsFeeds/allFeed';
import EventFeed from 'scenes/newsFeeds/eventFeed';
import Navbar2 from 'scenes/navbar/newsFeedNav';
import SavedEvents from 'scenes/homePage/savedEvents';
import FriendProfile from 'scenes/profilePage/FriendsProfile';
import EditProfileForm from 'scenes/profilePage/editprofile';
import EditProfilepage from 'scenes/profilePage/editprofile';

function App() {

  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="app">
     <BrowserRouter>
     <ThemeProvider theme={theme}>
     <CssBaseline />
      <Routes>
        < Route path="/" element={<LoginPage />}/>
        <Route
              path="/home"
              element={isAuth ? <Homepage /> : <Navigate to="/" />}
            />
        {/* <Route path="/event" element={isAuth ? <CreateEventForm /> : <Navigate to="/" />} /> */}
        <Route path="/event-page" element={isAuth?<Eventpage></Eventpage>: <Navigate to="/" /> }/>
        <Route path="/education-community" element={isAuth? <Edupage showEvents={true} ></Edupage> : <Navigate to="/" /> }/>
        <Route path="/education-community-events" element={isAuth?<Edupage showEvents={false} ></Edupage>: <Navigate to="/" />}/>
        <Route path="/arts&culture-community" element={isAuth?<CulturePage showEvents={true}></CulturePage>:<Navigate to="/" />}/>
        <Route path="/arts&culture-community-events" element={ isAuth?<CulturePage showEvents={false}></CulturePage>: <Navigate to="/" />}/>
        <Route path="/social-community" element={isAuth?<SocialPage showEvents={true}></SocialPage>:<Navigate to="/" />}/>
        <Route path="/social-community-events" element={isAuth?<SocialPage showEvents={false}></SocialPage>:<Navigate to="/" />}/>

        <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
        <Route path="/all-posts" element={isAuth?<AllNewsFeed></AllNewsFeed>:<Navigate to="/" />}/>
        <Route path="/event-posts" element={isAuth?<EventFeed></EventFeed>:<Navigate to="/" />}/>
        <Route path="/saved-events" element={isAuth?<SavedEvents></SavedEvents>:<Navigate to="/" />}/>
        <Route path="/other-user/:userId" element={isAuth?<ProfilePage></ProfilePage>:<Navigate to="/" />}/>
        <Route path="/edit-profile" element={isAuth?<EditProfilepage></EditProfilepage>:<Navigate to="/" />}></Route>
      </Routes>
      </ThemeProvider>
     </BrowserRouter>
    </div>
  );
}

export default App;
