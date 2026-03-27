import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { FiSend, FiUser, FiMessageSquare, FiHeart, FiPlus, FiX, FiLock } from 'react-icons/fi';

function Community() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const [currentUser, setCurrentUser] = useState(null);

    const [formData, setFormData] = useState({ content: "", mediaType: "none" });
    const [mediaFile, setMediaFile] = useState(null);

    const [expandedComments, setExpandedComments] = useState({});
    const [commentData, setCommentData] = useState({});

    // Inside Community.jsx - Standardized Fetch
    useEffect(() => {
        const init = async () => {
            setLoading(true);
            await fetchPosts();
            try {
                const userRes = await api.get('/user/profile');
                setCurrentUser(userRes.data);
            } catch { console.log("Guest Session"); }
            setLoading(false);
        };
        init();
    }, []);
    const fetchPosts = async () => {
        try {
            const res = await api.get('/community'); // Removed '/api' prefix to match /user/profile
            setPosts(res.data);
        } catch (err) {
            console.error("Sync Error:", err);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentUser) return alert("You must be logged in to broadcast.");

        const data = new FormData();
        data.append("username", currentUser.username);
        data.append("content", formData.content);
        data.append("mediaType", formData.mediaType);
        if (mediaFile) data.append("media", mediaFile);

        try {
            await api.post('/api/community/send', data, { headers: { 'Content-Type': 'multipart/form-data' } });
            setFormData({ content: "", mediaType: "none" });
            setMediaFile(null);
            setIsFormOpen(false);
            fetchPosts();
        } catch (err) {
            alert("Transmission failed.");
        }
    };
    const handleLike = async (postId) => {
        try {
            await api.put(`/community/${postId}/like`);
            fetchPosts(); // Refresh data to show new like count
        } catch (err) {
            console.error("Like failed", err);
        }
    };

    const handleAddComment = async (postId) => {
        const data = commentData[postId];

        if (!currentUser || !currentUser.username) {
            return alert("Authentication Error: Please log in again.");
        }
        if (!data || !data.text || data.text.trim() === "") {
            return alert("Comment text required.");
        }

        try {
            const response = await api.post(`/api/community/${postId}/comment`, {
                username: currentUser.username,
                text: data.text
            });

            if (response.status === 201) {
                setCommentData(prev => ({ ...prev, [postId]: { text: "" } }));
                fetchPosts();
            }
        } catch (err) {
            console.error("Error adding comment:", err);
            alert("Transmission failed. Check console for details.");
        }
    };

    const toggleComments = (postId) => {
        setExpandedComments(prev => ({ ...prev, [postId]: !prev[postId] }));
    };

    return (
        <div className="min-h-screen bg-black text-gray-200 font-mono p-6">
            <header className="max-w-3xl mx-auto mb-10 border-b border-gray-900 pb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black italic uppercase text-white tracking-tighter">Community_Hub</h1>
                    <p className="text-[10px] text-blue-500 font-bold tracking-[0.3em]">CONNECT_WITH_RACERS</p>
                </div>
                {currentUser ? (
                    <button onClick={() => setIsFormOpen(true)} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded text-xs font-bold uppercase flex items-center gap-2 transition-all active:scale-95 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                        <FiPlus className="text-lg" /> SEND_MESSAGE
                    </button>
                ) : (
                    <div className="text-[10px] text-red-500 border border-red-500/50 bg-red-500/10 px-4 py-2 rounded uppercase font-bold flex items-center gap-2">
                        <FiLock /> LOGIN TO POST
                    </div>
                )}
            </header>

            <main className="max-w-3xl mx-auto space-y-6">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-blue-900 border-t-blue-500 rounded-full animate-spin mb-4" />
                        <div className="animate-pulse text-blue-500 text-xs font-bold tracking-widest uppercase">SYNCHRONIZING_FEED...</div>
                    </div>
                ) : posts.map(post => (
                    <div key={post._id} className="bg-[#0a0a0a] border border-gray-900 rounded-xl overflow-hidden hover:border-gray-700 transition-colors shadow-lg">
                        <div className="p-4 border-b border-gray-900 flex justify-between items-center bg-black/40">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-900/30 rounded-full flex items-center justify-center border border-blue-500/30">
                                    <FiUser className="text-blue-500 text-sm" />
                                </div>
                                <span className="text-sm font-bold uppercase tracking-wider text-gray-100">{post.username}</span>
                            </div>
                            <span className="text-[10px] text-gray-600 uppercase font-bold tracking-widest">{new Date(post.createdAt).toLocaleString()}</span>
                        </div>

                        <div className="p-5 text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{post.content}</div>

                        {post.mediaUrl && post.mediaType === 'image' && (
                            <div className="px-5 pb-5"><img src={post.mediaUrl} alt="post" className="w-full h-auto rounded-lg border border-gray-900" /></div>
                        )}
                        {post.mediaUrl && post.mediaType === 'video' && (
                            <div className="px-5 pb-5"><div className="aspect-video rounded-lg overflow-hidden border border-gray-900 bg-black"><video src={post.mediaUrl} controls className="w-full h-full object-contain" /></div></div>
                        )}

                        <div className="p-4 border-t border-gray-900 bg-black/40 flex gap-6">
                            <button onClick={() => handleLike(post._id)} className="flex items-center gap-2 text-xs font-bold tracking-widest text-gray-500 hover:text-red-500 transition-colors">
                                <FiHeart className={`text-lg ${post.likes > 0 ? 'text-red-600 fill-red-600' : ''}`} />
                                {post.likes} LIKES
                            </button>
                            <button onClick={() => toggleComments(post._id)} className="flex items-center gap-2 text-xs font-bold tracking-widest text-gray-500 hover:text-blue-500 transition-colors">
                                <FiMessageSquare className="text-lg" />
                                {post.comments?.length || 0} COMMENTS
                            </button>
                        </div>

                        {expandedComments[post._id] && (
                            <div className="p-4 border-t border-gray-900 bg-[#050505]">
                                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                    {post.comments?.map((comment, i) => (
                                        <div key={i} className="bg-black p-3 rounded border border-gray-800">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{comment.username}</span>
                                                <span className="text-[8px] text-gray-600">{new Date(comment.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-xs text-gray-300">{comment.text}</p>
                                        </div>
                                    ))}
                                    {post.comments?.length === 0 && <p className="text-xs text-gray-600 italic">No comments yet. Be the first to reply.</p>}
                                </div>

                                {currentUser ? (
                                    <div className="flex gap-2">
                                        <input
                                            type="text" placeholder="WRITE REPLY..."
                                            className="bg-black border border-gray-800 p-3 rounded text-xs outline-none focus:border-blue-500 flex-1"
                                            value={commentData[post._id]?.text || ""}
                                            onChange={(e) => setCommentData({
                                                ...commentData,
                                                [post._id]: { ...commentData[post._id], text: e.target.value }
                                            })}
                                            onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post._id)}
                                        />
                                        <button onClick={() => handleAddComment(post._id)} className="bg-blue-600 hover:bg-blue-500 text-white px-5 rounded transition-colors flex items-center justify-center shadow-lg">
                                            <FiSend />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-[10px] text-gray-500 uppercase font-bold text-center py-2 border border-dashed border-gray-800 rounded">
                                        Login to join the discussion
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </main>

            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl w-full max-w-lg relative shadow-2xl animate-[fadeIn_0.2s_ease-out]">
                        <button onClick={() => setIsFormOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors p-2">
                            <FiX className="text-xl" />
                        </button>

                        <form onSubmit={handleSubmit} className="p-8">
                            <div className="flex items-center gap-2 mb-6 text-blue-500 border-b border-gray-900 pb-4">
                                <FiMessageSquare className="text-xl" />
                                <span className="text-sm font-bold uppercase tracking-widest">New_Transmission</span>
                            </div>

                            <div className="w-full bg-black/50 border border-blue-900/50 p-4 mb-4 rounded flex items-center gap-3">
                                <FiUser className="text-blue-500" />
                                <div>
                                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">VERIFIED_DRIVER</p>
                                    <p className="text-sm font-bold uppercase text-gray-200">{currentUser?.username}</p>
                                </div>
                                <FiLock className="ml-auto text-gray-600 text-sm" />
                            </div>

                            <textarea placeholder="WHAT'S ON YOUR MIND?" required
                                className="w-full bg-black border border-gray-800 p-4 mb-4 rounded text-xs h-32 focus:border-blue-500 outline-none transition-colors resize-none"
                                value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />

                            <div className="mb-6 p-4 border border-gray-800 border-dashed rounded bg-black/50">
                                <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">ATTACH MEDIA (OPTIONAL)</span>
                                <input
                                    type="file" accept="image/*,video/*"
                                    className="w-full text-xs outline-none text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-blue-900/30 file:text-blue-500 hover:file:bg-blue-900/50 cursor-pointer transition-colors"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setMediaFile(file);
                                        if (file && file.type.includes('image')) setFormData({ ...formData, mediaType: 'image' });
                                        if (file && file.type.includes('video')) setFormData({ ...formData, mediaType: 'video' });
                                    }}
                                />
                            </div>

                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                                <FiSend className="text-lg" /> BROADCAST_TO_SERVERS
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #000; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3b82f6; }
            `}} />
        </div>
    );
}

export default Community;