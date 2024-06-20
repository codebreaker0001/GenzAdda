
import bcrypt from 'bcrypt';

import * as argon2 from "argon2";
import jwt from 'jsonwebtoken';

import User from '../modles/user.js';

import { configDotenv } from 'dotenv'

configDotenv();

export const register = async (req,res) => {
    const {firstName, lastName, email, password ,friends,picturePath,location, occupation ,viewedProfile,impressions} = req.body;

    try {
        // const userExists = await User.findOne({Email});
        // if(userExists) return res.status(400).json({message: 'User already exists'});

        const salt = 10;
        const hashedPassword = await argon2.hash(password);
        console.log(hashedPassword);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password:  hashedPassword,
            friends,
            picturePath,
            location,
            occupation,
            viewedProfile:Math.floor(Math.random()*1000),
            impressions:Math.floor(Math.random()*1000),
        })

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


// LOGIN 

export const login = async (req, res) => {
    try {
        console.log("login request");
        const {email, password } = req.body;

        const user = await User.findOne({email: email});

        if(!user) return res.status(400).json({message: 'User does not exist'});
        
        const isMatch = await argon2.verify(user.password,password); 
        console.log(password);
        if(!isMatch) return res.status(400).json({message: `${password} is not match ${user.password}`});

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET)

        delete user.password;
        console.log(process.env.JWT_SECRET);
        console.log(token);

        res.status(200).json({ user, token});
        
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}