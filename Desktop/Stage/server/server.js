import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRouter.js'; 

const app = express();
const port = process.env.PORT || 5173;

// Connect to MongoDB
connectDB().catch(err => {
    console.error("Database connection failed:", err);
    process.exit(1); // Exit the process if DB connection fails
});

// Middleware Setup
app.use(express.json());
app.use(cookieParser());

// CORS Configuration (allow specific origins)
const allowedOrigins = [process.env.CLIENT_URL];  // Set your client URL here
app.use(cors({
    origin: allowedOrigins, 
    credentials: true  // Allow cookies with cross-origin requests
}));

// API Endpoints
app.get('/', (req, res) => res.send("API Working"));

app.use('/api/auth', authRouter);

// Error Handling Middleware (optional)
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start Server
app.listen(port, () => {
    console.log(`Server started on PORT:${port}`);
});
