function FolderCard({ name, size, onClick, onDelete }) {
  return (
    <div 
      className="p-5 rounded-2xl cursor-pointer flex justify-between items-start transition-all duration-300 bg-white/80 backdrop-blur-md border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-300 group"
      onClick={onClick}
    >
      <div className="flex gap-4 items-center">
        <div className="text-4xl group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">📁</div>
        <div>
          <h2 className="text-lg font-bold text-gray-800 tracking-tight">{name}</h2>
          <p className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-wider">{size}</p>
        </div>
      </div>
      {onDelete && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-50 font-bold px-2 py-1 rounded transition-all duration-200"
          title="Delete folder"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default FolderCard;
