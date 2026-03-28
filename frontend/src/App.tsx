import { useEffect, useState } from 'react';
import './App.css'; // Keeps Vite's default styling

function App() {
  // Create a state variable to hold the message from the backend
  const [message, setMessage] = useState<string>('Loading data from server...');

  useEffect(() => {
    // Fetch the data from our Express API when the component loads
    fetch('http://localhost:3001/api/hello')
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the message from the backend
        setMessage(data.message);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setMessage('Failed to connect to backend.');
      });
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>My Full-Stack App</h1>
      <div style={{ 
        border: '1px solid #ccc', 
        padding: '20px', 
        borderRadius: '8px',
        maxWidth: '400px',
        margin: '0 auto',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h2>Backend Status:</h2>
        {/* Display the message right here on the page */}
        <p style={{ color: '#0066cc', fontWeight: 'bold', fontSize: '1.2rem' }}>
          {message}
        </p>
      </div>
    </div>
  );
}

export default App;