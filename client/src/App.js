
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
        <Route path="/event-page" Component={Eventpage}/>
        <Route path="/education-community" element={<Edupage showEvents={true} ></Edupage>}/>
        <Route path="/education-community-events" element={<Edupage showEvents={false} ></Edupage>}/>
        <Route path="/arts&culture-community" element={<CulturePage showEvents={true}></CulturePage>}/>
        <Route path="/arts&culture-community-events" element={<CulturePage showEvents={false}></CulturePage>}/>
        <Route path="/social-community" element={<SocialPage showEvents={true}></SocialPage>}/>
        <Route path="/social-community-events" element={<SocialPage showEvents={false}></SocialPage>}/>

        <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
        <Route path="/all-posts" Component={AllNewsFeed}/>
        <Route path="/event-posts" Component={EventFeed}/>
        <Route path="/saved-events" element={<SavedEvents></SavedEvents>}/>
      </Routes>
      </ThemeProvider>
     </BrowserRouter>
    </div>
  );
}

export default App;
