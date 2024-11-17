import async_handler from 'express-async-handler';

// @desc Auth user/set token
// @route POST /api/users/auth
// @access Public


const authUser = async_handler(async(req, res)=>{
    res.status(200).json({message: 'Auth user'});
})

// @desc Register new user
// @route POST /api/users
// @access Public

const registerUser = async_handler(async(req, res)=>{
    res.status(200).json({message: "Register user"});
})

// @desc Logout user
// @route POST /api/users/logout
// @access Public

const logoutUser = async_handler(async(req, res)=>{
    res.status(200).json({message: "Logout user"});
})

// @desc Get user profile
// @route GET /api/users/profile
// @access Private - need valid JWT token

const getUserProfile = async_handler(async(req, res)=>{
    res.status(200).json({message: "User profile"});
})

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private

const updateUser = async_handler(async(req, res)=>{
    res.status(200).json({message: "Update user profile"});
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUser
}



