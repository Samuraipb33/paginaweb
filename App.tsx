
import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import GalleryPage from './components/GalleryPage';

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [galleryId, setGalleryId] = useState<string | null>(null);

    useEffect(() => {
        const getGalleryIdFromHash = () => {
            const hash = window.location.hash;
            if (hash.startsWith('#gallery=')) {
                setGalleryId(hash.substring('#gallery='.length));
            } else {
                setGalleryId(null);
            }
        };

        getGalleryIdFromHash();

        window.addEventListener('hashchange', getGalleryIdFromHash);
        return () => {
            window.removeEventListener('hashchange', getGalleryIdFromHash);
        };
    }, []);

    const handleLogin = (name: string, lastName: string) => {
        if (name.trim() && lastName.trim()) {
            setIsLoggedIn(true);
        }
    };

    const handleExitGallery = () => {
        window.location.hash = '';
        // This will trigger the hashchange event and re-render the component
        // to the login/local gallery state. We also reset login status.
        setIsLoggedIn(false); 
    };
    
    // If there is a galleryId, we are viewing a shared gallery.
    if (galleryId) {
        return (
            <div className="min-h-screen bg-gray-900 text-white antialiased">
                <GalleryPage galleryId={galleryId} onExit={handleExitGallery} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white antialiased">
            {isLoggedIn ? <GalleryPage onExit={handleExitGallery} /> : <LoginPage onLogin={handleLogin} />}
        </div>
    );
};

export default App;
