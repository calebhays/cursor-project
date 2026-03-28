import express, { Request, Response } from 'express';
import cors from 'cors';
import type { HelloResponse } from '@my-app/shared';

// Initialize the Express application
const app = express();
const PORT = 3001;

// Middleware
app.use(cors()); // Allow requests from the React frontend
app.use(express.json()); // Allow the server to read JSON data

// A simple API Route
app.get('/api/hello', (req: Request, res: Response) => {
    const response: HelloResponse = { 
        message: 'Hello from the Express Backend!',
        timestamp: new Date().toISOString()
    };
    res.json(response);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});