const { benutzers } = require("../source/db/sequelize")
const bcrypt = require("bcrypt")
const jet = require("jsonwebtoken")
const key = require("../auth/key")

module.exports = (app)=>{
    app.post("/anmelden", (req, res)=>
    {
        let maile = req.body.maile
        let passwort = req.body.passwort
        benutzers.findOne({where: {mail : maile}})
         .then(benutzer =>{
            console.log(benutzer)
            if(benutzer)
            {
                bcrypt.compare(passwort, benutzer.passwort)
                .then(isPasswortValide =>{
                   if(isPasswortValide)
                   {
                       console.log(isPasswortValide)
                       const message = "die benutzer wird gut angemelden"
                       const token = jet.sign(
                        { userId : benutzer.id},
                        key,{expiresIn : "24h"}
                        )
                       res.status(200).json({message, token})
                   }
                   else
                   {
                       const message = "die benutzer wird nicht"
                       res.status(401).json(message)  
                   }
                })
            }
            else
            {
                const message = "die mail existiert nicht angemelden"
                res.status(404).json(message)
            }
         })
    })
}