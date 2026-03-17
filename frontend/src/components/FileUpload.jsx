import React, { useState } from 'react';
import { Upload, File, X, Check, Loader2, FileWarning } from 'lucide-react';
import { uploadDocument as uploadApi } from '../services/api';

const FileUpload = ({ onAnalysisComplete }) => {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile.size > 10 * 1024 * 1024) {
                setError("File too large (max 10MB)");
                return;
            }
            setFile(selectedFile);
            setError(null);
            setProgress(0);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setIsUploading(true);

        // Simulate upload progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 90) {
                    clearInterval(interval);
                    return 90;
                }
                return prev + 10;
            });
        }, 200);

        try {
            const data = await uploadApi(file);
            setProgress(100);
            setTimeout(() => {
                onAnalysisComplete(data.reply || data.analysis || "Document analyzed successfully.");
                setIsUploading(false);
            }, 500);
        } catch (err) {
            console.error("Upload error:", err);
            setError("Upload failed. Please try again.");
            setIsUploading(false);
        } finally {
            clearInterval(interval);
        }
    };

    return (
        <div className="glass-card p-10 max-w-2xl mx-auto border-dashed border-2 border-white/10 hover:border-primary/50 transition-all">
            <h2 className="text-2xl font-bold mb-2 text-center">Document Intelligence</h2>
            <p className="text-gray-500 text-sm text-center mb-8">Upload PDFs or text files for deep AI analysis.</p>

            {!file ? (
                <label className="flex flex-col items-center justify-center py-12 cursor-pointer group">
                    <input type="file" onChange={handleFileChange} className="hidden" accept=".pdf,.txt" />
                    <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                        <Upload size={32} />
                    </div>
                    <p className="font-semibold text-gray-300">Click to browse or drag & drop</p>
                    <p className="text-xs text-gray-600 mt-2 uppercase tracking-widest font-bold">PDF / TXT up to 10MB</p>
                </label>
            ) : (
                <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                            <File size={24} />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="font-medium text-sm truncate">{file.name}</p>
                            <p className="text-[10px] text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        {!isUploading && (
                            <button onClick={() => setFile(null)} className="text-gray-500 hover:text-red-500 transition-colors">
                                <X size={20} />
                            </button>
                        )}
                    </div>

                    {isUploading && (
                        <div className="space-y-2">
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-300 shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-[10px] text-gray-500 font-bold tracking-wider">
                                <span>UPLOADING TO GEMINI...</span>
                                <span>{progress}%</span>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="flex items-center gap-2 text-red-500 text-xs bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                            <FileWarning size={14} />
                            <span>{error}</span>
                        </div>
                    )}

                    {!isUploading && (
                        <button
                            onClick={handleUpload}
                            className="w-full py-4 bg-primary text-white rounded-2xl font-bold hover:brightness-110 shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2"
                        >
                            Analyze Architecture <Check size={18} />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default FileUpload;
