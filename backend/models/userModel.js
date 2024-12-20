import mongoose from "mongoose";
import bcrypt from 'bcryptjs';


const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },

},
{
    timestamps: true,
});

schema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

schema.methods.matchPasswords = async function(inputPassword){
    return await bcrypt.compare(inputPassword, this.password);
}

const User = mongoose.model('User', schema);

export default User;