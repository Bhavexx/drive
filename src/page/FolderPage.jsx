import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FolderCard from "../components/FolderCard";

function FolderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [folders, setFolders] = useState(() => {
    const saved = localStorage.getItem(`drive_folders_${id}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [files, setFiles] = useState(() => {
    const saved = localStorage.getItem(`drive_files_${id}`);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(`drive_folders_${id}`, JSON.stringify(folders));
  }, [folders, id]);

  useEffect(() => {
    localStorage.setItem(`drive_files_${id}`, JSON.stringify(files));
  }, [files, id]);

  // Handle route change when navigating from folder to folder
  useEffect(() => {
    const savedFolders = localStorage.getItem(`drive_folders_${id}`);
    setFolders(savedFolders ? JSON.parse(savedFolders) : []);
    const savedFiles = localStorage.getItem(`drive_files_${id}`);
    setFiles(savedFiles ? JSON.parse(savedFiles) : []);
  }, [id]);

  const handleCreateFolder = () => {
    const name = prompt("Enter folder name:");
    if (name) {
      setFolders([...folders, { id: Date.now(), name, size: "0 MB" }]);
    }
  };

  const handleUploadFile = (e) => {
    e.preventDefault();
    let uploadedFiles = [];
    if (e.target.files) {
      uploadedFiles = Array.from(e.target.files);
    } else if (e.dataTransfer && e.dataTransfer.files) {
      uploadedFiles = Array.from(e.dataTransfer.files);
    }

    if (uploadedFiles.length > 0) {
      const newFiles = uploadedFiles.map(f => ({ 
        id: Date.now() + Math.random(), 
        name: f.name,
        url: URL.createObjectURL(f),
        type: f.type
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDeleteFolder = (folderId) => {
    if (window.confirm("Are you sure you want to delete this folder?")) {
      setFolders(folders.filter(f => f.id !== folderId));
    }
  };

  const handleDeleteFile = (fileId) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      setFiles(files.filter(f => f.id !== fileId));
    }
  };

  return (
    <div 
      className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen text-gray-800 font-sans selection:bg-indigo-200"
      onDragOver={handleDragOver}
      onDrop={handleUploadFile}
    >
      <Navbar />

      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold flex items-center">
            <button 
              onClick={() => navigate(-1)} 
              className="mr-4 text-gray-500 hover:text-gray-800 transition-colors"
              title="Go back"
            >
              ←
            </button>
            📁 Folder {id}
          </h1>
          
          <div className="flex gap-4">
            <button 
              onClick={handleCreateFolder}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              + New Folder
            </button>

            <label className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium px-6 py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer inline-block">
              Upload File
              <input 
                type="file" 
                className="hidden" 
                onChange={handleUploadFile} 
                multiple 
              />
            </label>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-indigo-950">Subfolders</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {folders.length === 0 && (
            <div className="col-span-full py-12 px-6 text-center bg-white/50 border-2 border-dashed border-indigo-100 rounded-3xl backdrop-blur-sm">
              <p className="text-indigo-400 font-medium text-lg">No subfolders yet. Create one!</p>
            </div>
          )}
          {folders.map(folder => (
            <FolderCard 
              key={folder.id} 
              name={folder.name} 
              size={folder.size} 
              onClick={() => navigate(`/folder/${folder.id}`)}
              onDelete={() => handleDeleteFolder(folder.id)}
            />
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 text-indigo-950">Files</h2>
          {files.length === 0 ? (
            <div className="py-12 px-6 text-center bg-white/50 border-2 border-dashed border-indigo-100 rounded-3xl backdrop-blur-sm">
              <p className="text-indigo-400 font-medium text-lg">No files yet. Drag & drop here!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-4 gap-6">
              {files.map(file => (
                <div key={file.id} className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-purple-200 group">
                  <span 
                    className="truncate mr-2 cursor-pointer hover:text-blue-600 hover:underline"
                    onClick={() => file.url ? window.open(file.url, '_blank') : null}
                    title="Click to view file"
                  >
                    📄 {file.name}
                  </span>
                  <button 
                    onClick={() => handleDeleteFile(file.id)}
                    className="text-red-500 hover:text-red-700 font-bold px-2 py-1 rounded hover:bg-red-50 shrink-0"
                    title="Delete file"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FolderPage;
