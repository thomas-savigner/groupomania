import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import PostUpStreamFlow from './pages/PostUpStreamFlow';
import EditPost from './pages/EditPost';
import FocusOnPost from './pages/FocusOnPost';
import Profile from './pages/Profile';
import MyPublications from './pages/MyPublications';
import NotFound from './pages/NotFound';
import PublicLayOut from './components/PublicLayOut/index'
import ProtectedLayout from './components/ProtectedLayout/index';

import './styles/style.css';
import './styles/cardpost-style.css'
import './styles/MyPublications.css'

function App() {

    return (
    
            <Routes>
                <Route path="/" element={<PublicLayOut />} > 
                    <Route index element={<Login />} />
                </Route>
                <Route path="/app" element={<ProtectedLayout />} >
                    <Route path="upstreamflow" element={<PostUpStreamFlow />} />
                    <Route path="editpost" element={<EditPost />} />
                    <Route path=":postID" element={<FocusOnPost />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="mypublications" element={<MyPublications />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
   
    )
}

export default App;