import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const port = process.env.PORT || 5000;;

const app = express();

app.use('/api/users', userRoutes);

app.get('/', (req, res)=>{
    res.send('Server is running');
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})

// POST /api/users - Register a new user
// POST /api/user/auth - Authenticate a user and create a token
// POST /api/users/logout - Logout user and destory token
// GET /api/users/profile - Get user profile
// PUT /api/users/profile - Update user profile

