const express = require('express');
const { User,Account } = require("../db.js");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "abc123" ;
const authMiddleware =require('../middleware.js')
const zod = require('zod') ;

const Userrouter = express.Router();


const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

Userrouter.post("/signup",async (req,res)=>{
    console.log(req.body) ;
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })

})

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

Userrouter.post("/signin",async (req,res)=>{
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            abc : "abc" ,
            abcd : "abcd"
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }
    
    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

// Userrouter.put("/", authMiddleware, async (req, res) => {
//     const { success } = updateBody.safeParse(req.body)
//     if (!success) {
//         res.status(411).json({
//             message: "Error while updating information"
//         })
//     }

// 		await User.updateOne(req.body,
//             { id: req.userId } );
	
//     res.json({
//         message: "Updated successfully"
//     })
// })


module.exports = Userrouter;