import User from "../models/user.model.js";
import  bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken";

import { createAccessToken } from "../libs/jwt.js";
export const register = async function (req, res) {
  const { email, password, username } = req.body;

  

  try {

    //Para validar el correo
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(401).json(["the email is already in use"]);
    }

    const passwordHash = await bcrypt.hash(password,10)

    const newUser = new User({
      username,
      email,
      password: passwordHash
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({
      id: userSaved._id

    });
    res.cookie("token",token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  }catch(error){
      console.log(error);
    }
   
  };

  export const login = async function (req, res) {
    const { email, password } = req.body;
    try {
      const userFound = await User.findOne({ email });
      if (!userFound) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const isMatch = await bcrypt.compare(password, userFound.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const token = await createAccessToken({
        id: userFound._id
      });
      res.cookie("token",token);
      res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  export const logout = function (req, res) {
    res.cookie("token","",{
      expires: new Date(0),
    });
    return res.sendStatus(200);
  };

  export const profile = async function (req, res) {
    const userFound = await User.findById(req.user.id)

    if (!userFound) return res.status(404).json({message:"User not found"});

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
    
  }