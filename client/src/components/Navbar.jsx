import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout,loading  } = useContext(AuthContext);
  const navigate = useNavigate();

  if(loading) return null;
  // console.log('my user is ', user)
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-2xl font-semibold text-slate-900">StreamTube</Link>
            {user && (
             <>
              <Link to="/watch-later" className="text-sm text-slate-600 hover:text-slate-900">Watch Later</Link>

               <Link to="/upload-videos" className="text-sm text-slate-600 hover:text-slate-900">Upload Videos</Link>
                <Link to="/my-videos" className="text-sm text-slate-600 hover:text-slate-900">My Videos</Link>
             </>
            )}
          </div>

          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Link to="/login" className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700">Login</Link>
                <Link to="/signup" className="px-4 py-2 rounded-md border border-indigo-600 text-indigo-600 text-sm hover:bg-indigo-50">Sign up</Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="text-sm text-slate-700">Hi, <span className="font-medium">{user.username}</span></div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 rounded-md text-sm border bg-red-50 border-red-300 text-red-700 hover:bg-red-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
