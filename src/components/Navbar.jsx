import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="bg-white/70 backdrop-blur-md shadow-sm border-b border-white/50 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      <h1 
        className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => navigate('/dashboard')}
      >
        Drive App
      </h1>

      <button 
        onClick={() => navigate('/')}
        className="bg-rose-500 hover:bg-rose-600 transition-colors text-white px-5 py-2 rounded-xl shadow-sm hover:shadow-md font-medium hover:-translate-y-0.5"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
