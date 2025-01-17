var jwtsecret = "hahahahbro its secert :) shhhhhh"
const jwt = require('jsonwebtoken');

const fetchuser= (req,res,next)=>
{
    const token = req.header("auth-token")
    {
        if (!token)
        {
            res.json("bye bye")
        }
        else
        {
        const getuser = jwt.verify(token,jwtsecret)
         req.user = getuser.user
         console.log(req.user)
        next()
        }
    }
}
module.exports=fetchuser