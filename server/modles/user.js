import mongoose from 'mongoose'


const userSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true,
            min: 2,
            max: 20,
        },
        lastName:{
            type: String,
            required: true,
            min: 2,
            max: 20,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            max: 20,
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 1024,
        },
        picturePath: { 
            type: String,
            required: true,
            default: "",

        },
        friends:{
            type: Array,
            // required: true,
            default: [],
        },
        location: String ,
        occupation: String,
        viewedProfile: Number,
        impressions: Number

    },

    {
        timestamps: true,
    }
)

const User = mongoose.model('User', userSchema);

export default User;
