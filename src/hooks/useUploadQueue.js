import { useState, useCallback, useEffect } from 'react';
import api from '../api/axios';

export const useUploadQueue = () => {
    const [queue, setQueue] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [completed, setCompleted] = useState([]);
    const [failed, setFailed] = useState([]);
    const [currentFile, setCurrentFile] = useState(null);

    // Stats
    const totalFiles = queue.length + completed.length + failed.length + (currentFile ? 1 : 0);
    const progress = totalFiles === 0 ? 0 : Math.round(((completed.length + failed.length) / totalFiles) * 100);

    const addFiles = useCallback((files, uploadConfig) => {
        // uploadConfig contains: email, projectTitle, etc.
        const newItems = Array.from(files).map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            file,
            config: uploadConfig,
            status: 'pending' // pending, uploading, success, error
        }));
        setQueue(prev => [...prev, ...newItems]);
    }, []);

    const processNext = useCallback(async () => {
        if (processing || queue.length === 0) return;

        setProcessing(true);
        const item = queue[0];
        setCurrentFile(item);
        setQueue(prev => prev.slice(1)); // Remove from queue

        try {
            const formData = new FormData();
            formData.append('email', item.config.email);
            formData.append('projectTitle', item.config.projectTitle);
            formData.append('eventType', item.config.eventType);
            formData.append('date', item.config.date);
            formData.append('image', item.file);

            await api.post('/admin/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setCompleted(prev => [...prev, { ...item, status: 'success' }]);
        } catch (error) {
            console.error('Upload failed', error);
            setFailed(prev => [...prev, { ...item, status: 'error', error: error.message }]);
        } finally {
            setCurrentFile(null);
            setProcessing(false);
        }
    }, [queue, processing]);

    useEffect(() => {
        if (!processing && queue.length > 0) {
            processNext();
        }
    }, [queue, processing, processNext]);

    const clearQueue = () => {
        setQueue([]);
        setCompleted([]);
        setFailed([]);
        setCurrentFile(null);
    };

    return {
        queue,
        completed,
        failed,
        currentFile,
        progress,
        addFiles,
        clearQueue,
        isUploading: processing || queue.length > 0
    };
};
