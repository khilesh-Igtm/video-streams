import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import WatchLater from "./pages/WatchLater";
import UploadVideos from "./pages/UploadVideos";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/watch-later"
                element={
                  <ProtectedRoute>
                    <WatchLater />
                  </ProtectedRoute>
                }
              />
              <Route path="/upload-videos" element={
                <ProtectedRoute>
                  <UploadVideos/>
                </ProtectedRoute>
              }/>
              {/* add other routes like /upload, /watch/:id etc */}
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
