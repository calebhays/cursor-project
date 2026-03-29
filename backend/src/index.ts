import express, { Request, Response } from 'express';
import cors from 'cors';
import { HelloResponseSchema } from '@my-app/shared';

// Initialize the Express application
const app = express();
const PORT = 3001;

// Middleware
app.use(cors()); // Allow requests from the React frontend
app.use(express.json()); // Allow the server to read JSON data

// A simple API Route
app.get('/api/hello', (req: Request, res: Response) => {
    const rawData = { 
        message: 'Hello from the Express Backend!',
        timestamp: new Date().toISOString()
    };

    // Use .parse() to validate the data. 
    // If rawData is missing a field, this throws an error immediately.
    const validatedData = HelloResponseSchema.parse(rawData);
    
    res.json(validatedData);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});