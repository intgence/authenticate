import jwt from 'jsonwebtoken';

const genToken = (res, userId) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: '30m'
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30*60*1000

    })
} // userId for payload

export default genToken;