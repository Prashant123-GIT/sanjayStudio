import React, { useState, useEffect, useRef } from 'react';
import api from '../api/axios';
import { useUploadQueue } from '../hooks/useUploadQueue';
import { motion, AnimatePresence } from 'framer-motion';

// --- Icons ---
const FolderIcon = () => (
    <svg className="w-16 h-16 text-amber-500/80 mb-2" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z" /></svg>
);
const FileIcon = () => (
    <svg className="w-12 h-12 text-zinc-600 mb-2" fill="currentColor" viewBox="0 0 24 24"><path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z" /></svg>
);
const BackIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
);
const TrashIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
);

const AdminPanel = () => {
    // --- State ---
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);

    // Navigation
    const [viewMode, setViewMode] = useState('clients'); // 'clients' | 'projects' | 'photos'
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [projectPhotos, setProjectPhotos] = useState([]);

    // UI Actions
    const [showCreateClient, setShowCreateClient] = useState(false);
    const [newClientName, setNewClientName] = useState('');
    const [newClientMobile, setNewClientMobile] = useState('');
    const [newClientEmail, setNewClientEmail] = useState('');
    const [newClientAddress, setNewClientAddress] = useState('');
    const [previewImage, setPreviewImage] = useState(null);

    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadProjectTitle, setUploadProjectTitle] = useState('');
    const [uploadEventType, setUploadEventType] = useState('Wedding');
    const [uploadDate, setUploadDate] = useState('');

    // Bulk Action State
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [selectedPhotoIds, setSelectedPhotoIds] = useState(new Set());

    // Global Loader State
    const [isLoading, setIsLoading] = useState(false);

    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? savedTheme === "dark" : true;
    });

    const { queue, completed, failed, currentFile, progress, addFiles, clearQueue, isUploading } = useUploadQueue();
    const fileInputRef = useRef(null);

    // Sync theme with document root and global Navbar
    useEffect(() => {
        const syncTheme = () => {
            const isLight = document.documentElement.classList.contains('light-mode');
            setIsDarkMode(!isLight);
        };

        // Initial sync
        syncTheme();

        // Listen for changes from Navbar
        window.addEventListener('theme-change', syncTheme);
        return () => window.removeEventListener('theme-change', syncTheme);
    }, []);

    // --- Effects ---
    useEffect(() => {
        const loggedIn = sessionStorage.getItem('adminLoggedIn');
        if (loggedIn === 'true') {
            setIsAdminLoggedIn(true);
            fetchClients();
            fetchProjects();
        }
    }, []);

    // Sync selectedClient with fresh clients data
    useEffect(() => {
        if (selectedClient && clients.length > 0) {
            const updatedClient = clients.find(c => c.id === selectedClient.id);
            if (updatedClient) {
                setSelectedClient(updatedClient);
            }
        }
    }, [clients]);

    // Sync selectedProject with fresh projects data
    useEffect(() => {
        if (selectedProject && projects.length > 0) {
            const updatedProject = projects.find(p => p.id === selectedProject.id);
            if (updatedProject) {
                setSelectedProject(updatedProject);
            }
        }
    }, [projects]);

    // Watch for upload completion and refresh photos
    const prevIsUploading = useRef(isUploading);
    useEffect(() => {
        // Detect when upload just finished (was uploading, now not)
        if (prevIsUploading.current && !isUploading && completed.length > 0) {
            // Uploads just finished
            if (selectedProject) {
                // Refresh photos if viewing a project
                fetchProjectPhotos(selectedProject.id);
            }
            // Always refresh projects and clients to show new projects/update counts
            fetchProjects();
            fetchClients();

            // Clear the upload queue after a short delay to allow user to see completion
            setTimeout(() => {
                clearQueue();
            }, 2000); // 2 second delay so user can see "100%" before it disappears
        }
        prevIsUploading.current = isUploading;
    }, [isUploading]);

    // --- Data Fetching ---
    const fetchClients = async () => {
        setIsLoading(true);
        try {
            const res = await api.get('/admin/clients');
            setClients(res.data);
        } catch (error) {
            console.error('Error fetching clients:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const res = await api.get('/admin/projects');
            setProjects(res.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchProjectPhotos = async (projectId) => {
        setIsLoading(true);
        try {
            const res = await api.get(`/admin/photos/${projectId}`);
            setProjectPhotos(res.data);
        } catch (error) {
            console.error('Error fetching photos:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // --- Handlers ---
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await api.post('/admin/login', { email: loginEmail, password: loginPassword });
            if (res.data.message === 'Login successful') {
                setIsAdminLoggedIn(true);
                sessionStorage.setItem('adminLoggedIn', 'true');
                fetchClients(); // These will trigger their own loaders? No, we await them or let them flow
                // Actually fetchClients sets loading true/false itself.
                // But since we are already loading, it might flicker. 
                // Let's just await them if we want to keep loader up, or let them handle it.
                // Simpler to just let them run.
                await fetchClients();
                await fetchProjects();
            }
        } catch (error) {
            alert('Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateClient = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await api.post('/admin/client', {
                email: newClientEmail,
                address: newClientAddress,
                name: newClientName,
                mobile: newClientMobile
            });
            await fetchClients(); // Wait for refresh
            alert('Client saved successfully');
            setShowCreateClient(false);
            setNewClientEmail('');
            setNewClientAddress('');
            setNewClientName('');
            setNewClientMobile('');
        } catch (error) {
            alert(error.response?.data?.message || 'Error creating client');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteClient = async (clientId, clientEmail, e) => {
        e.stopPropagation();
        const confirmStr = prompt(`Type "${clientEmail}" to confirm deletion of this CLIENT and ALL their projects/photos.`);
        if (confirmStr !== clientEmail) return;

        setIsLoading(true);
        try {
            await api.delete(`/admin/client/${clientId}`);
            if (selectedClient && selectedClient.id === clientId) {
                setSelectedClient(null);
                setViewMode('clients');
            }
            await fetchClients(); // Wait for refresh
            alert('Client deleted successfully');
        } catch (error) {
            alert('Error deleting client');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
        }
    };

    const handleFiles = (files) => {
        if (!selectedClient) {
            alert("Please select a client first.");
            return;
        }

        const config = {
            email: selectedClient.email,
            projectTitle: selectedProject ? selectedProject.title : uploadProjectTitle,
            eventType: selectedProject ? (selectedProject.eventType || 'Wedding') : uploadEventType,
            date: selectedProject ? (selectedProject.date || '') : uploadDate
        };

        if (!config.projectTitle) {
            alert("Please provide a project title.");
            return;
        }

        addFiles(files, config);
        setShowUploadModal(false);
    };

    const handleDeletePhoto = async (photoId, e) => {
        e.stopPropagation();
        if (!window.confirm('Delete this photo?')) return;
        setIsLoading(true);
        try {
            await api.delete(`/admin/photo/${photoId}`);
            setProjectPhotos(prev => prev.filter(p => p.id !== photoId));
            // Remove from selection if present
            setSelectedPhotoIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(photoId);
                return newSet;
            });
        } catch (error) {
            alert('Error deleting photo');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteProject = async (projectToDelete = selectedProject) => {
        if (!projectToDelete) return;
        const confirmStr = prompt(`Type "${projectToDelete.title}" to confirm deletion of this ENTIRE project and all photos.`);
        if (confirmStr !== projectToDelete.title) return;

        setIsLoading(true);
        try {
            await api.delete(`/admin/project/${projectToDelete.id}`);

            // If deleting the currently open project, go back to list
            if (selectedProject && selectedProject.id === projectToDelete.id) {
                setSelectedProject(null);
                setViewMode('projects');
            }

            await fetchProjects(); // Wait for refresh
            await fetchClients(); // Also refresh clients to update project counts
            alert('Project deleted successfully');
        } catch (error) {
            alert('Error deleting project');
        } finally {
            setIsLoading(false);
        }
    };

    const togglePhotoSelection = (photoId, e) => {
        e.stopPropagation();
        setSelectedPhotoIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(photoId)) {
                newSet.delete(photoId);
            } else {
                newSet.add(photoId);
            }
            return newSet;
        });
    };

    const handleBatchDelete = async () => {
        if (selectedPhotoIds.size === 0) return;
        if (!window.confirm(`Delete ${selectedPhotoIds.size} selected photos? This cannot be undone.`)) return;

        setIsLoading(true);
        try {
            await api.post('/admin/photos/delete-batch', { photoIds: Array.from(selectedPhotoIds) });
            setProjectPhotos(prev => prev.filter(p => !selectedPhotoIds.has(p.id)));
            setSelectedPhotoIds(new Set());
            setIsSelectionMode(false);
            alert('Photos deleted');
        } catch (error) {
            alert('Error deleting photos');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleSelectAll = () => {
        if (selectedPhotoIds.size === projectPhotos.length) {
            setSelectedPhotoIds(new Set());
        } else {
            setSelectedPhotoIds(new Set(projectPhotos.map(p => p.id)));
        }
    };


    const handlePreview = (url, e) => {
        e.stopPropagation();
        setPreviewImage(url);
    };

    // Dynamic Theme Classes
    const theme = {
        bg: isDarkMode ? 'bg-zinc-950' : 'bg-gray-100',
        text: isDarkMode ? 'text-white' : 'text-gray-900',
        cardBg: isDarkMode ? 'bg-zinc-900/50' : 'bg-white',
        cardBorder: isDarkMode ? 'border-zinc-800/50' : 'border-gray-200',
        cardHover: isDarkMode ? 'hover:bg-zinc-900' : 'hover:bg-gray-50',
        subText: isDarkMode ? 'text-zinc-500' : 'text-gray-500',
        inputBg: isDarkMode ? 'bg-zinc-800' : 'bg-gray-50',
        inputBorder: isDarkMode ? 'border-zinc-700' : 'border-gray-300',
    };

    if (!isAdminLoggedIn) {
        // ... (Update login form styles later or keep dark for login?)
        // Let's keep login form dark for now or update it? User asked for admin panel theme.
        // I will focus on the main panel first.
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
                {/* ... login form ... */}
                <form onSubmit={handleLogin} className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 w-full max-w-sm space-y-4">
                    <h1 className="text-2xl font-serif text-amber-500 text-center mb-6">Admin Access</h1>
                    <input type="email" placeholder="Email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="w-full bg-zinc-800 p-3 rounded-lg text-white outline-none focus:ring-1 focus:ring-amber-500" required />
                    <input type="password" placeholder="Password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className="w-full bg-zinc-800 p-3 rounded-lg text-white outline-none focus:ring-1 focus:ring-amber-500" required />
                    <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg transition">Login</button>
                </form>
            </div>
        );
    }

    return (
        <div className={`min-h-screen mt-25 ${theme.bg} ${theme.text} p-6 md:p-10 pt-32 font-sans relative transition-colors duration-300`} onDragOver={e => e.preventDefault()} onDrop={handleDrop}>

            {/* Header / Breadcrumbs */}
            <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between relative z-10">
                <div className={`flex items-center gap-2 text-xl font-medium ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                    <button onClick={() => { setViewMode('clients'); setSelectedClient(null); setSelectedProject(null); }} className={`hover:text-amber-500 transition ${viewMode === 'clients' ? 'text-amber-500' : ''}`}>
                        Clients
                    </button>
                    {selectedClient && (
                        <>
                            <span>/</span>
                            <button onClick={() => { setViewMode('projects'); setSelectedProject(null); }} className={`hover:text-amber-500 transition ${viewMode === 'projects' ? 'text-amber-500' : ''}`}>
                                {selectedClient.email}
                            </button>
                        </>
                    )}
                    {selectedProject && (
                        <>
                            <span>/</span>
                            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{selectedProject.title}</span>
                        </>
                    )}
                </div>
                <div className="flex gap-4 items-center">
                    {/* Theme Toggle (Removed - handled by Global Navbar) */}


                    {/* Add Client Button */}
                    {viewMode === 'clients' && (
                        <button onClick={() => setShowCreateClient(true)} className={`${isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700' : 'bg-white hover:bg-gray-50 border-gray-300 text-gray-700'} px-4 py-2 rounded-lg border transition flex items-center gap-2 shadow-sm`}>
                            <span>+</span> New Client
                        </button>
                    )}
                    {/* Upload / Add Project Button */}
                    {(viewMode === 'projects' || viewMode === 'photos') && (
                        <button onClick={() => {
                            setUploadProjectTitle(selectedProject ? selectedProject.title : '');
                            setShowUploadModal(true);
                        }} className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg text-white transition flex items-center gap-2 font-bold shadow-md">
                            <span className="text-xl leading-none">↑</span> Upload Photos
                        </button>
                    )}

                    {/* Delete Project Button */}
                    {viewMode === 'photos' && selectedProject && (
                        <button onClick={handleDeleteProject} className="bg-red-900/50 hover:bg-red-600 border border-red-800 text-red-200 hover:text-white px-3 py-2 rounded-lg transition text-sm">
                            Delete Project
                        </button>
                    )}

                    <button onClick={() => { setIsAdminLoggedIn(false); sessionStorage.removeItem('adminLoggedIn'); }} className={`${theme.subText} hover:underline text-sm`}>Logout</button>

                </div>
            </div>

            {/* --- Main Content Area --- */}
            <div className="max-w-7xl mx-auto min-h-[60vh]">

                {/* View 1: Clients Grid */}
                {viewMode === 'clients' && (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {clients.map(client => (
                            <div key={client.id}
                                onClick={() => { setSelectedClient(client); setViewMode('projects'); }}
                                className={`${theme.cardBg} p-6 rounded-xl border ${theme.cardBorder} hover:border-amber-500/50 ${theme.cardHover} transition cursor-pointer flex flex-col items-center text-center group shadow-sm relative`}
                            >
                                <button
                                    onClick={(e) => handleDeleteClient(client.id, client.email, e)}
                                    className="absolute top-2 right-2 p-1.5 bg-red-500/10 hover:bg-red-600 text-red-500 hover:text-white rounded-full transition opacity-0 group-hover:opacity-100 z-10"
                                    title="Delete Client"
                                >
                                    <TrashIcon />
                                </button>

                                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-3 text-2xl">
                                    {client.name ? client.name.charAt(0).toUpperCase() : client.email.charAt(0).toUpperCase()}
                                </div>

                                <h3 className={`text-lg font-bold ${theme.text} group-hover:text-amber-500 truncate w-full`}>{client.name || 'Unnamed Client'}</h3>
                                <p className={`text-sm ${theme.subText} truncate w-full`}>{client.email}</p>
                                {client.mobile && <p className={`text-xs ${theme.subText} mt-1`}>{client.mobile}</p>}
                                <p className={`text-xs ${theme.subText} mt-1 font-medium bg-zinc-800 px-2 py-0.5 rounded`}>{client.Projects?.length || 0} Projects</p>
                                {client.address && <p className={`text-xs ${theme.subText} mt-2 line-clamp-1 opacity-70`}>{client.address}</p>}
                            </div>
                        ))}
                        {clients.length === 0 && (
                            <div className={`col-span-full text-center ${theme.subText} py-12`}>No clients found. Create one to get started.</div>
                        )}
                    </div>
                )}

                {/* View 2: Projects Grid */}
                {viewMode === 'projects' && selectedClient && (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {/* Create New Project "Folder" */}
                        <div onClick={() => { setShowUploadModal(true); setUploadProjectTitle(''); }}
                            className={`${isDarkMode ? 'bg-zinc-900/30 border-zinc-700' : 'bg-gray-50 border-gray-300'} p-6 rounded-xl border border-dashed hover:border-amber-500/50 ${isDarkMode ? 'hover:bg-zinc-900/50' : 'hover:bg-gray-100'} transition cursor-pointer flex flex-col items-center justify-center text-center ${theme.subText} hover:text-amber-500`}
                        >
                            <span className="text-4xl mb-2">+</span>
                            <span className="font-medium">New Project</span>
                        </div>

                        {selectedClient.Projects?.map(project => (
                            <div key={project.id}
                                onClick={() => { setSelectedProject(project); fetchProjectPhotos(project.id); setViewMode('photos'); }}
                                className={`${theme.cardBg} p-6 rounded-xl border ${theme.cardBorder} hover:border-amber-500/50 ${theme.cardHover} transition cursor-pointer flex flex-col items-center text-center group shadow-sm relative`}
                            >
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteProject(project);
                                    }}
                                    className="absolute top-2 right-2 p-1.5 bg-red-500/10 hover:bg-red-600 text-red-500 hover:text-white rounded-full transition opacity-0 group-hover:opacity-100 z-10"
                                    title="Delete Project"
                                >
                                    <TrashIcon />
                                </button>
                                <FolderIcon />
                                <h3 className={`text-lg font-semibold ${theme.text} group-hover:text-amber-500 truncate w-full`}>{project.title}</h3>
                                <p className={`text-xs ${theme.subText} mt-1`}>{new Date(project.date).toLocaleDateString()}</p>
                                <span className={`mt-2 text-xs ${isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-gray-500'} px-2 py-0.5 rounded`}>{project.eventType}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* View 3: Photos Grid */}
                {viewMode === 'photos' && selectedProject && (
                    <div>
                        {/* Bulk Action Bar */}
                        <div className="flex items-center justify-between mb-4 bg-zinc-900/30 p-2 rounded-lg border border-zinc-800">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => {
                                        setIsSelectionMode(!isSelectionMode);
                                        setSelectedPhotoIds(new Set());
                                    }}
                                    className={`px-3 py-1.5 rounded-md text-sm transition ${isSelectionMode ? 'bg-amber-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'}`}
                                >
                                    {isSelectionMode ? 'Cancel Selection' : 'Select Photos'}
                                </button>
                                {isSelectionMode && (
                                    <button onClick={toggleSelectAll} className="text-zinc-400 hover:text-white text-sm">
                                        {selectedPhotoIds.size === projectPhotos.length ? 'Deselect All' : 'Select All'}
                                    </button>
                                )}
                            </div>
                            {isSelectionMode && selectedPhotoIds.size > 0 && (
                                <button onClick={handleBatchDelete} className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition">
                                    Delete Selected ({selectedPhotoIds.size})
                                </button>
                            )}
                            {!isSelectionMode && (
                                <span className="text-zinc-500 text-sm">{projectPhotos.length} Photos</span>
                            )}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {projectPhotos.map(photo => {
                                const isSelected = selectedPhotoIds.has(photo.id);
                                return (
                                    <div
                                        key={photo.id}
                                        onClick={(e) => {
                                            if (isSelectionMode) togglePhotoSelection(photo.id, e);
                                            // Else do nothing (preview handle is on button/overlay, or maybe enable direct click?)
                                            // Current UI has overlay buttons. Let's make main click do preview if not selection mode?
                                            // Actually current code doesn't have main onClick, just buttons.
                                        }}
                                        className={`group relative aspect-square bg-zinc-900 rounded-lg overflow-hidden border transition-all ${isSelected ? 'border-amber-500 ring-2 ring-amber-500 scale-95' : 'border-zinc-800'}`}
                                    >
                                        <img
                                            src={`${photo.url}?width=200`}
                                            alt={photo.filename}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />

                                        {/* Overlay Actions */}
                                        <div className={`absolute inset-0 bg-black/40 ${isSelectionMode ? (isSelected ? 'opacity-20' : 'opacity-0') : 'opacity-0 group-hover:opacity-100'} transition-opacity flex flex-col justify-between p-3`}>
                                            <div className="flex justify-end gap-2">
                                                {isSelectionMode ? (
                                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'bg-amber-500 border-amber-500' : 'border-white/50'}`}>
                                                        {isSelected && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                                    </div>
                                                ) : (
                                                    <>
                                                        <button onClick={(e) => handlePreview(photo.url, e)} className="p-2 bg-zinc-800/80 hover:bg-zinc-700/80 rounded-full text-white backdrop-blur-sm transition" title="Preview">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                        </button>
                                                        <button onClick={(e) => handleDeletePhoto(photo.id, e)} className="p-2 bg-red-500/80 hover:bg-red-600 rounded-full text-white backdrop-blur-sm transition" title="Delete">
                                                            <TrashIcon />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Footer Name */}
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-md p-2">
                                            <p className="text-[10px] text-zinc-300 truncate text-center">{photo.filename}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {projectPhotos.length === 0 && (
                            <div className="text-center py-20 text-zinc-600">
                                <p>No photos yet.</p>
                                <button onClick={() => setShowUploadModal(true)} className="text-amber-500 hover:underline mt-2">Upload some?</button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* --- Modals & Overlays --- */}

            {/* Create Client Modal */}
            {showCreateClient && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 w-full max-w-md relative">
                        <button onClick={() => setShowCreateClient(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white">✕</button>
                        <h2 className="text-2xl font-bold mb-6">Add New Client</h2>
                        <form onSubmit={handleCreateClient} className="space-y-4">
                            <div>
                                <label className="block text-sm text-zinc-400 mb-1">Full Name</label>
                                <input type="text" value={newClientName} onChange={e => setNewClientName(e.target.value)} className="w-full bg-zinc-800 p-3 rounded-lg text-white border border-zinc-700 outline-none focus:border-amber-500" placeholder="e.g. John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm text-zinc-400 mb-1">Email Address <span className="text-red-500">*</span></label>
                                <input type="email" value={newClientEmail} onChange={e => setNewClientEmail(e.target.value)} className="w-full bg-zinc-800 p-3 rounded-lg text-white border border-zinc-700 outline-none focus:border-amber-500" required />
                            </div>
                            <div>
                                <label className="block text-sm text-zinc-400 mb-1">Mobile Number</label>
                                <input type="tel" value={newClientMobile} onChange={e => setNewClientMobile(e.target.value)} className="w-full bg-zinc-800 p-3 rounded-lg text-white border border-zinc-700 outline-none focus:border-amber-500" placeholder="+91 9876543210" />
                            </div>
                            <div>
                                <label className="block text-sm text-zinc-400 mb-1">Postal Address</label>
                                <textarea value={newClientAddress} onChange={e => setNewClientAddress(e.target.value)} className="w-full bg-zinc-800 p-3 rounded-lg text-white border border-zinc-700 outline-none focus:border-amber-500 h-24" placeholder="Street, City, Zip..." />
                            </div>
                            <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg transition">Save Client</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 w-full max-w-md relative">
                        <button onClick={() => setShowUploadModal(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white">✕</button>
                        <h2 className="text-2xl font-bold mb-2">Upload Photos</h2>
                        <p className="text-zinc-500 text-sm mb-6">Select photos to upload to {selectedClient?.email}</p>

                        <div className="space-y-4 mb-6">
                            {!selectedProject && (
                                <input type="text" placeholder="Project Title (e.g. Wedding)" value={uploadProjectTitle} onChange={e => setUploadProjectTitle(e.target.value)} className="w-full bg-zinc-800 p-3 rounded-lg border border-zinc-700 text-white outline-none focus:border-amber-500" />
                            )}
                            {!selectedProject && (
                                <div className="grid grid-cols-2 gap-4">
                                    <select value={uploadEventType} onChange={e => setUploadEventType(e.target.value)} className="w-full bg-zinc-800 p-3 rounded-lg border border-zinc-700 text-white outline-none focus:border-amber-500">
                                        <option>Wedding</option><option>Birthday</option><option>Event</option><option>Portrait</option>
                                    </select>
                                    <input type="date" value={uploadDate} onChange={e => setUploadDate(e.target.value)} className="w-full bg-zinc-800 p-3 rounded-lg border border-zinc-700 text-white outline-none focus:border-amber-500" />
                                </div>
                            )}
                        </div>

                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center cursor-pointer hover:border-amber-500 hover:bg-zinc-800/50 transition group"
                        >
                            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">📂</div>
                            <p className="font-medium text-zinc-300">Click or Drag photos here</p>
                            <p className="text-xs text-zinc-500 mt-1">Supports 100+ files. Max 100MB per file.</p>
                        </div>
                        <input type="file" multiple ref={fileInputRef} className="hidden" onChange={handleFileSelect} />
                    </div>
                </div>
            )}

            {/* Preview Modal */}
            {previewImage && (
                <div className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4" onClick={() => setPreviewImage(null)}>
                    <button onClick={() => setPreviewImage(null)} className="absolute top-6 right-6 text-zinc-400 hover:text-white z-50">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <img src={previewImage} alt="Preview" className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" onClick={e => e.stopPropagation()} />
                </div>
            )}

            {/* Global Loader Overlay */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    >
                        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl flex flex-col items-center shadow-2xl">
                            <div className="w-12 h-12 border-4 border-zinc-800 border-t-amber-500 rounded-full animate-spin mb-4"></div>
                            <p className="text-white font-medium">Processing...</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Global Upload Progress Bar */}
            <AnimatePresence>
                {isUploading && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-4 shadow-2xl z-50 px-8"
                    >
                        <div className="max-w-4xl mx-auto flex items-center gap-6">
                            <div className="flex-1">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-white font-medium">Uploading... {completed.length + failed.length} / {queue.length + completed.length + failed.length + (currentFile ? 1 : 0)}</span>
                                    <span className="text-amber-500">{progress}%</span>
                                </div>
                                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${progress}%` }} />
                                </div>
                            </div>
                            <div className="text-xs text-zinc-500 hidden md:block">
                                {currentFile && `Processing: ${currentFile.file.name}`}
                            </div>
                            {failed.length > 0 && (
                                <div className="text-xs text-red-500 font-bold">
                                    {failed.length} Failed
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default AdminPanel;
