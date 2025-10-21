import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setErr(error.response?.data?.message || error.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-md shadow">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      {err && <div className="mb-3 text-red-600">{err}</div>}
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="mt-1 w-full border rounded px-3 py-2"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="mt-1 w-full border rounded px-3 py-2"
            placeholder="••••••••"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <Link to="/signup" className="text-sm text-slate-600 hover:underline">Create an account</Link>
        </div>
      </form>
    </div>
  );
}
