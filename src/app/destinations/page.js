// [REACT COMPONENT] /src/app/destinations/page.js
"use client";

import React, { useState, useEffect, useCallback } from 'react';

// --- API Keys & Configuration ---
const geoapifyApiKey = 'e5f65d4f31d644a2a95d5f40af88b6de';
const unsplashAccessKey = 'ts1TIAtplMER3eXfLV6rIhXJGnhFEEYneWQ88Q6yqwU';

const cityBounds = {
    "nepal": "79.9,26.3,88.2,30.4", "kathmandu": "85.25,27.63,85.45,27.78",
    "pokhara": "83.93,28.17,84.08,84.27", "janpur": "85.88,26.69,85.98,26.76",
    "biratnagar": "87.23,26.40,87.30,26.50", "lumbini": "83.25,27.45,83.30,27.55",
    "dharan": "87.25,26.80,87.35,26.90"
};

const StyleInjector = () => (
    <style>{`
        .destinations-page-container { padding: 120px 20px 40px; }
        .destinations-widget { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); margin: 0 auto 3rem auto; max-width: 500px; }
        .destinations-form { display: flex; gap: 1rem; align-items: center; }
        .destinations-form-group { flex-grow: 1; }
        .destinations-form label { font-weight: bold; display: block; margin-bottom: 5px; }
        .destinations-form select { width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #ddd; }
        .destinations-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; max-width: 1200px; margin: auto; }
        .dest-card { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1); transition: transform 0.2s; }
        .dest-card:hover { transform: translateY(-5px); }
        .dest-card-img { width: 100%; height: 200px; object-fit: cover; }
        .dest-card-content { padding: 15px; }
        .spinner { width: 48px; height: 48px; border: 5px solid #f3f3f3; border-top: 5px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite; margin: 50px auto; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    `}</style>
);

const DestinationCard = ({ name, location, imageUrl }) => (
    <div className="dest-card">
        <img src={imageUrl} alt={name} className="dest-card-img" />
        <div className="dest-card-content">
            <h3>{name}</h3><p>{location}</p>
        </div>
    </div>
);

export default function DestinationsPage() {
    const [selectedCity, setSelectedCity] = useState('nepal');
    const [destinations, setDestinations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDestinations = useCallback(async (city) => {
        setIsLoading(true); setError(null);
        try {
            const geoResponse = await fetch(`https://api.geoapify.com/v2/places?categories=tourism.attraction&filter=rect:${cityBounds[city]}&limit=12&apiKey=${geoapifyApiKey}`);
            const geoData = await geoResponse.json();
            if (!geoData.features || geoData.features.length === 0) { setDestinations([]); return; }

            const imagePromises = geoData.features.map(dest =>
                fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(dest.properties.name || "Nepal")}&per_page=1&client_id=${unsplashAccessKey}`).then(res => res.json())
            );
            const imageResults = await Promise.all(imagePromises);

            setDestinations(geoData.features.map((dest, i) => ({
                id: dest.properties.place_id, name: dest.properties.name, location: dest.properties.address_line2 || city,
                imageUrl: imageResults[i]?.results[0]?.urls?.small || `https://via.placeholder.com/400x300?text=No+Image`,
            })));
        } catch (err) { setError("Failed to load destinations."); } finally { setIsLoading(false); }
    }, []);

    useEffect(() => { fetchDestinations('nepal'); }, [fetchDestinations]);

    return (
        <>
            <StyleInjector />
            <div className="destinations-page-container">
                <div className="destinations-widget">
                    <form className="destinations-form" onSubmit={(e) => { e.preventDefault(); fetchDestinations(selectedCity); }}>
                        <div className="destinations-form-group">
                            <label htmlFor="destination-select">Choose a Destination</label>
                            <select id="destination-select" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={isLoading}>
                                <option value="nepal">All of Nepal</option> <option value="kathmandu">Kathmandu</option> <option value="pokhara">Pokhara</option>
                                <option value="janpur">Janakpur</option> <option value="biratnagar">Biratnagar</option> <option value="lumbini">Lumbini</option> <option value="dharan">Dharan</option>
                            </select>
                        </div>
                        <button type="submit" disabled={isLoading}>{isLoading ? '...' : 'Search'}</button>
                    </form>
                </div>
                {isLoading ? <div className="spinner"></div> : error ? <p style={{textAlign: 'center', color: 'red'}}>{error}</p> :
                    <div className="destinations-grid">
                        {destinations.length > 0 ? destinations.map(d => <DestinationCard key={d.id} {...d} />) : <p>No destinations found.</p>}
                    </div>
                }
            </div>
        </>
    );
}