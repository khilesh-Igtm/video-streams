import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useContext(AuthContext);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       const res = await api.get("/videos"); 
  //       setVideos(res.data || []);
  //     } catch (err) {
  //       setVideos([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetch();
  // }, []);

  return (
    // <div className="max-w-6xl mx-auto p-6">
    //   <div className="flex items-center justify-between mb-6">
    //     <h1 className="text-3xl font-bold">Home</h1>
    //     <div className="text-sm text-slate-600">{user ? `Logged in as ${user.username}` : "Not logged in"}</div>
    //   </div>

    //   {loading ? (
    //     <div>Loading videos...</div>
    //   ) : videos.length === 0 ? (
    //     <div className="text-slate-500">No videos yet.</div>
    //   ) : (
    //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    //       {videos.map(v => (
    //         <Link key={v.id} to={`/watch/${v.id}`} className="block bg-white p-3 rounded shadow hover:shadow-md">
    //           <div className="h-40 bg-slate-200 rounded mb-3 flex items-center justify-center text-slate-400">{/* thumbnail */}Thumbnail</div>
    //           <div className="text-lg font-medium">{v.title}</div>
    //           <div className="text-sm text-slate-500 mt-1">{v.description?.slice(0, 80)}</div>
    //         </Link>
    //       ))}
    //     </div>
    //   )}
    // </div>
    <h1>Home page</h1>
  );
}
