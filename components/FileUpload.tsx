import React, { useRef } from 'react';
import { Upload, X, FileVideo, ImagePlus, Zap } from 'lucide-react';
import { MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB } from '../constants';
import { FileInput } from '../types';

interface FileUploadProps {
  files: FileInput[];
  setFiles: React.Dispatch<React.SetStateAction<FileInput[]>>;
  multiple?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ files, setFiles, multiple = false }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formattedMaxSize = MAX_FILE_SIZE_MB >= 1024 
    ? `${parseFloat((MAX_FILE_SIZE_MB / 1024).toFixed(2))}GB` 
    : `${MAX_FILE_SIZE_MB}MB`;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles: FileInput[] = [];
      
      Array.from(event.target.files).forEach((file: File) => {
        if (file.size > MAX_FILE_SIZE_BYTES) {
          alert(`File ${file.name} exceeds the ${formattedMaxSize} limit.`);
          return;
        }

        const isVideo = file.type.startsWith('video/');
        const preview = URL.createObjectURL(file);

        newFiles.push({
          file,
          preview,
          type: isVideo ? 'video' : 'image'
        });
      });

      if (multiple) {
        setFiles(prev => [...prev, ...newFiles]);
      } else {
        setFiles(newFiles);
      }
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  return (
    <div className="w-full space-y-4">
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="relative group cursor-pointer overflow-hidden rounded-3xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 transition-all group-hover:opacity-100"></div>
        <div className="absolute inset-0 border-2 border-dashed border-indigo-500/30 group-hover:border-indigo-400/80 rounded-3xl transition-colors"></div>
        
        <div className="relative p-8 flex flex-col items-center justify-center text-slate-400 group-hover:text-white transition-all">
          <div className="w-16 h-16 mb-4 rounded-2xl bg-slate-900 border border-slate-700 group-hover:border-indigo-500 group-hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] flex items-center justify-center transition-all duration-300 group-hover:-translate-y-2">
            <Upload className="w-8 h-8 text-indigo-400 group-hover:text-indigo-200" />
          </div>
          <p className="font-bold text-lg tracking-tight">Drop the {multiple ? 'Stash' : 'Sauce'}</p>
          <div className="flex items-center space-x-2 mt-2">
             <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">IMG</span>
             <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">VID</span>
             <span className="text-xs text-slate-500">Max {formattedMaxSize}</span>
          </div>
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange} 
          accept="image/*,video/*"
          multiple={multiple}
        />
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {files.map((f, idx) => (
            <div key={idx} className="relative group rounded-2xl overflow-hidden border border-slate-700 bg-black aspect-square">
              <button 
                onClick={() => removeFile(idx)}
                className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 z-10"
              >
                <X size={14} />
              </button>
              
              {f.type === 'video' ? (
                <div className="w-full h-full flex items-center justify-center bg-slate-900 relative">
                  <FileVideo className="text-slate-500 w-8 h-8 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <video src={f.preview} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                </div>
              ) : (
                <img src={f.preview} alt="preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              )}
              
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black via-black/80 to-transparent">
                 <p className="text-[10px] font-mono text-slate-300 truncate">{f.file.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;