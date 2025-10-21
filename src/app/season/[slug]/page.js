// [REACT COMPONENT] /src/app/season/[slug]/page.js
'use client'; // We add this because our layout includes the interactive Header

import { seasonsData } from '../../../data/data';

export default function SeasonDetailPage({ params }) {
  // The 'slug' from the URL is available in params.slug
  const { slug } = params;

  // Find the season data that matches the slug from the URL
  const season = seasonsData.find(s => s.slug === slug);

  // Show a "not found" message if the URL is invalid
  if (!season) {
    return (
      <div style={{ paddingTop: '120px', padding: '40px' }}>
        <h1>Season not found!</h1>
      </div>
    );
  }

  // If found, display the season's details
  return (
    <div style={{ paddingTop: '120px', padding: '40px' }}>
      <h1>{season.season} in Nepal</h1>
      <p>{season.description}</p>
      {/* We can add more specific details about this season later */}
    </div>
  );
}