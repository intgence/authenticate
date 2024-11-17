// @desc Auth user/set token
// @route POST /api/users/auth
// @access Public

import async_handler from 'express-async-handler';
const authUser = async_handler(async(req, res)=>{
    res.status(200).json({message: 'Auth user'});
})

export {
    authUser
}



