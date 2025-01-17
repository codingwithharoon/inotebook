const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Assuming your user model is properly defined
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var jwtsecret = "hahahahbro its secert :) shhhhhh"
const fetchuser = require('../middleware/fetchuser'); // Assuming your user model is properly defined

//create a user
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  // If there are errors, return Bad request and the errors
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success,errors: errors.array() });
  }
  try {
    // Check whether the user with this email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        success = false
      return res.status(400).json({ success,error: "Sorry a user with this email already exists" })

    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const token = jwt.sign(data, jwtsecret);

    success = true;
    res.json({ success,token })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

//Login a user 
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });

        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const tokenData = {
            user: {
                id: user.id
            }
        };

        const jwtsecret = "hahahahbro its secert :) shhhhhh";
        const token = jwt.sign(tokenData, jwtsecret);

        res.status(200).json({ token });
    } catch (error) {
        console.error(error); // Log the error to the console for debugging purposes
        res.status(500).json({ error: "Internal server error" });
    }
});

//get login user 
router.get('/getuser', fetchuser, async (req, res) => {
    try {
        
       const userid = req.user.id
       const user = await User.findById(userid).select("-password")
       res.send(user)

    } catch (error) {
        console.error(error); // Log the error to the console for debugging purposes
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
