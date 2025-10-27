import React from 'react';

const Home: React.FC = () => {
  return (
    <div style={{ fontFamily: 'system-ui', padding: 24 }}>
      <h1>Zyra API</h1>
      <p>The Zyra API is running.</p>
      <p>
        Check the API status endpoint: <a href="/api/status">/api/status</a>
      </p>
    </div>
  );
};

export default Home;
