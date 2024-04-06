const jwt = require('jsonwebtoken');


async function checkUser(req,res,next){
    const JWT_SECRET=process.env.secret
    console.log(JWT_SECRET)
    const token = req.headers.authorization;
    //Bearer jwt
    const words =token.split(" ");
    const jwtToken =words[1];
    console.log(jwtToken)

    const decodedValue=await jwt.verify(jwtToken,JWT_SECRET);
    console.log(decodedValue.isAdmin)
    if(decodedValue.isAdmin){
        next();
    }else{
        res.status(403).json({
            message:"you are not authenticated"
        })
    }


}

module.exports = checkUser;