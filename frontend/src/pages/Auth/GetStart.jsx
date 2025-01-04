import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        color: '#FFFFFF',
        margin: '0',
        padding: '0',
        backgroundImage: 'url(http://localhost:8000/uploads/1735574279179.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
      <header style={{ padding: '20px 0' }}>
        <h1 style={{ fontSize: '2.5rem', margin: '0' }}>Plant ME</h1>
        <p style={{ fontSize: '1.2rem', marginTop: '10px' }}>Discover, Care, and Grow with Us</p>
      </header>

      <main style={{ padding: '20px' }}>
        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '2rem', color: '#FFFFFF' }}>Welcome to Plant ME!</h2>
          <p>
            Your one-stop destination for all things plants. Whether you're a
            seasoned green thumb or just starting your plant care journey, we're
            here to help you nurture and grow your leafy companions.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '1.8rem', color: '#FFFFFF' }}>What We Offer</h3>
          <ul style={{ listStyle: 'none', padding: '0', textAlign: 'left', margin: '0 auto', maxWidth: '600px' }}>
            <li style={{ fontSize: '1.2rem', margin: '10px 0' }}>
              <strong>Plant Care Guides:</strong> Expert tips and tricks to keep
              your plants healthy.
            </li>
            <li style={{ fontSize: '1.2rem', margin: '10px 0' }}>
              <strong>Shop Plants:</strong> Explore our curated selection of
              indoor and outdoor plants.
            </li>
            <li style={{ fontSize: '1.2rem', margin: '10px 0' }}>
              <strong>Community:</strong> Connect with fellow plant enthusiasts
              and share your journey.
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '1.8rem', color: '#FFFFFF' }}>Ready to Get Started?</h3>
          <p>
            Join us today and make your world greener, one plant at a time.
          </p>
          <button
            style={{
              display: 'block',
              margin: '20px auto',
              backgroundColor: '#4caf50',
              color: '#FFFFFF',
              border: 'none',
              padding: '10px 20px',
              fontSize: '1.2rem',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={handleClick}
          >
            Get Started
          </button>
        </section>
      </main>

      <footer
        style={{
          marginTop: '30px',
          padding: '10px 0',
          color: '#FFFFFF',
        }}
      >
        <p>© {new Date().getFullYear()} Plant ME. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default StartPage;
