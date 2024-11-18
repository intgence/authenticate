import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import {notFound, errorHandler} from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

connectDB();

dotenv.config();

const port = process.env.PORT || 5000;;

const app = express();

app.use(express.json()); //allows to parse raw json 
app.use(express.urlencoded({extended: true})); //allows to parse url encoded bodies

app.use('/api/users', userRoutes);

app.get('/', (req, res)=>{
    res.send('Server is running');
})

app.use(notFound);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})

// POST /api/users - Register a new user
// POST /api/user/auth - Authenticate a user and create a token
// POST /api/users/logout - Logout user and destory token
// GET /api/users/profile - Get user profile
// PUT /api/users/profile - Update user profile

