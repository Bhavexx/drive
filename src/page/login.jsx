import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          alert("you dont have account about this drive");
        } else {
          alert(error.message);
        }
      } else if (data.user) {
        navigate("/dashboard");
      }
    } catch (err) {
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl w-96 border border-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-950">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-200 p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-200 p-3 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button 
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium p-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-center text-gray-600">
          Don't have account?{" "}
          <Link to="/signup" className="text-indigo-600 font-semibold hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
