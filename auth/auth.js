const jwt = require("jsonwebtoken")
const key = require("../auth/key")
module.exports = (req, res, next)=>{
    const authentification = req.headers.authorization
    console.log(authentification)
    if(authentification)
    {
        const token = authentification.split(" ")[1]
        const decodeToken = jwt.verify(token, key , (errer, decodeToken)=>{
            if(errer)
            {
                res.status(401).json({message :"Sie dürfen nicht auf diese Ressource zugreifen", errer})
            }
            else
            {
                const benutzerId = decodeToken.userId
                if(req.body.userId && req.body.userId !== benutzerId)
                {
                    res.status(401).json({message:"ihre Id stimmt nicht ", errer}) 
                }
                else
                {
                    console.log(benutzerId +" et "+ req.body.userId)
                    next()
                }
            }
        })
    }
    else
    {
        res.status(401).json({message : "Sie habe keine jeton der beglaubigung beibriegen"})
    }
}