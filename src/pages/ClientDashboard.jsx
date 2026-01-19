import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import HTMLFlipBook from 'react-pageflip';

const ClientDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'flipbook'
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const bookRef = useRef(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await api.get('/client/projects');
            setProjects(res.data);
        } catch (error) {
            console.error(error);
            if (error.response?.status === 401) {
                handleLogout();
            }
        } finally {
            setLoading(false);
        }
    };

    const handleProjectClick = async (project) => {
        setLoading(true);
        setSelectedProject(project);
        try {
            const res = await api.get(`/client/projects/${project.id}/photos`);
            setPhotos(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        setSelectedProject(null);
        setPhotos([]);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const goToNext = () => {
        setCurrentImageIndex((prev) => (prev + 1) % photos.length);
    };

    const goToPrev = () => {
        setCurrentImageIndex((prev) => (prev - 1 + photos.length) % photos.length);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!lightboxOpen) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') goToNext();
            if (e.key === 'ArrowLeft') goToPrev();
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [lightboxOpen, photos.length]);

    if (loading && !selectedProject && projects.length === 0) {
        return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8 pt-24">
            <div className="max-w-7xl mx-auto h-full">
                <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
                    <div>
                        <h1 className="text-3xl font-serif text-amber-500">Welcome, {user.name || user.email?.split('@')[0]}</h1>
                        <p className="text-zinc-400">Your Private Gallery</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors border border-zinc-700"
                    >
                        Logout
                    </button>
                </div>

                {selectedProject ? (
                    <div className="flex flex-col items-center">
                        <div className="w-full flex justify-between items-center max-w-5xl mb-6">
                            <button
                                onClick={handleBack}
                                className="flex items-center text-amber-500 hover:text-amber-400 transition-colors"
                            >
                                ← Back to Projects
                            </button>
                            <div className="flex items-center gap-4">
                                {/* View Mode Toggle */}
                                <div className="flex bg-zinc-800 rounded-lg p-1 border border-zinc-700">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'grid'
                                            ? 'bg-amber-600 text-white'
                                            : 'text-zinc-400 hover:text-white'
                                            }`}
                                    >
                                        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                        Grid
                                    </button>
                                    <button
                                        onClick={() => setViewMode('flipbook')}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'flipbook'
                                            ? 'bg-amber-600 text-white'
                                            : 'text-zinc-400 hover:text-white'
                                            }`}
                                    >
                                        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        Flipbook
                                    </button>
                                </div>
                                <div className="text-right">
                                    <h2 className="text-xl font-bold">{selectedProject.title}</h2>
                                    <p className="text-zinc-500 text-sm">{selectedProject.eventType} • {photos.length} Photos</p>
                                </div>
                            </div>
                        </div>

                        {photos.length === 0 ? (
                            <p className="text-zinc-500 mt-20">No photos available for this project yet.</p>
                        ) : viewMode === 'grid' ? (
                            // Grid Gallery View
                            <div className="w-full max-w-7xl">
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {photos.map((photo, index) => (
                                        <div
                                            key={photo.id}
                                            onClick={() => openLightbox(index)}
                                            className="group relative aspect-square bg-zinc-900 rounded-lg overflow-hidden cursor-pointer border border-zinc-800 hover:border-amber-500/50 transition-all duration-300"
                                        >
                                            <img
                                                src={`http://localhost:5000/api/client/photo/${photo.id}?width=400`}
                                                alt={`Photo ${index + 1}`}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="absolute bottom-3 left-3 right-3">
                                                    <p className="text-white text-xs font-medium truncate">{photo.filename}</p>
                                                    <p className="text-white/60 text-xs mt-1">Photo {index + 1}</p>
                                                </div>
                                            </div>
                                            {/* Zoom Icon */}
                                            <div className="absolute top-3 right-3 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                </svg>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            // Fullscreen Flipbook Container
                            <div className="fixed inset-0 bg-zinc-950 z-40 flex flex-col items-center justify-center">
                                {/* Close/Back Button */}
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className="absolute top-6 left-6 z-50 flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors bg-zinc-900/80 px-4 py-2 rounded-lg backdrop-blur-sm border border-zinc-800"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Grid
                                </button>

                                {/* Project Info */}
                                <div className="absolute top-6 right-6 z-50 text-right bg-zinc-900/80 px-4 py-2 rounded-lg backdrop-blur-sm border border-zinc-800">
                                    <h2 className="text-lg font-bold text-white">{selectedProject.title}</h2>
                                    <p className="text-zinc-400 text-sm">{selectedProject.eventType} • {photos.length} Photos</p>
                                </div>

                                {/* Flipbook */}
                                <div className="relative w-full h-full flex items-center justify-center p-8">
                                    <HTMLFlipBook
                                        width={Math.min(window.innerWidth * 0.4, 700)}
                                        height={Math.min(window.innerHeight * 0.85, 900)}
                                        minWidth={400}
                                        maxWidth={800}
                                        minHeight={500}
                                        maxHeight={1000}
                                        size="stretch"
                                        drawShadow={true}
                                        flippingTime={1000}
                                        usePortrait={false}
                                        startZIndex={0}
                                        autoSize={true}
                                        maxShadowOpacity={0.5}
                                        showCover={true}
                                        mobileScrollSupport={true}
                                        ref={bookRef}
                                        className="shadow-2xl"
                                    >
                                        {/* Cover Page */}
                                        <div className="demoPage bg-zinc-900 flex items-center justify-center border-r border-zinc-700 p-8 text-center bg-[url('/book-texture.jpg')] bg-cover">
                                            <div className="border-4 border-amber-500/30 p-8 h-full w-full flex flex-col items-center justify-center">
                                                <h1 className="text-4xl font-serif text-amber-500 mb-4">{selectedProject.title}</h1>
                                                <p className="text-white/60 italic">{selectedProject.eventType}</p>
                                                <p className="text-white/40 text-sm mt-8">{selectedProject.date}</p>
                                                <div className="mt-12 text-zinc-500 text-xs uppercase tracking-widest">Sanjay Studio</div>
                                            </div>
                                        </div>

                                        {/* Photo Pages */}
                                        {photos.map((photo, index) => (
                                            <div key={photo.id} className="demoPage bg-black flex items-center justify-center relative overflow-hidden">
                                                <img
                                                    src={`http://localhost:5000/api/client/photo/${photo.id}`}
                                                    alt={`Page ${index + 1}`}
                                                    className="w-full h-full object-contain"
                                                    loading="lazy"
                                                />
                                                {/* Page Number */}
                                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-xs">
                                                    {index + 1}
                                                </div>
                                            </div>
                                        ))}

                                        {/* Back Cover */}
                                        <div className="demoPage bg-zinc-900 flex items-center justify-center border-l border-zinc-700 p-8 text-center">
                                            <div className="text-zinc-500">
                                                <p className="mb-4">End of Album</p>
                                                <button onClick={() => bookRef.current?.pageFlip().flip(0)} className="text-amber-500 hover:underline">
                                                    Go to Start
                                                </button>
                                            </div>
                                        </div>
                                    </HTMLFlipBook>

                                    {/* Navigation Helpers */}
                                    <div className="absolute -left-20 top-1/2 -translate-y-1/2 z-50">
                                        <button
                                            onClick={() => bookRef.current?.pageFlip().flipPrev()}
                                            className="bg-zinc-800/90 p-4 rounded-full hover:bg-amber-600 transition text-white shadow-xl border border-zinc-700"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="absolute -right-20 top-1/2 -translate-y-1/2 z-50">
                                        <button
                                            onClick={() => bookRef.current?.pageFlip().flipNext()}
                                            className="bg-zinc-800/90 p-4 rounded-full hover:bg-amber-600 transition text-white shadow-xl border border-zinc-700"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Keyboard Hint */}
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 text-white/40 text-xs flex items-center gap-6 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                                        <span className="flex items-center gap-2">
                                            <kbd className="px-2 py-1 bg-white/10 rounded text-white/60">←</kbd>
                                            <kbd className="px-2 py-1 bg-white/10 rounded text-white/60">→</kbd>
                                            Navigate
                                        </span>
                                        <span>Click corners to flip</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    // Projects Grid (Same as before)
                    <div>
                        {projects.length === 0 ? (
                            <div className="text-center py-20 text-zinc-500">
                                <p>You don't have any projects assigned yet.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {projects.map((project) => (
                                    <div
                                        key={project.id}
                                        onClick={() => handleProjectClick(project)}
                                        className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 cursor-pointer hover:border-amber-500/50 hover:bg-zinc-800 transition-all duration-300 group"
                                    >
                                        <div className="h-40 bg-zinc-950 rounded-lg mb-4 flex items-center justify-center text-zinc-700 group-hover:text-amber-600 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-zinc-100 group-hover:text-amber-500 transition-colors">{project.title}</h3>
                                        <p className="text-sm text-zinc-400 mt-1">{project.eventType} • {project.date}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Fullscreen Lightbox */}
                {lightboxOpen && photos.length > 0 && (
                    <div
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                        onClick={closeLightbox}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2 hover:bg-white/10 rounded-full transition"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Image Counter */}
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/70 text-sm z-50 bg-black/50 px-4 py-2 rounded-full">
                            {currentImageIndex + 1} / {photos.length}
                        </div>

                        {/* Previous Button */}
                        <button
                            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50 p-3 hover:bg-white/10 rounded-full transition"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Main Image */}
                        <img
                            src={`http://localhost:5000/api/client/photo/${photos[currentImageIndex].id}`}
                            alt={`Photo ${currentImageIndex + 1}`}
                            className="max-w-full max-h-[90vh] object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Next Button */}
                        <button
                            onClick={(e) => { e.stopPropagation(); goToNext(); }}
                            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50 p-3 hover:bg-white/10 rounded-full transition"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Download Button */}
                        <a
                            href={`http://localhost:5000/api/client/photo/${photos[currentImageIndex].id}`}
                            download={photos[currentImageIndex].filename}
                            target="_blank"
                            rel="noreferrer"
                            className="absolute bottom-6 right-6 text-white/70 hover:text-white z-50 p-3 hover:bg-white/10 rounded-full transition"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </a>

                        {/* Instructions */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs z-50">
                            Use arrow keys or click arrows to navigate • ESC to close
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientDashboard;
