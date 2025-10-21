// [REACT COMPONENT] /src/app/treks/[id]/page.js
// No 'use client' needed! This is a Server Component.

// This helper function fetches the data for a single trek
async function getTrekData(id) {
  const response = await fetch(`http://localhost:3000/api/treks/${id}`, { cache: 'no-store' });
  if (!response.ok) {
    return null;
  }
  return response.json();
}

export default async function TrekDetailPage({ params }) {
  const trek = await getTrekData(params.id);

  if (!trek) {
    return (
      <div style={{ paddingTop: '120px', padding: '40px' }}>
        <h1>Trek not found!</h1>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '120px', padding: '40px' }}>
      <h1>{trek.title}</h1>
      <p><strong>Duration:</strong> {trek.duration} days</p>
      <p><strong>Difficulty:</strong> {trek.difficulty}</p>
      <p>{trek.description}</p>
    </div>
  );
}